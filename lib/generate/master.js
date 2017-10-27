import Tapable from 'tapable'
import { Nuxt, Builder } from 'nuxt'
import { uniq } from 'lodash'
import { Watchdog } from './'
import { Generator } from '../builder'

export default class Master extends Tapable {
  constructor (options, { workerCount, workerConcurrency }) {
    super()

    this.options = options

    this.watchdog = new Watchdog()
    this.startTime = process.hrtime()

    const nuxt = new Nuxt(options)
    const builder = new Builder(nuxt)
    this.generator = new Generator(nuxt, builder)

    this.workerCount = parseInt(workerCount) || parseInt(nuxt.options.generate.workers) || require('os').cpus().length
    this.workerConcurrency = parseInt(workerConcurrency) || parseInt(nuxt.options.generate.workerConcurrency) || 500

    this.routes = []
    this.errors = []
  }

  async run ({ build, params } = {}) {
    if (build) {
      await this.build()
      await this.applyPluginsAsync('built', { params }, () => {})
    } else {
      await this.initiate()
    }

    await this.getRoutes(params)

    await this.startWorkers()
  }

  async initiate (build) {
    if (!build) build = false
    await this.generator.initiate({ build: build, init: build })
  }

  async build () {
    await this.initiate(true)
  }

  async getRoutes (params) {
    try {
      const routes = await this.generator.initRoutes(params)
      if (routes.length) {
        // add routes to any existing routes
        Array.prototype.push.apply(this.routes, routes)
        this.routes = uniq(this.routes)
      }
      return true
    } catch (e) {
    }
    return false
  }

  calculateBatchSize () {
    // Even the load between workers
    let workerConcurrency = this.workerConcurrency
    if (this.routes.length < this.workerCount * this.workerConcurrency) {
      workerConcurrency = Math.ceil(this.routes.length / this.workerCount)
    }

    return workerConcurrency
  }

  getBatchRoutes () {
    const batchSize = this.calculateBatchSize()
    const routes = this.routes.splice(0, batchSize)

    return routes
  }

  async finished (workerInfo) {
    await this.generator.postGenerate()

    let duration = process.hrtime(this.startTime)
    duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10

    this.generator.printReport(duration, this.errors)

    const info = {
      duration: duration,
      errors: this.errors,
      workerInfo: workerInfo
    }

    if (this.options.generate && typeof this.options.generate.finished === 'function') {
      await this.options.generate.finished(info)
    }
    if (this.hasPlugins('finished')) {
      await this.applyPluginsAsync('finished', { info }, () => {})
    }
  }

  async startWorkers () {
    console.error('Should be implemented by a derived class') // eslint-disable-line no-console
    return false
  }
}
