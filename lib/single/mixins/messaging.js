import { indexOf, values } from 'lodash'
import { Commands } from '../../generate'

let master = null

export default (Base) => class extends Base {
  startListeningForMessages () {
    if (typeof this.__isListening === 'undefined') {
      this.__isListening = false
    } else /* istanbul ignore next */ if (this.__isListening) {
      return
    }

    if (typeof this.workers !== 'undefined') {
      master = this
    }
    this.__isListening = true
  }

  hasCommand (cmd) {
    if (typeof this._commandsArray === 'undefined') {
      this._commandsArray = values(Commands)
    }
    return cmd && indexOf(this._commandsArray, cmd) > -1
  }

  receiveCommand (worker, message) {
    const cmd = message.cmd
    if (!this.hasCommand(cmd)) {
      console.error(`Received unknown command ${cmd}`) // eslint-disable-line no-console
    } else if (!this.hasPlugins(cmd)) {
      console.error(`No handler registered for command ${cmd}`) // eslint-disable-line no-console
    } else {
      const args = message.args
      this.applyPlugins(cmd, { worker, args })
    }
  }

  sendCommand (worker, cmd, args) {
    if (arguments.length === 1) {
      cmd = worker
      worker = undefined
    }

    if (!this.hasCommand(cmd)) {
      console.error(`Trying to send unknown command ${cmd}`) // eslint-disable-line no-console
      return
    }

    const message = { cmd: cmd }
    if (args) {
      message.args = args
    }

    if (worker) {
      worker.receiveCommand(undefined, message)
    } else {
      master.receiveCommand(this, message)
    }
  }
}
