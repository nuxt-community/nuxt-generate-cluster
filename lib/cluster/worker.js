const cluster = require('cluster')
const generate = require('../generate')
const { Messaging } = require('./mixins')
const { Hookable } = require('../mixins')
const Debug = require('debug')

const debug = Debug('nuxt:cluster-worker')
const { Commands } = generate

module.exports = class Worker extends Hookable(Messaging(generate.Worker)) {
  constructor(options) {
    super(options)

    /* istanbul ignore if */
    if (cluster.isWorker) {
      this.setId(cluster.worker.id)
    }

    this.generator.nuxt.hook('generate:routeCreated', ({ route, path }) => {
      path = path.replace(this.generator.distPath, '')
      debug(`Worker ${this.id} generated file: ${path}`)
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
    debug(`Worker ${this.id} received ${routes.length} routes = require(master`)

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
