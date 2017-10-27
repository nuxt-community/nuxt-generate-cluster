import test from 'ava'
import { resolve } from 'path'
import { Nuxt, Builder } from 'nuxt'
import { Generator } from '../'

test('Fail with routes() which throw an error', async t => {
  let options = {
    rootDir: resolve(__dirname, 'fixtures/basic'),
    dev: false,
    generate: {
      async routes () {
        throw new Error('Not today!')
      }
    }
  }
  options = Object.assign({}, options, require(resolve(__dirname, 'fixtures/nuxt.config.js')))
  const nuxt = new Nuxt(options)
  const builder = new Builder(nuxt)
  const generator = new Generator(nuxt, builder)
  return generator.generate()
    .catch((e) => {
      t.true(e.message === 'Not today!')
    })
})
