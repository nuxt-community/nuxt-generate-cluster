import consola from 'consola'
import { Async, Generate, Mixins } from '../utils'

class Messenger extends Async.Mixins.Messaging(Mixins.Hookable()) {}

describe('async messaging', () => {
  test('Can send/receive', () => {
    const sender = new Messenger()
    Messenger.workers = []
    sender.startListeningForMessages()
    const receiver = new Messenger()
    receiver.startListeningForMessages()

    const payload = { a: 1 }

    receiver.hook(Generate.Commands.sendRoutes, (args) => {
      expect(args).toBe(payload)
    })

    sender.sendCommand(receiver, Generate.Commands.sendRoutes, payload)
  })

  test('Send unknown command fails', () => {
    const sender = new Messenger()

    sender.sendCommand('unknown-command')
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })

  test('Receive unknown command fails', () => {
    const receiver = new Messenger()

    receiver.receiveCommand(undefined, { cmd: 'unknown-command' })
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })

  test('Receive command without plugins fails', () => {
    const receiver = new Messenger()

    receiver.receiveCommand(undefined, { cmd: Generate.Commands.sendRoutes })
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })
})
