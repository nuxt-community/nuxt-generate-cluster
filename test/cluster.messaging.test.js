import test from 'ava'
import sinon from 'sinon'
import { Mixins, Generate } from '..'

class Messenger extends Mixins.Messaging(Mixins.Hookable()) {}

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
  const receiverProcess = {}
  receiverProcess.send = (message) => {
    receiver.receiveCommand(message)
  }
  const payload = { a: 1 }

  receiver.hook(Generate.Commands.sendRoutes, (arg) => {
    t.is(arg, payload)
  })

  sender.sendCommand(receiverProcess, Generate.Commands.sendRoutes, payload)
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
