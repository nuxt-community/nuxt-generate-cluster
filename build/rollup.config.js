import { resolve } from 'path'
import rollupBabel from 'rollup-plugin-babel'
import commonJS from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import license from 'rollup-plugin-license'

import packageJson from '../package.json'

const dependencies = [
  'os',
  'cluster',
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(require('../node_modules/nuxt/package.json').dependencies)
]
  
const version = packageJson.version || process.env.VERSION

// -----------------------------
// Banner
// -----------------------------
const banner =
  '/*!\n' +
  ' * Nuxt-Generate-Cluster v' + version + '\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const plugins = []

// -----------------------------
// Aliases
// -----------------------------
const rootDir = resolve(__dirname, '..')

export default {
  input: resolve(rootDir, 'lib', 'index.js'),
  output: {
    name: 'Nuxt Generate Cluster',
    file: resolve(rootDir, 'dist', 'generator.js'),
    format: 'cjs',
    sourcemap: true
  },
  external: dependencies,
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonJS(),
    license({ banner })
  ].concat(plugins)
}
