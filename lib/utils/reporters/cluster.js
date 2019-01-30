import messaging from '../messaging'

// Consola Reporter
export default class Reporter {
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
