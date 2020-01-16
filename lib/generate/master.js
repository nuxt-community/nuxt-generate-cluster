import uniq from 'lodash/uniq'
import { Hookable } from '../mixins'
import { consola } from '../utils'
import { getNuxt, getGenerator } from '../utils/nuxt'
import Watchdog from './watchdog'

export default class Master extends Hookable() {
  constructor (options, { workerCount, workerConcurrency, failOnPageError, adjustLogLevel }) {
    super()

    this.options = options

    this.watchdog = new Watchdog()
    this.startTime = process.hrtime()

    this.workerCount = parseInt(workerCount)
    this.workerConcurrency = parseInt(workerConcurrency)
    this.failOnPageError = failOnPageError

    if (adjustLogLevel) {
      consola.level = consola._defaultLevel + adjustLogLevel
      this.options.__workerLogLevel = consola.level
    }

    this.routes = []
    this.errors = []
  }

  async init () {
    if (this.generator) {
      return
    }

    const level = consola.level
    const nuxt = await getNuxt(this.options)
    consola.level = level // ignore whatever Nuxt thinks the level should be

    this.generator = await getGenerator(nuxt)

    this.workerCount = this.workerCount || parseInt(nuxt.options.generate.workers) || require('os').cpus().length
    this.workerConcurrency = this.workerConcurrency || parseInt(nuxt.options.generate.workerConcurrency) || 500
  }

  async run ({ build, params } = {}) {
    await this.init()

    if (build) {
      await this.build()
      await this.callHook('built', params)
    } else {
      await this.initiate()
    }

    await this.getRoutes(params)

    if (this.routes.length > 0) {
      await this.startWorkers()
    } else {
      consola.warn('No routes so not starting workers')
    }
  }

  async initiate (build) {
    if (!build) { build = false }
    await this.generator.initiate({ build, init: build })
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

  async done (workerInfo) {
    await this.generator.afterGenerate()

    let duration = process.hrtime(this.startTime)
    duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10

    const info = {
      duration,
      errors: this.errors,
      workerInfo: workerInfo || this.watchdog.workers
    }

    if (this.options.generate && typeof this.options.generate.done === 'function') {
      await this.options.generate.done(info)
    }

    await this.callHook('done', info)

    this.errors = []
  }

  startWorkers () {
    consola.error('Should be implemented by a derived class')
    return false
  }
}
