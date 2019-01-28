import path from 'path'

export default {
  modulesDir: path.join(__dirname, '..', '..', '..', 'node_modules'),

  generate: {
    routes(callback, params) {
      const routes = [
        `/error/${params.error}`
      ]
      callback(null, routes)
    }
  }
}
