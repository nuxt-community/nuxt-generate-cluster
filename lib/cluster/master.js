const cluster = require('cluster')
const generate = require('../generate')
const { Messaging } = require('./mixins')
const Debug = require('debug')

const debug = Debug('nuxt:cluster-master')
const { Commands } = generate

module.exports = class Master extends Messaging(generate.Master) {
  constructor(options, { workerCount, workerConcurrency, setup } = {}) {
    super(options, { workerCount, workerConcurrency })

    if (setup) {
      cluster.setupMaster(setup)
    }
    cluster.on('fork', this.onFork.bind(this))
    cluster.on('exit', this.onExit.bind(this))

    this.hook(Commands.sendRoutes, this.sendRoutes.bind(this))
    this.hook(Commands.sendErrors, this.saveErrors.bind(this))

    this.watchdog.hook('isWorkerAlive', async (worker) => {
      /* istanbul ignore next */
      return typeof cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected()
    })
    /* this.watchdog.addHook('isWorkerDead', async (worker) => {
      return typeof cluster.workers[worker.id] === 'undefined' || cluster.workers[worker.id].isDead()
    }) */
  }

  async run(args) {
    await this.startListeningForMessages()

    await super.run(args)
  }

  async getRoutes(params) {
    debug(`Retrieving routes`)

    const success = await super.getRoutes(params)

    if (success) {
      debug(`A total of ${this.routes.length} routes will be generated`)
    }
  }

  async sendRoutes(worker) {
    const routes = this.getBatchRoutes()

    if (!routes.length) {
      debug(`No more routes, exiting worker ${worker.id}`)

      worker.disconnect()
    } else {
      debug(`Sending ${routes.length} routes to worker ${worker.id}`)

      this.watchdog.appendInfo(worker.id, 'routes', routes.length)
      this.sendCommand(worker, Commands.sendRoutes, routes)
    }
  }

  async saveErrors(worker, args) {
    if (typeof args !== 'undefined' && args.length) {
      Array.prototype.push.apply(this.errors, args)
      this.watchdog.appendInfo(worker.id, 'errors', args.length)
    }
  }

  async done() {
    const Iter = this.watchdog.iterator()

    let worker
    while ((worker = Iter.next()) && !worker.done) {
      worker = worker.value

      let workerMsg = `Worker ${worker.id} generated ${worker.routes} routes in ${Math.round(worker.duration / 1E8) / 10}s`
      if (worker.errors > 0) {
        workerMsg += ` with ${worker.errors} error(s)`
      }
      debug(workerMsg)
    }

    await super.done()
  }

  async startWorkers() {
    for (let i = await this.watchdog.countAlive(); i < this.workerCount; i++) {
      cluster.fork({ options: JSON.stringify(this.options) })
    }
  }

  onFork(worker) {
    const pid = worker.process.pid
    debug(`Worker ${worker.id} started with pid ${pid}`)

    this.watchdog.addWorker(worker.id, { pid })
  }

  async onExit(worker, code, signal) {
    const workerId = worker.id

    this.watchdog.exitWorker(workerId, { code, signal })

    let message = `Worker ${workerId} exited`
    /* istanbul ignore if */
    if (code !== 0) {
      message += ` with status code ${code}`
    }
    /* istanbul ignore if */
    if (signal) {
      message += ` by signal ${signal}`
    }
    debug(message)

    const allDead = await this.watchdog.allDead()
    if (allDead) {
      await this.done()
    }
  }
}
