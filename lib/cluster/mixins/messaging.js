import { indexOf, values } from 'lodash'
import cluster from 'cluster'
import { Commands } from '../../generate'

export default (Base) => class extends Base {
  startListeningForMessages() {
    if (typeof this.__isListening === 'undefined') {
      this.__isListening = false
    } else if (this.__isListening) {
      return
    }

    if (cluster.isMaster) {
      cluster.on('message', this.receiveCommand.bind(this))
    } else {
      process.on('message', this.receiveCommand.bind(this))
    }
    this.__isListening = true
  }

  hasCommand(cmd) {
    if (typeof this._commandsArray === 'undefined') {
      this._commandsArray = values(Commands)
    }
    return cmd && indexOf(this._commandsArray, cmd) > -1
  }

  async receiveCommand(worker, message, handle) {
    if (arguments.length === 2) {
      handle = message
      message = worker
      worker = undefined
    } else if (arguments.length === 1) {
      message = worker
      worker = undefined
    }

    const cmd = message.cmd
    if (!this.hasCommand(cmd)) {
      console.error(`Received unknown command $cmd`) // eslint-disable-line no-console
    } else if (!this.hasHooks(cmd)) {
      console.error(`No handler registered for command ${cmd}`) // eslint-disable-line no-console
    } else {
      if (worker) {
        await this.callHook(cmd, worker, message.args)
      } else {
        await this.callHook(cmd, message.args)
      }
    }
  }

  sendCommand(worker, cmd, args) {
    if (arguments.length === 1) {
      cmd = worker
      worker = undefined
    }

    if (!this.hasCommand(cmd)) {
      console.error(`Trying to send unknown command ${cmd}`) // eslint-disable-line no-console
      return
    }

    const message = { cmd, args }

    if (worker) {
      worker.send(message)
    } else {
      process.send(message)
    }
  }
}
