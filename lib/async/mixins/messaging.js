import indexOf from 'lodash/indexOf'
import values from 'lodash/values'
import { Commands } from '../../generate'
import { consola } from '../../utils'

let master = null

export default Base => class extends Base {
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

  async receiveCommand (worker, message) {
    const cmd = message.cmd

    if (!this.hasCommand(cmd)) {
      consola.error(`Received unknown command ${cmd}`)
    } else if (!this.hasHooks(cmd)) {
      consola.error(`No handler registered for command ${cmd}`)
    } else if (worker) {
      await this.callHook(cmd, worker, message.args)
    } else {
      await this.callHook(cmd, message.args)
    }
  }

  sendCommand (worker, cmd, args) {
    if (arguments.length === 1) {
      cmd = worker
      worker = undefined
    }

    if (!this.hasCommand(cmd)) {
      consola.error(`Trying to send unknown command ${cmd}`)
      return
    }

    const message = { cmd, args }

    if (worker) {
      worker.receiveCommand(undefined, message)
    } else {
      master.receiveCommand(this, message)
    }
  }
}
