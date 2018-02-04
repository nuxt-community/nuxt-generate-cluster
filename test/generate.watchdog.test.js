import test from 'ava'
import sinon from 'sinon'
import { Generate } from '..'
import { Utils } from 'nuxt'

test.beforeEach(t => {
  t.context.error = console.error // eslint-disable-line no-console

  console.error = sinon.spy() // eslint-disable-line no-console
})

test.afterEach(t => {
  console.error = t.context.error // eslint-disable-line no-console
})

test('Count alive workers', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.hook('isWorkerAlive', (worker) => {
    return worker.id === 1
  })

  watchdog.addWorker(1)
  watchdog.addWorker(2)

  t.is(await watchdog.countAlive(), 1)
})

test('Count dead workers', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.hook('isWorkerAlive', (worker) => {
    return worker.id === 1
  })

  watchdog.addWorker(1)
  watchdog.addWorker(2)
  await Utils.waitFor(1)

  watchdog.exitWorker(1)
  t.false(await watchdog.allDead())

  watchdog.exitWorker(2)
  t.true(await watchdog.allDead())
})

test('Error message on adding same id', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1)
  watchdog.addWorker(1)
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Can add info', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1)

  t.is(watchdog.workers[1].routes, 0)
  watchdog.addInfo(1, { routes: 2 })
  t.is(watchdog.workers[1].routes, 2)
  watchdog.addInfo(1, { routes: 3 })
  t.is(watchdog.workers[1].routes, 3)
})

test('Can add info by key', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1)

  t.is(watchdog.workers[1].routes, 0)
  watchdog.addInfo(1, 'routes', 2)
  t.is(watchdog.workers[1].routes, 2)
  watchdog.addInfo(1, 'routes', 3)
  t.is(watchdog.workers[1].routes, 3)
})

test('Cannot append to unknown key', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1)

  watchdog.appendInfo(1, 'unknown-key', true)
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Can append string', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1, { str: '' })

  t.is(watchdog.workers[1].str, '')
  watchdog.appendInfo(1, 'str', 'a')
  t.is(watchdog.workers[1].str, 'a')
  watchdog.appendInfo(1, 'str', 'b')
  t.is(watchdog.workers[1].str, 'ab')
})

test('Can append number', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1, { num: 0 })

  watchdog.appendInfo(1, 'num', 1)
  t.is(watchdog.workers[1].num, 1)
  watchdog.appendInfo(1, 'num', 1)
  t.is(watchdog.workers[1].num, 2)
})

test('Can append array', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1, { arr: [] })

  t.is(watchdog.workers[1].arr.length, 0)
  watchdog.appendInfo(1, 'arr', [1])
  t.is(watchdog.workers[1].arr.length, 1)
  watchdog.appendInfo(1, 'arr', [2])
  t.is(watchdog.workers[1].arr.length, 2)
})

test('Can append object', async t => {
  const watchdog = new Generate.Watchdog()
  watchdog.addWorker(1, { obj: {} })

  t.deepEqual(watchdog.workers[1].obj, {})
  watchdog.appendInfo(1, 'obj', { a: 1 })
  t.is(watchdog.workers[1].obj.a, 1)
  watchdog.appendInfo(1, 'obj', { a: 2, b: 1 })
  t.is(watchdog.workers[1].obj.a, 2)
  t.is(watchdog.workers[1].obj.b, 1)
})
