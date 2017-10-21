
require('source-map-support').install()

// Fix babel flag
/* istanbul ignore else */
process.noDeprecation = true

module.exports = require('./dist/generator')
