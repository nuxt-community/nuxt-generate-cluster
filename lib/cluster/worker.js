import cluster from 'cluster'
import chalk from 'chalk'
import { consola } from '../utils'
import { Worker as GenerateWorker, Commands } from '../generate'
import { Messaging } from './mixins'

export default class Worker extends Messaging(GenerateWorker) {
  constructor(options) {
    super(options)

    /* istanbul ignore if */
    if (cluster.isWorker) {
      this.setId(cluster.worker.id)
    }
    consola.scope = chalk.green(`${this.id}`)

    let renderingStartTime
    if (consola.level > 3) {
      const debug = consola.debug
      consola.debug = (msg) => {
        if (msg.startsWith('Rendering url')) {
          renderingStartTime = process.hrtime()
        }
        debug(msg)
      }
    }

    this.generator.nuxt.hook('generate:routeCreated', ({ route, path }) => {
      let durationMessage = ''
      if (consola.level > 3) {
        const taken = process.hrtime(renderingStartTime)
        const duration = Math.round((taken[0] * 1e9 + taken[1]) / 1e6)
        durationMessage += ` (${duration}ms)`
      }
      path = path.replace(this.generator.distPath, '')
      consola.worker(`generated: ${path}` + durationMessage)
    })

    this.hook(Commands.sendRoutes, this.generateRoutes.bind(this))
  }

  async run() {
    await super.run()

    this.startListeningForMessages()
    this.sendCommand(Commands.sendRoutes)
  }

  async generateRoutes(args) {
    const routes = args
    consola.cluster(`received ${routes.length} routes`)

    let errors
    try {
      errors = await super.generateRoutes(routes)
    } catch (e) {
      /* istanbul ignore next */
      if (cluster.isWorker) {
        process.exit(1)
      }
    }

    if (errors && errors.length) {
      errors = errors.map((error) => {
        error.workerId = this.id

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
