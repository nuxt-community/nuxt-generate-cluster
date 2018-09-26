import consola from 'consola'
import { Cluster, Generate, Mixins } from '../utils'

class Messenger extends Cluster.Mixins.Messaging(Mixins.Hookable()) {}

describe('async messaging', () => {
  test('Can send/receive', () => {
    const sender = new Messenger()
    const receiver = new Messenger()

    const receiverProcess = {
      send: (message) => {
        receiver.receiveCommand(message)
      }
    }

    const payload = { a: 1 }
    receiver.hook(Generate.Commands.sendRoutes, (args) => {
      expect(args).toBe(payload)
    })

    sender.sendCommand(receiverProcess, Generate.Commands.sendRoutes, payload)
  })

  test('Send unknown command fails', () => {
    const sender = new Messenger()

    sender.sendCommand('unknown-command')
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })

  test('Receive unknown command fails', () => {
    const receiver = new Messenger()

    receiver.receiveCommand({ cmd: 'unknown-command' })
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })

  test('Receive command without plugins fails', () => {
    const receiver = new Messenger()

    receiver.receiveCommand({ cmd: Generate.Commands.sendRoutes })
    expect(consola.error).toHaveBeenCalledTimes(1)
    consola.error.mockReset()
  })
})
