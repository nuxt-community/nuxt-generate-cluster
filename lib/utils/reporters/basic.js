import { BasicReporter } from 'consola/dist/consola.cjs.js'
import messaging from '../messaging'

// Consola Reporter
export default class Reporter extends BasicReporter {
  constructor(options) {
    super(options)

    /* istanbul ignore next */
    messaging.on('consola', ({ logObj, stream }) => {
      logObj.date = new Date(logObj.date)

      this.superLog(logObj, {
        async: stream.async,
        stdout: process.stdout,
        stderr: process.stderr
      })
    })
  }

  superLog(logObj, stream) {
    /* istanbul ignore next */
    super.log(logObj, stream)
  }

  log(logObj, { async } = {}) {
    if (logObj.type === 'success' && logObj.args[0].startsWith('Generated ')) {
      // Ignore success messages from Nuxt.Generator::generateRoute
      return
    }

    if (global._ngc_log_tag) {
      logObj.tag = global._ngc_log_tag
    }

    messaging.send(null, 'consola', { logObj, stream: { async } })
  }
}
