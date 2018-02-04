import test from 'ava'
import { Generate, Mixins } from '..'
import { interceptError, release } from './helpers/console'

test('generate.master.getRoutes fails on exception in generator', async t => {
  const master = new Generate.Master({}, {})
  master.generator.initRoutes = () => {
    throw new Error('Error')
  }
  const success = await master.getRoutes()
  t.false(success)
})

test.serial('generate.master.startWorkers shows error message', async t => {
  const errorSpy = await interceptError()
  const master = new Generate.Master({}, {})
  master.startWorkers()
  release()

  t.true(errorSpy.calledOnce)
})

test.serial('generate.worker.generateRoutes fails on exception in generator', async t => {
  const worker = new Generate.Worker({}, {})
  worker.generator.generateRoutes = () => {
    throw new Error('Error')
  }

  const errorSpy = await interceptError()
  const error = await t.throws(worker.generateRoutes([]))
  release()

  t.true(errorSpy.calledTwice)
  t.is(error.message, 'Error')
})

test.serial('error in hooks are logged', async t => {
  class HookTestClass extends Mixins.Hookable() {}

  const msg = 'Oops'
  const hookName = 'throw-error'
  const errorSpy = await interceptError()
  const hookTest = new HookTestClass()
  hookTest.hook(hookName, msg => {
    throw new Error(msg)
  })
  await hookTest.callHook(hookName, msg)
  release()

  t.true(errorSpy.calledTwice)
  t.true(errorSpy.args[0][0].includes(hookName))
  t.is(errorSpy.args[1][0].message, msg)
})
