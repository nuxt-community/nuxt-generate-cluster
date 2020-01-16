import Debug from 'debug'
import { Worker as GenerateWorker, Commands } from '../generate'
import { Messaging } from './mixins'

const debug = Debug('nuxt:worker')

export default class Worker extends Messaging(GenerateWorker) {
  constructor (options, cliOptions = {}, id) {
    super(options)

    this.setId(id)

    this.hook(Commands.sendRoutes, this.generateRoutes.bind(this))
  }

  async init () {
    await super.init()

    this.generator.nuxt.hook('generate:routeCreated', ({ route, path }) => {
      path = path.replace(this.generator.distPath, '')
      debug(`Worker ${this.id} generated file: ${path}`)
    })
  }

  async run () {
    await super.run()

    this.startListeningForMessages()
    this.sendCommand(Commands.sendRoutes)
  }

  async generateRoutes (args) {
    const routes = args
    debug(`Worker ${this.id} received ${routes.length} routes = require(master`)

    let errors
    try {
      errors = await super.generateRoutes(routes)
    } catch (e) {
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

      this.sendCommand(undefined, Commands.sendErrors, errors)
    }

    this.sendCommand(Commands.sendRoutes)
  }
}
