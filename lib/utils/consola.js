import env from 'std-env'
// import figures from 'figures'
import { Consola, Types } from 'consola/dist/consola.cjs.js'
import { BasicReporter, FancyReporter } from './reporters'

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
        color: 'blue'
      },
      master: {
        level: 2,
        color: 'blue'
      },
      worker: {
        level: 3,
        color: 'green'
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

  consola.defaultLevel = consola.level
  consola.maxLevel = 6

  if (env.minimalCLI) {
    /* istanbul ignore next */
    consola.add(new BasicReporter())
  } else {
    consola.add(new FancyReporter())
  }

  global.myConsolaSet = true
  global.consola = consola

  // Delete the loaded consola module from node's cache
  // so new imports use the above global.consola
  delete require.cache[require.resolve('consola')]
}

export default consola
