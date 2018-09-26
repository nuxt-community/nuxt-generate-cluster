import { Hookable } from '../mixins'
import { consola } from '../utils'

export default class Watchdog extends Hookable() {
  constructor() {
    super()

    this.workers = {}
  }

  *iterator() {
    const workerIds = Object.keys(this.workers)

    let i = 0
    while (i < workerIds.length) {
      yield this.workers[workerIds[i]]
      i++
    }
  }

  addInfo(workerId, key, extraInfo) {
    if (arguments.length === 2) {
      extraInfo = key
      key = undefined
    }

    if (this.workers[workerId]) {
      if (key) {
        this.workers[workerId][key] = extraInfo
      } else {
        this.workers[workerId] = Object.assign(this.workers[workerId], extraInfo || {})
      }
    }
  }

  appendInfo(workerId, key, extraInfo) {
    if (this.workers[workerId]) {
      const keyType = typeof this.workers[workerId][key]

      if (keyType === 'undefined') {
        consola.error(`Key ${key} is undefined for worker ${workerId}`)
      } else if (keyType === 'string') {
        this.workers[workerId][key] += extraInfo
      } else if (keyType === 'number') {
        this.workers[workerId][key] += parseInt(extraInfo)
      } else if (Array.isArray(this.workers[workerId][key])) {
        Array.prototype.push.apply(this.workers[workerId][key], extraInfo)
      } else if (keyType === 'object') {
        this.workers[workerId][key] = Object.assign(this.workers[workerId][key], extraInfo || {})
      }
    }
  }

  addWorker(workerId, extraInfo) {
    if (typeof this.workers[workerId] !== 'undefined') {
      consola.error(`A worker with workerId ${workerId} is already registered to the watchdog`)
    }

    this.workers[workerId] = Object.assign({
      id: workerId,
      start: process.hrtime(),
      duration: 0,
      signal: 0,
      code: 0,
      routes: 0,
      errors: 0
    }, extraInfo || {})
  }

  exitWorker(workerId, extraInfo) {
    if (this.workers[workerId]) {
      const duration = process.hrtime(this.workers[workerId].start)
      this.workers[workerId].duration = duration[0] * 1E9 + duration[1]

      if (extraInfo) {
        this.addInfo(workerId, extraInfo)
      }
    }
  }

  async countAlive() {
    const Iter = this.iterator()

    let alive = 0
    let worker
    while ((worker = Iter.next()) && !worker.done) {
      if (typeof worker.value !== 'undefined') {
        const workerAlive = await this.callHook('isWorkerAlive', worker.value)
        if (workerAlive) {
          alive++
        }
      }
    }
    return alive
  }

  allDead() {
    const Iter = this.iterator()

    let worker
    while ((worker = Iter.next()) && !worker.done) {
      if (typeof worker.value !== 'undefined') {
        // let isDead = await this.callHook('isWorkerDead', worker.value)
        const isDead = this.workers[worker.value.id].duration > 0
        if (!isDead) {
          return false
        }
      }
    }
    return true
  }
}
