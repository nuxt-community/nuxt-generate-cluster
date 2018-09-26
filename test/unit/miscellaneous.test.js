import consola from 'consola'
import { Generate, Mixins } from '../utils'

describe('miscellaneous', () => {
  test('generate.master.getRoutes fails on exception in generator', async () => {
    const master = new Generate.Master({}, {})
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
    consola.error.mockReset()
  })

  test('generate.worker.generateRoutes fails on exception in generator', async () => {
    const worker = new Generate.Worker({}, {})
    worker.generator.generateRoutes = () => {
      throw new Error('Oopsy')
    }

    await expect(worker.generateRoutes([])).rejects.toThrow('Oopsy')
    expect(consola.error).toHaveBeenCalledTimes(2)
    consola.error.mockReset()
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
    consola.error.mockReset()
  })
})
