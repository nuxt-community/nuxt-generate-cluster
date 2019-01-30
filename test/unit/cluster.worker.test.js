import { resolve, sep } from 'path'
import cluster from 'cluster'
import { Cluster, loadFixture, consola } from '../utils'

jest.mock('cluster')
jest.mock('../../lib/utils/consola')

describe('cluster worker', () => {
  let worker
  const rootDir = resolve(__dirname, '..', 'fixtures/basic')
  const distDir = resolve(rootDir, '.nuxt-worker')
  let config

  beforeAll(async () => {
    config = await loadFixture('basic', { generate: { dir: distDir } })

    worker = new Cluster.Worker(config)
    await worker.run()
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('static start processes env and runs worker', () => {
    const options = {
      test: '123'
    }
    process.env.args = JSON.stringify({ options })

    const workerRun = Cluster.Worker.prototype.run

    const run = jest.fn()
    Cluster.Worker.prototype.run = run

    const worker = Cluster.Worker.start()

    expect(run).toHaveBeenCalledTimes(1)
    expect(worker.options.test).toBe(options.test)

    Cluster.Worker.prototype.run = workerRun
  })

  test('can generate routes', async () => {
    let routes = worker.generator.nuxt.options.generate.routes
    routes = worker.generator.decorateWithPayloads([], routes)

    const routesLength = routes.length
    const spy = jest.fn()
    worker.generator.nuxt.hook('generate:routeCreated', spy)
    await worker.generateRoutes(routes)
    expect(consola.cluster).toHaveBeenCalledWith(`received ${routesLength} routes`)
    expect(consola.success).toHaveBeenCalledTimes(routesLength - consola.error.mock.calls.length)
  })

  test('calculates duration on level >4', async () => {
    consola.level = 4
    jest.unmock('consola')

    const ccluster = jest.fn()
    const cworker = jest.fn()
    consola.cluster = ccluster
    consola.success = cworker

    let routes = worker.generator.nuxt.options.generate.routes
    routes = worker.generator.decorateWithPayloads([], routes)

    const routesLength = routes.length
    const spy = jest.fn()
    worker.generator.nuxt.hook('generate:routeCreated', spy)
    await worker.generateRoutes(routes)

    expect(ccluster).toHaveBeenCalledWith(`received ${routesLength} routes`)
    expect(cworker).toHaveBeenCalledTimes(routesLength - consola.error.mock.calls.length)
    const esep = sep.replace('\\', '\\\\')
    const reg = 'generated: ' + esep + 'users' + esep + '1' + esep + 'index.html \\([0-9]+ms\\)'
    expect(cworker).toHaveBeenCalledWith(expect.stringMatching(new RegExp(reg)))
  })

  test('sets id based on cluster id', () => {
    cluster.isWorker = true
    cluster.worker = { id: 999 }

    worker = new Cluster.Worker(config)

    expect(worker.id).toBe(999)
  })
})
