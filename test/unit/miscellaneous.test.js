import { Generate, Mixins, consola } from '../utils'

jest.mock('../../lib/utils/consola')

describe('miscellaneous', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generate.master does not call build', async () => {
    const master = new Generate.Master({}, {})
    master.getRoutes = () => { return [] }
    master.build = jest.fn()
    master.initiate = jest.fn()
    master.startWorkers = jest.fn()

    await master.run({ build: false })

    expect(master.build).not.toHaveBeenCalled()
    expect(master.initiate).toHaveBeenCalled()
    expect(master.startWorkers).not.toHaveBeenCalled()
    // expect(consola.warn).toHaveBeenCalled()
  })

  test('generate.master hook:done', async () => {
    const done = jest.fn()
    const master = new Generate.Master({
      generate: { done }
    }, {})
    await master.init()
    master.generator.afterGenerate = jest.fn()
    master.initiate = jest.fn()

    await master.done()

    expect(done).toHaveBeenCalled()
  })

  test('generate.master.getRoutes fails on exception in generator', async () => {
    const master = new Generate.Master({}, {})
    await master.init()
    master.generator.initRoutes = () => {
      throw new Error('Error')
    }
    const success = await master.getRoutes()
    expect(success).toBe(false)
  })

  test('generate.master.startWorkers shows error message', () => {
    const master = new Generate.Master({}, {})
    master.startWorkers()
    expect(consola.error).toHaveBeenCalledTimes(1)
  })

  test('generate.worker.generateRoutes fails on exception in generator', async () => {
    const worker = new Generate.Worker({}, {})
    await worker.init()
    worker.generator.generateRoutes = () => {
      throw new Error('Oopsy')
    }

    await expect(worker.generateRoutes([])).rejects.toThrow('Oopsy')
    expect(consola.error).toHaveBeenCalledTimes(2)
  })

  test('can pass consola.level to worker', () => {
    consola.defaultLevel = 0
    const worker = new Generate.Worker({ __workerLogLevel: 3 }, {})
    expect(consola._level).toBe(3)
    expect(worker.id).toBe(-1)
  })

  test('error in hooks are logged', async () => {
    class HookTestClass extends Mixins.Hookable() {}

    const msg = 'Oopsy'
    const hookName = 'throw-error'
    const hookTest = new HookTestClass()
    hookTest.hook(hookName, (msg) => {
      throw new Error(msg)
    })
    await hookTest.callHook(hookName, msg)

    expect(consola.error).toHaveBeenCalledTimes(2)
    expect(consola.error.mock.calls[0][0]).toMatch(hookName)
    expect(consola.error.mock.calls[1][0]).toBe(msg)

    expect(Object.keys(hookTest._hooks).length).toBe(1)
    hookTest.hook()
    expect(Object.keys(hookTest._hooks).length).toBe(1)
  })
})
