const { Nuxt, Generator } = require('nuxt')

module.exports = class Worker {
  constructor(options) {
    this.options = options
    this.id = -1

    const nuxt = new Nuxt(options)
    this.generator = new Generator(nuxt)
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
    } catch (e) {
      console.error(`Worker ${process.pid}: Exception while generating routes, exiting`) // eslint-disable-line no-console
      console.error(e) // eslint-disable-line no-console
      throw e
    }

    return errors
  }
}
