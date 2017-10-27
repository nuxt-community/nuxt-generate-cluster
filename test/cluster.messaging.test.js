import test from 'ava'
import sinon from 'sinon'
import { Mixins, Generate } from '../'

/* class BaseClass {
  constructor () {}
} */
class Messenger extends Mixins.messaging(Generate.Worker) {}

test.beforeEach(t => {
  t.context.error = console.error // eslint-disable-line no-console

  console.error = sinon.spy() // eslint-disable-line no-console
})

test.afterEach(t => {
  console.error = t.context.error // eslint-disable-line no-console
})

test('Can send/receive', async t => {
  const sender = new Messenger()
  const receiver = new Messenger()
  const payload = { a: 1 }

  receiver.plugin(Generate.Commands.sendRoutes, (message) => {
    t.is(message.worker, undefined)
    t.is(message.args, payload)
  })

  sender.sendCommand({
    send: (message) => {
      receiver.receiveCommand(message)
    }
  }, Generate.Commands.sendRoutes, payload)
})

test('Send unknown command fails', async t => {
  const sender = new Messenger()

  sender.sendCommand('unknown-command')
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Receive unknown command fails', async t => {
  const receiver = new Messenger()

  receiver.receiveCommand({ cmd: 'unknown-command' })
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Receive command without plugins fails', async t => {
  const receiver = new Messenger()

  receiver.receiveCommand({ cmd: Generate.Commands.sendRoutes })
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})
