import * as Generate from './generate'
import * as Cluster from './cluster'
import * as Single from './single'
import * as Builder from './builder'

export default Object.assign({}, Builder, Cluster, { Generate, Single })
