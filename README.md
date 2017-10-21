# Multi-threaded generator command for nuxt.js
[![npm](https://img.shields.io/npm/dt/nuxt-generate-cluster.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-generate-cluster/latest.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-generate-cluster)

> Use multiple workers to generate static files for your Nuxt.js project

## Setup
- Install from npm `npm install --save nuxt-generate-cluster` or `yarn add nuxt-generate-cluster`
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
## Nuxt config options

### `workers`
- Default: number of processors

The amount of workers that should be started. It probably has no use to start more workers then number of processors in your system.

### `worker_concurrency`
- Default: `500`

To even the load between workers they are sent batches of routes to generate, otherwise a worker with 'easy' routes might finish long before others. Workers will also still use the normal concurrency option from Nuxt.

### `routes`

The default Nuxt routes method has been extended so you can pass additional parameters to it, see params parameter in example config under Setup. By default
these will list 3 timestamps:

- `last_started`
The unix timestamp when the nuxt-generate command was last started

- `last_build`
The unix timestamp when the nuxt project was last build by nuxt-generate

- `last_finished`
The unix timestamp when nuxt-generate last finished succesfully (eg not interrupted by `ctrl+c`)

## Nuxt-generate command options

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
                            (default: # cpus or 1 if omitted)
      --spa              Launch in SPA mode
      --universal        Launch in Universal mode (default)
```

If you want to have more control which routes the `nuxt-generate` command will generate, use the `-p` option to pass additional parameters to be passed to the `nuxt.config.generate.routes` method

```
$ nuxt-generate -p id=1&id=2
```

```
# nuxt.config.js
routes (callback, params) {
  console.log(params)
}

// => { id: [ '1', '2' ],
//  last_started: 1508609323,
//  last_build: 0,
//  last_finished: 0 }

```

