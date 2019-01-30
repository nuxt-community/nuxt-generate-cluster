const fs = require('fs')
const path = require('path')

if (fs.existsSync(path.resolve(__dirname, '.git'))) {
  // Use esm version when using linked repository to prevent builds
  const requireModule = require('esm')(module, {
    cache: false,
    cjs: {
      cache: true,
      vars: true,
      namedExports: true
    }
  })

  module.exports = requireModule('./lib/index.js').default
} else {
  // Use production bundle by default
  module.exports = require('./dist/generator.js')
}
