const fs = require('fs')
const path = require('path')

if (fs.existsSync(path.resolve(__dirname, '.babelrc'))) {
  // Use esm version when using linked repository to prevent builds
  const requireModule = require('esm')(module, {})
  module.exports = requireModule('./lib/index.js').default
} else {
  // Use production bundle by default
  module.exports = require('./dist/generator.js')
}
