import test from 'ava'
import { resolve } from 'path'
import { Utils } from 'nuxt'
import { Async } from '..'
import { interceptLog } from './helpers/console'

let nuxt = null
let logSpy

// Init nuxt.js and create server listening on localhost:4000
test.serial('Init Nuxt.js', async t => {
  let ready = false
  const rootDir = resolve(__dirname, 'fixtures/error')
  const config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir
  config.buildDir = '.nuxt-error-async'
  config.modulesDir = [ resolve(__dirname, '../node_modules/') ]
  config.dev = false
  config.generate = {
    routes() {
      return ['/']
    },
    done(info) {
      t.is(info.errors.length, 1)
      t.is(info.errors[0].type, 'unhandled')
      t.true(info.errors[0].error.stack.includes('not_defined is not defined'))
      ready = true
    }
  }

  logSpy = await interceptLog(async () => {
    const master = new Async.Master(config, { workerCount: 1 })
    nuxt = master.generator.nuxt

    await master.run({ build: true })
    while (!ready) { // eslint-disable-line no-unmodified-loop-condition
      await Utils.waitFor(250)
    }
  })

  t.true(logSpy.calledWithMatch('DONE'))
})

test.serial('Deprecated: dev in build.extend()', async t => {
  t.true(logSpy.calledWith('[build:done]: hook error'))
})

test.serial('Error: resolvePath()', async t => {
  let error = t.throws(() => nuxt.resolvePath())
  t.true(error instanceof TypeError)

  error = t.throws(() => nuxt.resolvePath('@/pages/about.vue'))
  t.true(error.message.includes('Cannot resolve "@/pages/about.vue"'))
})
