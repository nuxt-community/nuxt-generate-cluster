import { isMaster } from 'cluster'
import env from 'std-env'
import figures from 'figures'
import chalk from 'chalk'
import { Consola, BasicReporter, FancyReporter, Types } from 'consola/dist/consola.cjs.js'
import messaging from './messaging'
import { ClusterReporter } from './reporters'

if (typeof global.myConsolaSet === 'undefined') {
  // Delete the global.consola set by consola self
  delete global.consola
}

let consola = global && global.consola // eslint-disable-line import/no-mutable-exports

if (!consola) {
  consola = new Consola({
    level: env.debug ? 5 : 3,
    types: Object.assign(Types, {
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
    })
  })

  consola._defaultLevel = consola.level
  consola._maxLevel = 6

  if (isMaster) {
    /* istanbul ignore next */
    messaging.on('consola', ({ logObj, stream }) => {
      logObj.date = new Date(logObj.date)
      consola[logObj.type](...logObj.args)
    })

    if (env.ci || env.test) {
      /* istanbul ignore next */
      consola.add(new BasicReporter())
    } else {
      consola.add(new FancyReporter())
    }
  } else {
    /* istanbul ignore next */
    consola.add(new ClusterReporter())
  }

  global.myConsolaSet = true
  global.consola = consola

  // Delete the loaded consola module from node's cache
  // so new imports use the above global.consola
  delete require.cache[require.resolve('consola')]
}

export default consola
