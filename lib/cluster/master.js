import cluster from 'cluster'
import { Master as GenerateMaster, Commands } from '../generate'
import { consola } from '../utils'
import { Messaging } from './mixins'

export default class Master extends Messaging(GenerateMaster) {
  constructor(options, { workerCount, workerConcurrency, setup, adjustLogLevel } = {}) {
    super(options, { adjustLogLevel, workerCount, workerConcurrency })

    if (setup) {
      cluster.setupMaster(setup)
    }

    cluster.on('fork', this.onFork.bind(this))
    cluster.on('exit', this.onExit.bind(this))

    this.hook(Commands.sendRoutes, this.sendRoutes.bind(this))
    this.hook(Commands.sendErrors, this.saveErrors.bind(this))
    this.hook(Commands.logSuccess, this.saveErrors.bind(this))

    this.watchdog.hook('isWorkerAlive', (worker) => {
      /* istanbul ignore next */
      return typeof cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected()
    })
  }

  async run(args) {
    await this.startListeningForMessages()

    await super.run(args)
  }

  async getRoutes(params) {
    consola.master(`retrieving routes`)

    const success = await super.getRoutes(params)

    if (success) {
      consola.master(`${this.routes.length} routes will be generated`)
    }
  }

  sendRoutes(worker) {
    const routes = this.getBatchRoutes()

    if (!routes.length) {
      consola.cluster(`no more routes, exiting worker ${worker.id}`)

      worker.disconnect()
    } else {
      consola.cluster(`sending ${routes.length} routes to worker ${worker.id}`)

      this.watchdog.appendInfo(worker.id, 'routes', routes.length)
      this.sendCommand(worker, Commands.sendRoutes, routes)
    }
  }

  saveErrors(worker, args) {
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

      let workerMsg = `worker ${worker.id} generated ${worker.routes} routes in ${Math.round(worker.duration / 1E8) / 10}s`
      if (worker.errors > 0) {
        workerMsg += ` with ${worker.errors} error(s)`
      }
      consola.cluster(workerMsg)
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
    consola.master(`worker ${worker.id} started with pid ${pid}`)

    this.watchdog.addWorker(worker.id, { pid })
  }

  async onExit(worker, code, signal) {
    const workerId = worker.id

    this.watchdog.exitWorker(workerId, { code, signal })

    let message = `worker ${workerId} exited`
    /* istanbul ignore if */
    if (code !== 0) {
      message += ` with status code ${code}`
    }
    /* istanbul ignore if */
    if (signal) {
      message += ` by signal ${signal}`
    }
    consola.master(message)

    const allDead = await this.watchdog.allDead()
    if (allDead) {
      await this.done()
    }
  }
}
