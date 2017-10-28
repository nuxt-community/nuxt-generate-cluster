import test from 'ava'
import sinon from 'sinon'
import { Single, Generate } from '../'

/* class BaseClass {
  constructor () {}
} */
class Messenger extends Single.Mixins.messaging(Generate.Worker) {}

test.beforeEach(t => {
  t.context.error = console.error // eslint-disable-line no-console

  console.error = sinon.spy() // eslint-disable-line no-console
})

test.afterEach(t => {
  console.error = t.context.error // eslint-disable-line no-console
})

test('Can send/receive', async t => {
  const sender = new Messenger()
  Messenger.workers = []
  sender.startListeningForMessages()
  const receiver = new Messenger()
  receiver.startListeningForMessages()

  const payload = { a: 1 }

  receiver.plugin(Generate.Commands.sendRoutes, (message) => {
    t.is(message.worker, undefined)
    t.is(message.args, payload)
  })

  sender.sendCommand(receiver, Generate.Commands.sendRoutes, payload)
})

test('Send unknown command fails', async t => {
  const sender = new Messenger()

  sender.sendCommand('unknown-command')
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Receive unknown command fails', async t => {
  const receiver = new Messenger()

  receiver.receiveCommand(undefined, { cmd: 'unknown-command' })
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})

test('Receive command without plugins fails', async t => {
  const receiver = new Messenger()

  receiver.receiveCommand(undefined, { cmd: Generate.Commands.sendRoutes })
  t.true(console.error.calledOnce) // eslint-disable-line no-console
})
