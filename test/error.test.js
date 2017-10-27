import test from 'ava'
import { resolve } from 'path'
import { Utils } from 'nuxt'
import { Master } from '../index.js'

// Init nuxt.js and create server listening on localhost:4000
test('Generate Error Nuxt.js', async t => {
  let ready = false
  let options = {
    rootDir: resolve(__dirname, 'fixtures/error'),
    dev: false,
    generate: {
      routes: [
        '/'
      ],
      finished (info) {
        t.is(info.errors.length, 1)
        t.is(info.errors[0].type, 'unhandled')
        t.true(info.errors[0].error.stack.includes('not_defined is not defined'))
        ready = true
      }
    }
  }
  options = Object.assign(options, require(resolve(__dirname, 'fixtures/nuxt.config.js')))
  const master = new Master(options, {
    workerCount: 1,
    setup: {
      exec: resolve(__dirname, 'fixtures/cluster.worker.js')
    }
  })
  try {
    await master.run({ build: true })
    while (!ready) { // eslint-disable-line no-unmodified-loop-condition
      await Utils.waitFor(250)
    }
  } catch (err) {
  }
})
