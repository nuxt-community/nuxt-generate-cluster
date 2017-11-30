import * as Generate from './generate'
import * as Cluster from './cluster'
import * as Async from './async'
import * as CommonMixins from './mixins'

export default Object.assign(
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
