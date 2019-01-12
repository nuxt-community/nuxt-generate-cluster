import { resolve } from 'path'
import cluster from 'cluster'
import { Cluster, loadFixture, consola } from '../utils'

jest.mock('cluster')
jest.mock('../../lib/utils/consola')

describe('cluster master', () => {
  let master
  const rootDir = resolve(__dirname, '..', 'fixtures/basic')
  const distDir = resolve(rootDir, '.nuxt-master')
  let config

  beforeAll(async () => {
    config = await loadFixture('basic', { generate: { dir: distDir } })

    master = new Cluster.Master(config)
    await master.run()
  })

  test('logs exit code', async () => {
    master.done = jest.fn()
    await master.onExit({ id: 123 }, 456, 789)
    expect(consola.master).toHaveBeenCalledWith(expect.stringMatching('worker 123 exited with status code 456 by signal 789'))
  })

  test('counts alive workers', async () => {
    cluster.workers = [
      [], // filler
      { id: 1, isConnected: () => true }
    ]

    expect(cluster.workers.length).toBe(2)

    master.watchdog.addWorker(1, { pid: 123 })
    master.watchdog.addWorker(2, { pid: 456 })

    const alive = await master.watchdog.countAlive()
    expect(alive).toBe(1)
  })
})
