const Generate = require('./generate')
const Cluster = require('./cluster')
const Async = require('./async')
const CommonMixins = require('./mixins')

module.exports = Object.assign(
  {},
  Cluster,
  {
    Generate,
    Async,
    Mixins: Object.assign(
      {},
      Cluster.Mixins,
      CommonMixins
    )
  }
)
