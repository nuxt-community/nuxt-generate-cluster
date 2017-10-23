# Multi-threaded generate command for Nuxt.js
[![npm](https://img.shields.io/npm/dt/nuxt-generate-cluster.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-generate-cluster/latest.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)
<a href="https://github.com/nuxt/nuxt.js/"><img src="https://img.shields.io/badge/nuxt.js-v1.0.0--rc11-800080.svg?style=flat-square" alt=""/></a>

> Use multiple workers to generate the static files for your Nuxt.js project

## Setup
- Install from npm `npm install --save nuxt-generate-cluster@1.0.0-rc11` or `yarn add nuxt-generate-cluster@1.0.0-rc11`

The version of this package is in sync with Nuxt's version, use the correct version as your dependency to make sure the generate command supports the latest Nuxt.js features.

- Configure the generate options in `nuxt.config.js`
```js
  generate: {
    workers: 4,
    worker_concurrency: 500,
    concurrency: 500,
    routes (callback, params) {
      return axios.get('https://api.example.com/routes?since=' + params.last_finished)
      .then((res) => {
        return res.data
      })
    }
  }
```

- (Optional) Add a generate script to your `package.json`
```js
  "scripts": {
    "generate": "nuxt-generate -w 4"
  }
```

## Nuxt config options

### `workers`
- Default: number of processors

The number of workers that should be started. It probably has no use to start more workers then number of processors in your system.

### `worker_concurrency`
- Default: `500`

To even the load between workers they are sent batches of routes to generate, otherwise a worker with 'easy' routes might finish long before others. Workers will also still use the concurrency option from Nuxt.

### `routes`

The default [Nuxt.js routes method](https://nuxtjs.org/api/configuration-generate#routes) has been extended so you can pass additional parameters to it, see params parameter in example config under Setup. By default
it will list 3 timestamps:

- `last_started`
The unix timestamp when the nuxt-generate command was last executed, should be just now

- `last_built`
The unix timestamp when the nuxt project was last built by nuxt-generate

- `last_finished`
The unix timestamp when nuxt-generate last finished succesfully (eg not interrupted by `ctrl+c`)

## Command-line options

> Please note that you need to explicitly indicate with `-b` that you want to (re-)build your project

```
$ nuxt-generate --help
    Description
      Generate a static web application (server-rendered)
    Usage
      $ nuxt-generate <dir>
    Options
      --build, -b         Whether to (re-)build the nuxt project
      --config-file, -c   Path to Nuxt.js config file (default: nuxt.config.js)
      --help, -h          Displays this message
      --params, -p        Extra parameters which should be passed to nuxt.config.generate.routes()
                            should be a JSON string or queryString
      --workers,-w [NUM]  How many workers should be started
                            (default: # cpus)
      --spa              Launch in SPA mode
      --universal        Launch in Universal mode (default)
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
  last_started: 1508609323,
  last_built: 0,
  last_finished: 0 }
```

If you are using a npm script under bash use `--` to pass the parameters to nuxt-generate instead of npm:

```
$ npm run generate -- -p '{ "id": [1,2,3] }'
// will print =>
{ id: [ 1, 2, 3 ],
  last_started: 1508786574,
  last_built: 0,
  last_finished: 0 }
```


