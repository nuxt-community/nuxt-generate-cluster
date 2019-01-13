import { resolve } from 'path'
import commonJS from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

import pck from '../package.json'
import nuxt from '../node_modules/nuxt/package.json'

const dependencies = [
  'cluster',
  'fs',
  'os',
  'path',
  'util',
  ...Object.keys(pck.dependencies),
  ...Object.keys(nuxt.dependencies)
]

Object.keys(nuxt.dependencies).forEach((nuxtPkg) => {
  const pck = require(`../node_modules/${nuxtPkg}/package.json`)
  Array.prototype.push.apply(dependencies, Object.keys(pck.dependencies).filter(p => !dependencies.includes(p)))
})

const rootDir = resolve(__dirname, '..')

export default [{
  input: resolve(rootDir, 'lib', 'index.js'),
  output: {
    name: 'Nuxt Generate Cluster',
    file: resolve(rootDir, 'dist', 'generator.js'),
    format: 'cjs',
    preferConst: true,
    sourcemap: true
  },
  external: dependencies,
  plugins: [
    nodeResolve({
      only: [/lodash/]
    }),
    commonJS()
  ]
}]
