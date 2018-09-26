const { Worker } = require('../../')

const options = JSON.parse(process.env.options)

const worker = new Worker(options)
worker.run()
