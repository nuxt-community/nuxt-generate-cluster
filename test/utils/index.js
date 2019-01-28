import path from 'path'
import fs from 'fs'
import klawSync from 'klaw-sync'
import spawn from 'cross-spawn'

import _getPort from 'get-port'
import { defaultsDeep, find } from 'lodash'
import _rp from 'request-promise-native'

import pkg from '../../package.json'
import Cluster from '../../lib/index.js'
import * as Async from '../../lib/async'
import * as Generate from '../../lib/generate'
import * as Mixins from '../../lib/mixins'
import * as Reporters from '../../lib/utils/reporters'

export { Nuxt, Builder, Generator } from 'nuxt'

export { BundleBuilder } from '@nuxt/webpack'

export * from '../../lib/utils'

export {
  Cluster,
  Async,
  Generate,
  Mixins,
  Reporters
}

export const rp = _rp
export const getPort = _getPort
export const version = pkg.version

export const loadFixture = async function (fixture, overrides) {
  const rootDir = path.resolve(__dirname, '..', 'fixtures', fixture)
  const configFile = path.resolve(rootDir, `nuxt.config${process.env.NUXT_TS === 'true' ? '.ts' : '.js'}`)

  let config = fs.existsSync(configFile) ? (await import(`../fixtures/${fixture}/nuxt.config`)).default : {}
  if (typeof config === 'function') {
    config = await config()
  }

  config.rootDir = rootDir
  config.dev = false
  config.test = true

  return defaultsDeep({}, overrides, config)
}

export const waitFor = function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 0))
}

/**
 * Prepare an object to pass to the createSportsSelectionView function
 * @param {Function} condition return true to stop the waiting
 * @param {Number} duration seconds totally wait
 * @param {Number} interval milliseconds interval to check the condition
 *
 * @returns {Boolean} true: timeout, false: condition becomes true within total time
 */
export const waitUntil = async function waitUntil(condition, duration = 20, interval = 250) {
  let iterator = 0
  const steps = Math.floor(duration * 1000 / interval)

  while (!condition() && iterator < steps) {
    await waitFor(interval)
    iterator++
  }

  if (iterator === steps) {
    return true
  }
  return false
}

export const listPaths = function listPaths(dir, pathsBefore = [], options = {}) {
  if (Array.isArray(pathsBefore) && pathsBefore.length) {
    // only return files that didn't exist before building
    // and files that have been changed
    options.filter = (item) => {
      const foundItem = find(pathsBefore, (itemBefore) => {
        return item.path === itemBefore.path
      })
      return typeof foundItem === 'undefined' ||
        item.stats.mtimeMs !== foundItem.stats.mtimeMs
    }
  }

  return klawSync(dir, options)
}

export const equalOrStartsWith = function equalOrStartsWith(string1, string2) {
  return string1 === string2 || string2.startsWith(string1)
}

/**
 * Run the CLI script to generate a given fixture, and return the CLI's output.
 *
 * @param {string} fixtureName
 * @returns {{stdout: string, stderr: string, exitCode: number}}
 */
export function runCliGenerate(fixtureName) {
  const rootDir = path.resolve(__dirname, '..', 'fixtures', fixtureName)
  // Nuxt sets log level to 0 for CI and env=TEST
  // -v offsets from default log level, not current level
  // hence one -v is enough
  const args = [
    rootDir,
    '--build',
    '--workers=2',
    `--config-file=nuxt.config.js`,
    '-v'
  ]
  const env = Object.assign(process.env, {
    'NODE_ENV': 'production'
  })
  const binGenerate = path.resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
  const result = spawn.sync(binGenerate, args, { env })
  return {
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString(),
    exitCode: result.status
  }
}
