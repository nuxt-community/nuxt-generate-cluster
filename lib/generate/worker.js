import { consola } from '../utils'
import { Hookable } from '../mixins'
import { Nuxt, Generator } from '../utils/nuxt'

export default class Worker extends Hookable() {
  constructor(options) {
    super()
    this.options = options
    this.id = -1

    const nuxt = new Nuxt(this.options)
    this.generator = new Generator(nuxt)

    if (this.options.__workerLogLevel) {
      consola.level = Math.max(0, Math.min(consola.maxLevel, this.options.__workerLogLevel))
    }
  }

  setId(id) {
    this.id = id
  }

  async run() {
    await this.generator.initiate({ build: false, init: false })
  }

  async generateRoutes(routes) {
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
