import { resolve, sep } from 'path'
import cluster from 'cluster'
import { Cluster, loadFixture, consola } from '../utils'

jest.mock('cluster')

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

  test('can generate routes', async () => {
    let routes = worker.generator.nuxt.options.generate.routes
    routes =  worker.generator.decorateWithPayloads([], routes)

    const routesLength = routes.length
    const spy = jest.fn()
    worker.generator.nuxt.hook('generate:routeCreated', spy)
    await worker.generateRoutes(routes)
    expect(consola.cluster).toHaveBeenCalledWith(`received ${routesLength} routes`)
    expect(consola.worker).toHaveBeenCalledTimes(routesLength - consola.error.mock.calls.length)
  })

  test('calculates duration on level >4', async () => {
    consola.level = 4
    jest.unmock('consola')

    const ccluster = jest.fn()
    const cworker = jest.fn()
    consola.cluster = ccluster
    consola.worker = cworker

    let routes = worker.generator.nuxt.options.generate.routes
    routes =  worker.generator.decorateWithPayloads([], routes)

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
