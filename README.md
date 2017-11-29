# Multi-threaded generate command for Nuxt.js
[![npm](https://img.shields.io/npm/dt/nuxt-generate-cluster.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-generate-cluster/latest.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)
<a href="https://github.com/nuxt/nuxt.js/"><img src="https://img.shields.io/badge/nuxt.js-next-800080.svg?style=flat-square" alt=""/></a>

> Use multiple workers to generate the static files for your Nuxt.js project

### :fire: Please use the `@next` version of this package and nuxt until a new nuxt version is released

## Setup

Install the package with npm
```
 npm install --save nuxt-generate-cluster@1.0.0-rc11
```
or use yarn
```
yarn add nuxt-generate-cluster@1.0.0-rc11`
```
> The version of this package is in sync with Nuxt's version, use the correct version as your dependency to make sure the generate command supports the latest Nuxt.js features.

Optionally add a generate script to your `package.json`
```js
  "scripts": {
    "generate": "nuxt-generate -w 4"
  }
```

## Nuxt config options

Configure the generate options in `nuxt.config.js`
```js
  generate: {
    workers: 4,
    workerConcurrency: 500,
    concurrency: 500,
    routes (callback, params) {
      return axios.get('https://api.example.com/routes?since=' + params.lastFinished)
      .then((res) => {
        return res.data
      })
    },
    done ({ duration, errors, workerInfo }) {
      if (errors.length) {
        axios.post('https://api.example.com/routes', { generate_errors: errors })
      }
    }
  }
```

### `workers`
- Default: number of processors

The number of workers that should be started. It probably has no use to start more workers then number of processors in your system.

### `workerConcurrency`
- Default: `500`

To even the load between workers they are sent batches of routes to generate, otherwise a worker with 'easy' routes might finish long before others. Workers will also still use the concurrency option from Nuxt.

### `routes`

The default [Nuxt.js routes method](https://nuxtjs.org/api/configuration-generate#routes) has been extended so you can pass additional parameters to it, see params parameter in example config under Setup. By default
it will list 3 timestamps:

- `lastStarted`
The unix timestamp when the nuxt-generate command was last executed, should be just now

- `lastBuilt`
The unix timestamp when the nuxt project was last built by nuxt-generate

- `lastFinished`
The unix timestamp when nuxt-generate last finished succesfully (eg not interrupted by `ctrl+c`)

> Timestamps are locally stored in `~/.data-store/nuxt-generate-cluster.json`, see [data-store](https://github.com/jonschlinkert/data-store)

### `done`

This method will be called when all workers are finished, it receives three arguments:

- `duration`
The total time in seconds that the command ran

- `errors`
An array of all the errors that were encountered. Errors can have type `handled` or `unhandled`, for the latter the error message will contain the stacktrace

```js
[ { type: 'handled',
    route: '/non-existing-link',
    error: 
     { statusCode: 404,
       message: 'The message from your 404 page' } }
]
```

- `workerInfo`
An object with detailed information about each worker. Data passed is from the watchdog object that we use internally to monitor the worker status.

```js
{{ '6707':                            // the process id of the worker
   { start: [ 1929158, 859524606 ],   // process.hrtime the worker was started
     duration: 109567,                // how long the worker was active
     signal: 0,                       // the signal by which the worker was killed (if any)
     code: 0,                         // the exit status of the worker
     routes: 73,                      // the number of routes generated by this worker
     errors: [] },                    // the errors this worker encountered, errors of all workers
                                      // combined is the error argument above
}
```

## Command-line options

> Please note that you need to explicitly indicate with `-b` that you want to (re-)build your project

```
$ nuxt-generate --help
    Description
      Generate a static web application (server-rendered)
    Usage
      $ nuxt-generate <dir>
    Options
      -b, --build           Whether to (re-)build the nuxt project
      -c, --config-file     Path to Nuxt.js config file (default: nuxt.config.js)
      -h, --help            Displays this message
      -p, --params          Extra parameters which should be passed to routes method
                              (should be a JSON string or queryString)
      -w, --workers [NUM]   How many workers should be started
                              (default: # cpus)
      -wc [NUM],            How many routes should be sent to 
      --worker-concurrency [NUM]    a worker per iteration

      --spa               Launch in SPA mode
      --universal         Launch in Universal mode (default)
```

If you need to have more control which routes should be generated, use the `-p` option to pass additional parameters to your routes method.

```
# nuxt.config.js
generate: {
  routes (callback, params) {
    console.log(params)
  }
}

$ nuxt-generate -w 2 -p id=1&id=2
// will print =>
{ id: [ '1', '2' ],
  lastStarted: 1508609323,
  lastBuilt: 0,
  lastFinished: 0 }
```

If you are using a npm script under bash use `--` to pass the parameters to nuxt-generate instead of npm:

```
$ npm run generate -- -p '{ "id": [1,2,3] }'
// will print =>
{ id: [ 1, 2, 3 ],
  lastStarted: 1508786574,
  lastBuilt: 0,
  lastFinished: 0 }
```


