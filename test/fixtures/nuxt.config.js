module.exports = {
  build: {
    extend (config) {
      config.resolve.modules.push(__dirname + '/../../node_modules')
      config.resolveLoader.modules.push(__dirname + '/../../node_modules')
    }
  }
}
