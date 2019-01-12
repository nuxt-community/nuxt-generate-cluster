import { BasicReporter } from 'consola/dist/consola.cjs.js'
import messaging from '../messaging'

// Consola Reporter
export default class Reporter extends BasicReporter {
  constructor(options) {
    super(options)

    /* istanbul ignore next */
    messaging.on('consola', ({ logObj, opts }) => {
      logObj.date = new Date(logObj.date)
      this.superLog(logObj, opts)
    })
  }

  superLog(logObj, opts) {
    if (logObj.type === 'success' && logObj.args[0].startsWith('Generated ')) {
      // Ignore success messages from Nuxt.Generator::generateRoute
      return
    }

    /* istanbul ignore next */
    super.log(logObj, opts)
  }

  log(logObj, { async } = {}) {
    messaging.send(null, 'consola', { logObj, opts: { async } })
  }
}
