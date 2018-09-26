import cluster from 'cluster'
import { FancyReporter } from 'consola'

// Consola Reporter
export default class Reporter extends FancyReporter {
  constructor(stream, options = {}) {
    super(stream, options)

    if (cluster.isMaster) {
      const t = this
      cluster.on('message', (worker, message, handle) => {
        if (arguments.length === 2) {
          handle = message
          message = worker
          worker = undefined
        } else if (arguments.length === 1) {
          message = worker
          worker = undefined
        }

        if (message && message.cmd === 'consola') {
          t.superLog(message.logObj)
        }
      })
    }
  }

  superLog(logObj) {
    if (logObj.type === 'success' && logObj.message.startsWith('Generated ')) {
      // Ignore success messages from Nuxt.Generator::generateRoute
      return
    }

    super.log(logObj)
  }

  log(logObj) {
    if (!cluster.isMaster) {
      process.send({ cmd: 'consola', logObj })
      return
    }

    this.superLog(logObj)
  }
}
