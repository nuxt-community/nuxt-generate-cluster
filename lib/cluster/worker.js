import cluster from 'cluster'
import { messaging as messagingMixin } from './mixins'
import { Worker as GenerateWorker, Commands } from '../generate'
import Debug from 'debug'

const debug = Debug('nuxt:cluster-worker')

export default class Worker extends messagingMixin(GenerateWorker) {
  constructor (options) {
    super(options)

    /* istanbul ignore if */
    if (cluster.isWorker) {
      this.setWorkerId(cluster.worker.id)
    }

    this.generator.plugin('routeGenerated', ({ route, path }) => {
      debug(`Worker ${this.workerId} generated file: ${path}`)
    })

    this.plugin(Commands.sendRoutes, this.generateRoutes.bind(this))
  }

  async run () {
    await super.run()

    this.startListeningForMessages()
    this.sendCommand(Commands.sendRoutes)
  }

  async generateRoutes ({ args }) {
    const routes = args
    debug(`Worker ${this.workerId} received ${routes.length} routes from master`)

    let errors
    try {
      errors = await super.generateRoutes(routes)
    } catch (e) {
      /* istanbul ignore if */
      if (cluster.isWorker) {
        process.exit(1)
      }
    }

    if (errors && errors.length) {
      errors = errors.map((error) => {
        error.workerId = this.workerId

        if (error.type === 'unhandled') {
          // convert error stack to a string already, we cant send a stack object to the master process
          error.error = { stack: '' + error.error.stack }
        }
        return error
      })

      this.sendCommand(undefined, Commands.sendErrors, errors)
    }

    this.sendCommand(Commands.sendRoutes)
  }
}
