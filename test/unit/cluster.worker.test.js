import { resolve } from 'path'
import cluster from 'cluster'
import { Cluster, loadFixture, consola } from '../utils'

jest.mock('cluster')

process.stderr.write = jest.fn()

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

  test('can generate routes', async () => {
    const routes = worker.generator.nuxt.options.generate.routes.map((route) => {
      if (typeof route === 'string') {
        return { route }
      } else {
        return route
      }
    })

    const routesLength = routes.length
    const spy = jest.fn()
    worker.generator.nuxt.hook('generate:routeCreated', spy)
    await worker.generateRoutes(routes)

    expect(consola.cluster).toHaveBeenCalledWith(`received ${routesLength} routes`)
    expect(consola.worker).toHaveBeenCalledTimes(routesLength)
  })

  test('calculates duration on level >4', async () => {
    consola.level = 4
    jest.unmock('consola')

    const ccluster = jest.fn()
    const cworker = jest.fn()
    consola.cluster = ccluster
    consola.worker = cworker

    const routes = worker.generator.nuxt.options.generate.routes.map((route) => {
      if (typeof route === 'string') {
        return { route }
      } else {
        return route
      }
    })

    const routesLength = routes.length
    const spy = jest.fn()
    worker.generator.nuxt.hook('generate:routeCreated', spy)
    await worker.generateRoutes(routes)

    expect(ccluster).toHaveBeenCalledWith(`received ${routesLength} routes`)
    expect(cworker).toHaveBeenCalledTimes(routesLength)
    expect(cworker).toHaveBeenCalledWith(expect.stringMatching(/generated: \/users\/1\/index.html \([0-9]+ms\)/))
  })

  test('sets id based on cluster id', () => {
    cluster.isWorker = true
    cluster.worker = { id: 999 }

    worker = new Cluster.Worker(config)

    expect(worker.id).toBe(999)
  })
})
