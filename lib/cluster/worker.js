import cluster from 'cluster'
import { consola, messaging } from '../utils'
import { Worker as GenerateWorker, Commands } from '../generate'

export default class Worker extends GenerateWorker {
  constructor(options) {
    super(options)

    if (cluster.isWorker) {
      this.setId(cluster.worker.id)
    }

    global._ngc_log_tag = `worker ${this.id}`

    messaging.alias = `worker ${this.id}`
    messaging.on(Commands.sendRoutes, (data) => {
      /* istanbul ignore next */
      this.generateRoutes(data)
    })
  }

  async init() {
    await super.init()

    let renderingStartTime
    /* istanbul ignore next */
    if (consola.level > 3) {
      const debug = consola.debug
      consola.debug = (msg) => {
        if (msg.startsWith('Rendering url')) {
          renderingStartTime = process.hrtime()
        }
        debug(msg)
      }
    }

    this.generator.nuxt.hook('generate:routeCreated', ({ route, path, errors }) => {
      let durationMessage = ''
      if (consola.level > 3) {
        const taken = process.hrtime(renderingStartTime)
        const duration = Math.round((taken[0] * 1e9 + taken[1]) / 1e6)
        durationMessage += ` (${duration}ms)`
      }
      path = path.replace(this.generator.distPath, '')

      if (errors.length) {
        consola.error(`error generating: ${path}` + durationMessage)
      } else {
        consola.success(`generated: ${path}` + durationMessage)
      }
    })
  }

  async run() {
    await super.run()

    messaging.send('master', Commands.sendRoutes)
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

        /* istanbul ignore next */
        if (error.type === 'unhandled') {
          // convert error stack to a string already, we cant send a stack object to the master process
          error.error = { stack: '' + error.error.stack }
        }
        return error
      })

      messaging.send(null, Commands.sendErrors, errors)
    }

    messaging.send(null, Commands.sendRoutes)
  }
}
