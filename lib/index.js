import * as Generate from './generate'
import * as Cluster from './cluster'
import * as Single from './single'
import * as CommonMixins from './mixins'

export default Object.assign(
  {},
  Cluster,
  {
    Generate,
    Single,
    Mixins: Object.assign(
      {},
      Cluster.Mixins,
      CommonMixins
    )
  }
)
