import cluster from 'cluster'
import { Master as GenerateMaster, Commands } from '../generate'
import { consola, messaging } from '../utils'

export default class Master extends GenerateMaster {
  constructor (options, { workerCount, workerConcurrency, failOnPageError, setup, adjustLogLevel } = {}) {
    super(options, { adjustLogLevel, workerCount, failOnPageError, workerConcurrency })

    if (setup) {
      cluster.setupMaster(setup)
    }

    cluster.on('fork', this.onFork.bind(this))
    cluster.on('exit', this.onExit.bind(this))

    global._ngc_log_tag = 'master'

    messaging.on(Commands.sendRoutes, (data, senderId, worker) => {
      this.sendRoutes(senderId, worker)
    })
    messaging.on(Commands.sendErrors, (data, senderId, worker) => {
      this.saveErrors(senderId, worker, data)
    })

    this.watchdog.hook('isWorkerAlive', (worker) => {
      return typeof cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected()
    })
  }

  async getRoutes (params) {
    consola.master('retrieving routes')

    const success = await super.getRoutes(params)

    if (success) {
      consola.master(`${this.routes.length} routes will be generated`)
    }
  }

  sendRoutes (senderId, worker) {
    const routes = this.getBatchRoutes()

    if (!routes.length) {
      consola.master(`no more routes, exiting worker ${worker.id}`)

      worker.disconnect()
    } else {
      consola.cluster(`sending ${routes.length} routes to worker ${worker.id}`)

      this.watchdog.appendInfo(worker.id, 'routes', routes.length)

      messaging.send(senderId, Commands.sendRoutes, routes)
    }
  }

  saveErrors (senderId, worker, args) {
    if (typeof args !== 'undefined' && args.length) {
      Array.prototype.push.apply(this.errors, args)
      this.watchdog.appendInfo(worker.id, 'errors', args.length)
    }
  }

  async done () {
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

  async startWorkers () {
    // Dont start more workers then there are routes
    const maxWorkerCount = Math.min(this.workerCount, this.routes.length)

    for (let i = await this.watchdog.countAlive(); i < maxWorkerCount; i++) {
      cluster.fork({
        args: JSON.stringify({
          options: this.options,
          cliOptions: {
            failOnPageError: this.failOnPageError
          }
        })
      })
    }
  }

  onFork (worker) {
    const pid = worker.process.pid
    consola.master(`worker ${worker.id} started with pid ${pid}`)

    this.watchdog.addWorker(worker.id, { pid })
  }

  async onExit (worker, code, signal) {
    const workerId = worker.id

    this.watchdog.exitWorker(workerId, { code, signal })

    let message = `worker ${workerId} exited`

    let fatal = false
    if (code) {
      message += ` with status code ${code}`
      fatal = true
    }

    if (signal) {
      message += ` by signal ${signal}`
      fatal = true
    }

    if (fatal) {
      consola.fatal(message)
    } else {
      consola.master(message)
    }

    const allDead = await this.watchdog.allDead()
    if (allDead) {
      await this.done()
    }
  }
}
