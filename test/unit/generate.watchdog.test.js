import { waitFor, Generate, consola } from '../utils'

jest.mock('../../lib/utils/consola')

describe('watchdog', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Count alive workers', async () => {
    const watchdog = new Generate.Watchdog()
    watchdog.hook('isWorkerAlive', (worker) => {
      return worker.id === 1
    })

    watchdog.addWorker(1)
    watchdog.addWorker(2)

    expect(await watchdog.countAlive()).toBe(1)
  })

  test('Count dead workers', async () => {
    const watchdog = new Generate.Watchdog()
    watchdog.hook('isWorkerAlive', (worker) => {
      return worker.id === 1
    })

    watchdog.addWorker(1)
    watchdog.addWorker(2)
    await waitFor(1)

    watchdog.exitWorker(1)
    expect(await watchdog.allDead()).toBe(false)

    watchdog.exitWorker(2)
    expect(await watchdog.allDead()).toBe(true)
  })

  test('Error message on adding same id', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1)
    watchdog.addWorker(1)
    expect(consola.error).toHaveBeenCalledTimes(1)
  })

  test('Can add info', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1)

    expect(watchdog.workers[1].routes).toBe(0)
    watchdog.addInfo(1, { routes: 2 })
    expect(watchdog.workers[1].routes).toBe(2)
    watchdog.addInfo(1, { routes: 3 })
    expect(watchdog.workers[1].routes).toBe(3)
  })

  test('Can add info by key', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1)

    expect(watchdog.workers[1].routes).toBe(0)
    watchdog.addInfo(1, 'routes', 2)
    expect(watchdog.workers[1].routes).toBe(2)
    watchdog.addInfo(1, 'routes', 3)
    expect(watchdog.workers[1].routes).toBe(3)
  })

  test('Cannot append to unknown key', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1)
    watchdog.appendInfo(1, 'unknown-key', true)
    expect(consola.error).toHaveBeenCalledTimes(1)
  })

  test('Can append string', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1, { str: '' })

    expect(watchdog.workers[1].str).toBe('')
    watchdog.appendInfo(1, 'str', 'a')
    expect(watchdog.workers[1].str).toBe('a')
    watchdog.appendInfo(1, 'str', 'b')
    expect(watchdog.workers[1].str).toBe('ab')
  })

  test('Can append number', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1, { num: 0 })

    watchdog.appendInfo(1, 'num', 1)
    expect(watchdog.workers[1].num).toBe(1)
    watchdog.appendInfo(1, 'num', 1)
    expect(watchdog.workers[1].num).toBe(2)
  })

  test('Can append array', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1, { arr: [] })

    expect(watchdog.workers[1].arr.length).toBe(0)
    watchdog.appendInfo(1, 'arr', [1])
    expect(watchdog.workers[1].arr.length).toBe(1)
    watchdog.appendInfo(1, 'arr', [2])
    expect(watchdog.workers[1].arr.length).toBe(2)
  })

  test('Can append object', () => {
    const watchdog = new Generate.Watchdog()
    watchdog.addWorker(1, { obj: {} })

    expect(watchdog.workers[1].obj).toEqual({})
    watchdog.appendInfo(1, 'obj', { a: 1 })
    expect(watchdog.workers[1].obj.a).toBe(1)
    watchdog.appendInfo(1, 'obj', { a: 2, b: 1 })
    expect(watchdog.workers[1].obj.a).toBe(2)
    expect(watchdog.workers[1].obj.b).toBe(1)
  })
})
