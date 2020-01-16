import { consola } from '../utils'
import { Hookable } from '../mixins'
import { getNuxt, getGenerator } from '../utils/nuxt'

export default class Worker extends Hookable() {
  constructor (options, { failOnPageError } = {}) {
    super()
    this.options = options
    this.id = -1

    this.failOnPageError = failOnPageError

    if (this.options.__workerLogLevel) {
      consola.level = this.options.__workerLogLevel
    }
  }

  setId (id) {
    this.id = id
  }

  async init () {
    /* istanbul ignore next */
    if (this.generator) {
      return
    }

    const level = consola.level
    const nuxt = await getNuxt(this.options)
    consola.level = level // ignore whatever Nuxt thinks the level should be

    this.generator = await getGenerator(nuxt)
  }

  async run () {
    await this.init()

    await this.generator.initiate({ build: false, init: false })
  }

  async generateRoutes (routes) {
    let errors = []

    try {
      errors = await this.generator.generateRoutes(routes)
    } catch (err) {
      consola.error(`Worker ${process.pid}: Exception while generating routes, exiting`)
      consola.error('' + err)
      throw err
    }

    return errors
  }
}
