import { isMaster } from 'cluster'
import env from 'std-env'
import figures from 'figures'
import chalk from 'chalk'
import messaging from './messaging'
import { ClusterReporter } from './reporters'

let _consola
if (global.__consolaSet === undefined) {
  _consola = global.consola
  // Delete the global.consola set by consola self
  delete global.consola
}

let consola = global.consola // eslint-disable-line import/no-mutable-exports

if (!consola) {
  consola = _consola.create({
    level: env.debug ? 5 : 3,
    types: {
      ..._consola._types,
      ...{
        cluster: {
          level: 4,
          color: 'blue',
          icon: chalk.magenta(figures.radioOn)
        },
        master: {
          level: 2,
          color: 'blue',
          icon: chalk.cyan(figures.info)
        },
        debug: {
          level: 5,
          color: 'grey'
        },
        trace: {
          level: 6,
          color: 'white'
        }
      }
    }
  })
  _consola = null

  if (isMaster) {
    /* istanbul ignore next */
    messaging.on('consola', ({ logObj, stream }) => {
      logObj.date = new Date(logObj.date)
      consola[logObj.type](...logObj.args)
    })
  } else {
    /* istanbul ignore next */
    consola.setReporters(new ClusterReporter())
  }

  global.__consolaSet = true
  global.consola = consola

  // Delete the loaded consola module from node's cache
  // so new imports use the above global.consola
  delete require.cache[require.resolve('consola')]
}

export default consola
