import { FancyReporter } from 'consola'
import messaging from '../messaging'

// Consola Reporter
export default class Reporter extends FancyReporter {
  constructor(stream, options = {}) {
    super(stream, options)

    /* istanbul ignore next */
    messaging.on('consola', (logObj) => {
      logObj.date = new Date(logObj.date)
      this.superLog(logObj)
    })
  }

  superLog(logObj) {
    if (logObj.type === 'success' && logObj.message.startsWith('Generated ')) {
      // Ignore success messages from Nuxt.Generator::generateRoute
      return
    }

    /* istanbul ignore next */
    super.log(logObj)
  }

  log(logObj) {
    messaging.send(null, 'consola', logObj)
  }
}
