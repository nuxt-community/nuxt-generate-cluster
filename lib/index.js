import * as Cluster from './cluster'
import * as Generate from './generate'
import * as Builder from './builder'

export default Object.assign({}, Builder, Cluster, { Generate })
