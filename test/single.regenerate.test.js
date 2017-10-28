import test from 'ava'
import { resolve } from 'path'
import http from 'http'
import serveStatic from 'serve-static'
import finalhandler from 'finalhandler'
import rp from 'request-promise-native'
import { remove } from 'fs-extra'
import { Utils } from 'nuxt'
import { Single } from '../index.js'

const port = 4002
const url = (route) => 'http://localhost:' + port + route

const rootDir = resolve(__dirname, 'fixtures/basic')
let server = null
// let master = null
let ready = false
let errorCount = -1

const config = Object.assign(
  require(resolve(rootDir, 'nuxt.config.js')),
  require(resolve(__dirname, 'fixtures/nuxt.config.js')),
  {
    dev: false,
    rootDir
  }
)

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js 1st', async t => {
  const master = new Single.Master(config, { workerCount: 1 })
  master.plugin('finished', async ({ info }) => {
    errorCount = info.errors.length
    ready = true
  })
  try {
    await master.run({ build: true })
    while (!ready) { // eslint-disable-line no-unmodified-loop-condition
      await Utils.waitFor(250)
    }
    t.is(errorCount, 2)
  } catch (err) {
  }
  const serve = serveStatic(resolve(rootDir, 'dist'))
  server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res))
  })
  server.listen(port)
})

test('/users/1', async t => {
  const html = await rp(url('/users/1'))
  t.true(html.includes('<h1>User: 1</h1>'))
})

test('/users/1 -> Not found', async t => {
  await remove(resolve(rootDir, 'dist/users'))
  try {
    await rp(url('/users/1'))
  } catch (error) {
    t.true(error.statusCode === 404)
    t.true(error.response.body.includes('Cannot GET /users/1'))
  }
})

test('Regenerate nuxt 2nd', async t => {
  ready = false
  errorCount = -1
  const master = new Single.Master(config, { workerCount: 1 })
  master.plugin('finished', async ({ info }) => {
    errorCount = info.errors.length
    ready = true
  })
  try {
    await master.run({ build: false })
    while (!ready) { // eslint-disable-line no-unmodified-loop-condition
      await Utils.waitFor(250)
    }
    // Expect no errors as the routes from generate.routes() should all be ok
    t.is(errorCount, 0)
  } catch (err) {
  }
})

test('/users/1 regenerated', async t => {
  const html = await rp(url('/users/1'))
  t.true(html.includes('<h1>User: 1</h1>'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server', t => {
  server.close()
})
