import { pull } from 'lodash'
import { messaging as messagingMixin } from './mixins'
import { Master as GenerateMaster, Commands } from '../generate'
import { Worker } from './'
import Debug from 'debug'

const debug = Debug('nuxt:master')

export default class Master extends messagingMixin(GenerateMaster) {
  constructor (options, { workerCount, workerConcurrency, setup } = {}) {
    super(options, { workerCount, workerConcurrency })

    this.workers = []
    this.lastWorkerId = 0

    this.plugin(Commands.sendRoutes, this.sendRoutes.bind(this))
    this.plugin(Commands.sendErrors, this.saveErrors.bind(this))

    this.watchdog.plugin('isWorkerAlive', async ({ worker }) => {
      /* istanbul ignore next */
      return typeof this.workers[worker.id] !== 'undefined'
    })
  }

  async run (args) {
    await this.startListeningForMessages()

    await super.run(args)
  }

  async getRoutes (params) {
    debug(`Retrieving routes`)

    const success = await super.getRoutes(params)

    if (success) {
      debug(`A total of ${this.routes.length} routes will be generated`)
    }
  }

  async sendRoutes ({ worker }) {
    const routes = this.getBatchRoutes()

    if (!routes.length) {
      debug(`No more routes, exiting worker ${worker.id}`)

      this.onExit(worker)
    } else {
      debug(`Sending ${routes.length} routes to worker ${worker.id}`)

      this.watchdog.appendInfo(worker.id, 'routes', routes.length)
      this.sendCommand(worker, Commands.sendRoutes, routes)
    }
  }

  async saveErrors ({ worker, args }) {
    if (typeof args !== 'undefined' && args.length) {
      Array.prototype.push.apply(this.errors, args)
      this.watchdog.appendInfo(worker.id, 'errors', args.length)
    }
  }

  async finished () {
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

    await super.finished()
  }

  async startWorkers () {
    for (let i = await this.watchdog.countAlive(); i < this.workerCount; i++) {
      this.lastWorkerId++
      let worker = new Worker(this.options, this.lastWorkerId)
      this.workers.push(worker)
      this.watchdog.addWorker(worker.id)

      worker.run()
      debug(`Worker ${worker.id} started`)
    }
  }

  async onExit (worker) {
    const workerId = worker.id

    this.watchdog.exitWorker(workerId)
    pull(this.workers, worker)

    const message = `Worker ${workerId} exited`
    debug(message)

    const allDead = await this.watchdog.allDead()
    if (allDead) {
      await this.finished()
    }
  }
}
