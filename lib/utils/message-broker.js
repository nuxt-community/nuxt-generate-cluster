import cluster from 'cluster'
import uuid from 'uuid'
import consola from 'consola'

export default class MessageBroker {
  constructor({ isMaster, masterId, alias, autoListen } = {}, masterRef) {
    this.id = uuid()

    this.isMaster = isMaster !== undefined ? isMaster : cluster.isMaster
    this.masterId = masterId || 'master'
    this.masterRef = masterRef

    this.alias = alias || (this.isMaster ? this.masterId : undefined)
    this.listening = false

    this.proxies = {}
    this.services = {}

    // this._messageHandler
    if (autoListen !== false) {
      this.listen()
    }
  }

  registerWithMaster() {
    this.send(this.masterId, '_register', {
      alias: this.alias
    })
  }

  registerProxy({ alias }, senderId, ref) {
    consola.debug(`registering ${senderId} ` + (alias ? `with alias ${alias}` : 'without alias') + (ref && ref.id ? ` and id ${ref.id}` : ''))

    this.proxies[senderId] = ref

    if (alias) {
      this.proxies[alias] = ref
    }
  }

  listen() {
    if (!this.isMaster) {
      this.registerWithMaster()
    } else {
      this.on('_register', (...args) => {
        this.registerProxy(...args)
      })
    }

    if (!this.listening) {
      if (this.isMaster) {
        this._messageHandler = (worker, message) => {
          /* istanbul ignore next */
          this.handleMessage(message, worker)
        }

        cluster.on('message', this._messageHandler)
      } else {
        this._messageHandler = (message) => {
          /* istanbul ignore next */
          this.handleMessage(message)
        }

        process.on('message', this._messageHandler)
      }

      this.listening = true
    }
  }

  close() {
    if (this._messageHandler) {
      if (this.isMaster) {
        cluster.off('message', this._messageHandler)
      } else {
        process.off('message', this._messageHandler)
      }
    }
  }

  handleMessage(message, worker) {
    consola.trace((this.alias || this.id) + ' received message', message instanceof Object ? JSON.stringify(message) : message)

    const { receiverId } = message
    if (receiverId !== undefined) {
      if (
        receiverId === this.id ||
        receiverId === this.alias ||
        (this.isMaster && receiverId === this.masterId)
      ) {
        this.callService(message, worker)
      } else if (this.isMaster && this.proxies[receiverId]) {
        this.proxies[receiverId].send(message)
      } else {
        consola.warn(`Proxy ${receiverId} not registered`)
      }
    }
  }

  callService({ senderId, serviceId, data }, worker) {
    if (serviceId in this.services) {
      this.services[serviceId](data, senderId, worker)
    } else {
      consola.warn(`Proxy '${this.alias || this.id}': Service ${serviceId} not registered`)
    }
  }

  on(serviceId, callback, overwrite) {
    if (serviceId in this.services && !overwrite) {
      consola.warn(`Service ${serviceId} already registered`)
    } else {
      this.services[serviceId] = callback
    }
  }

  send(receiverIdOrAlias, serviceId, data) {
    const message = {
      receiverId: receiverIdOrAlias || this.masterId,
      senderId: this.id,
      serviceId,
      data
    }
    this.sendMessage(message)
  }

  sendMessage(message) {
    if (!this.isMaster && !cluster.isMaster) {
      consola.trace(`sending message through process`, JSON.stringify(message))

      process.send(message)
    } else if (!this.isMaster && this.masterRef) {
      return new Promise((resolve) => {
        consola.trace(`sending message through promise`, JSON.stringify(message))

        const ref = {}
        if (message.serviceId === '_register') {
          ref.send = (message) => {
            this.handleMessage(message)
          }
        }

        this.masterRef.handleMessage(message, ref)
        resolve()
      })
    } else if (this.proxies[message.receiverId]) {
      consola.trace(`sending message through proxy`, JSON.stringify(message))

      this.proxies[message.receiverId].send(message)
    } else if (message.receiverId === this.id || message.receiverId === this.alias) {
      this.handleMessage(message)
    } else {
      consola.error(`Unable to send message, unknown receiver ${message.receiverId}`)
    }
  }
}
