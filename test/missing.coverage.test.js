import test from 'ava'
import sinon from 'sinon'
import { Generate, Mixins } from '../'

test.beforeEach(t => {
  t.context.error = console.error // eslint-disable-line no-console

  console.error = sinon.spy() // eslint-disable-line no-console
})

test.afterEach(t => {
  console.error = t.context.error // eslint-disable-line no-console
})

test('generate.master.getRoutes fails on exception in generator', async t => {
  const master = new Generate.Master({}, {})
  master.generator.initRoutes = () => {
    throw new Error('Error')
  }
  const success = await master.getRoutes()
  t.false(success)
})

test('generate.master.startWorkers shows error message', async t => {
  const master = new Generate.Master({}, {})
  master.startWorkers()
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('generate.worker.generateRoutes fails on exception in generator', async t => {
  const worker = new Generate.Worker({}, {})
  worker.generator.generateRoutes = () => {
    throw new Error('Error')
  }
  const error = await t.throws(worker.generateRoutes([]))
  t.is(error.message, 'Error')
})

test('error in hooks are logged', async t => {
  class HookTestClass extends Mixins.Hookable() {}

  const msg = 'Oops'
  const hookName = 'throw-error'
  const hookTest = new HookTestClass()
  hookTest.hook(hookName, msg => {
    throw new Error(msg)
  })

  await hookTest.callHook(hookName, msg)

  t.true(console.error.calledTwice) // eslint-disable-line no-console
  t.true(console.error.args[0][0].includes(hookName)) // eslint-disable-line no-console
  t.is(console.error.args[1][0].message, msg) // eslint-disable-line no-console
})
