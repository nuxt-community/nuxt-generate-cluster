/*!
 * Nuxt-Generate-Cluster.js v1.0.0-rc11
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fsExtra = require('fs-extra');
var _ = _interopDefault(require('lodash'));
var path = require('path');
var htmlMinifier = require('html-minifier');
var Tapable = _interopDefault(require('tappable'));
var Debug = _interopDefault(require('debug'));
var cluster = require('cluster');

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve$$1, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve$$1,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve$$1, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve$$1(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

let waitFor = (() => {
  var _ref = asyncToGenerator(function* (ms) {
    return new Promise(function (resolve$$1) {
      setTimeout(resolve$$1, ms || 0);
    });
  });

  return function waitFor(_x) {
    return _ref.apply(this, arguments);
  };
})();



function isUrl(url) {
  return url.indexOf('http') === 0 || url.indexOf('//') === 0;
}

function promisifyRoute(fn) {
  // If routes is an array
  if (Array.isArray(fn)) {
    return Promise.resolve(fn);
  }
  // If routes is a function expecting a callback
  if (fn.length === 1) {
    return new Promise((resolve$$1, reject) => {
      fn(function (err, routeParams) {
        if (err) {
          reject(err);
        }
        resolve$$1(routeParams);
      });
    });
  }
  let promise = fn();
  if (!promise || !(promise instanceof Promise) && typeof promise.then !== 'function') {
    promise = Promise.resolve(promise);
  }
  return promise;
}









const isWindows = /^win/.test(process.platform);





const sysSep = _.escapeRegExp(path.sep);




function flatRoutes(router, path$$1 = '', routes = []) {
  router.forEach(r => {
    if (!(r.path.indexOf(':') !== -1) && !(r.path.indexOf('*') !== -1)) {
      /* istanbul ignore if */
      if (r.children) {
        flatRoutes(r.children, path$$1 + r.path + '/', routes);
      } else {
        routes.push((r.path === '' && path$$1[path$$1.length - 1] === '/' ? path$$1.slice(0, -1) : path$$1) + r.path);
      }
    }
  });
  return routes;
}

const debug = Debug('nuxt:generate');

class Generator extends Tapable {
  constructor(nuxt, builder) {
    super();
    this.nuxt = nuxt;
    this.options = nuxt.options;
    this.builder = builder;

    // Set variables
    this.staticRoutes = path.resolve(this.options.srcDir, 'static');
    this.srcBuiltPath = path.resolve(this.options.buildDir, 'dist');
    this.distPath = path.resolve(this.options.rootDir, this.options.generate.dir);
    this.distNuxtPath = path.join(this.distPath, isUrl(this.options.build.publicPath) ? '' : this.options.build.publicPath);
  }

  generate({ build = true, init = true } = {}) {
    var _this = this;

    return asyncToGenerator(function* () {
      const s = Date.now();

      yield _this.initiate({ build: build, init: init });
      const routes = yield _this.initRoutes();
      const errors = yield _this.generateRoutes(routes);
      yield _this.postGenerate();

      const duration = Math.round((Date.now() - s) / 100) / 10;
      _this.printReport(duration, errors);

      return { duration, errors };
    })();
  }

  printReport(duration, errors) {
    debug(`HTML Files generated in ${duration}s`);

    if (errors.length) {
      const report = errors.map(({ type, route, error }) => {
        /* istanbul ignore if */
        if (type === 'unhandled') {
          return `Route: '${route}'\n${error.stack}`;
        } else {
          return `Route: '${route}' thrown an error: \n` + JSON.stringify(error);
        }
      });
      console.error('==== Error report ==== \n' + report.join('\n\n')); // eslint-disable-line no-console
    }
  }

  initiate({ build = true, init = true } = {}) {
    var _this2 = this;

    return asyncToGenerator(function* () {

      // Add flag to set process.static
      if (build) {
        _this2.builder.forGenerate();
      }

      // Wait for nuxt be ready
      yield _this2.nuxt.ready();

      // Start build process
      if (build) {
        yield _this2.builder.build();
      }

      yield _this2.nuxt.applyPluginsAsync('generator', _this2);

      // Initialize dist directory
      if (init) {
        yield _this2.initDist();
      }
    })();
  }

  initRoutes(params) {
    var _this3 = this;

    return asyncToGenerator(function* () {
      // Resolve config.generate.routes promises before generating the routes
      let generateRoutes = [];
      if (_this3.options.router.mode !== 'hash') {
        try {
          debug('Generating routes');
          generateRoutes = yield promisifyRoute(function (callback) {
            if (_this3.options.generate.routes) {
              const promise = _this3.options.generate.routes(callback, params);
              if (promise instanceof Promise && typeof promise.then === 'function') {
                return promise.then(function (routes) {
                  callback(null, routes);
                });
              }
            } else {
              return [];
            }
          });
          yield _this3.applyPluginsAsync('generateRoutes', { generator: _this3, generateRoutes });
        } catch (e) {
          console.error('Could not resolve routes'); // eslint-disable-line no-console
          console.error(e); // eslint-disable-line no-console
          throw e; // eslint-disable-line no-unreachable
        }
      }

      // Generate only index.html for router.mode = 'hash'
      let routes = _this3.options.router.mode === 'hash' ? ['/'] : flatRoutes(_this3.options.router.routes);
      routes = _this3.decorateWithPayloads(routes, generateRoutes);

      return routes;
    })();
  }

  generateRoutes(routes) {
    var _this4 = this;

    return asyncToGenerator(function* () {
      let errors = [];

      yield _this4.applyPluginsAsync('generate', { generator: _this4, routes });

      // Start generate process
      while (routes.length) {
        let n = 0;
        yield Promise.all(routes.splice(0, _this4.options.generate.concurrency).map((() => {
          var _ref = asyncToGenerator(function* ({ route, payload }) {
            yield waitFor(n++ * _this4.options.generate.interval);
            yield _this4.generateRoute({ route, payload, errors });
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        })()));
      }

      yield _this4.applyPluginsAsync('generated', _this4);

      return errors;
    })();
  }

  postGenerate() {
    var _this5 = this;

    return asyncToGenerator(function* () {
      const indexPath = path.join(_this5.distPath, 'index.html');
      if (fsExtra.existsSync(indexPath)) {
        // Copy /index.html to /200.html for surge SPA
        // https://surge.sh/help/adding-a-200-page-for-client-side-routing
        const _200Path = path.join(_this5.distPath, '200.html');
        if (!fsExtra.existsSync(_200Path)) {
          yield fsExtra.copy(indexPath, _200Path);
        }
      }
    })();
  }

  initDist() {
    var _this6 = this;

    return asyncToGenerator(function* () {
      // Clean destination folder
      yield fsExtra.remove(_this6.distPath);
      debug('Destination folder cleaned');

      // Copy static and built files
      /* istanbul ignore if */
      if (fsExtra.existsSync(_this6.staticRoutes)) {
        yield fsExtra.copy(_this6.staticRoutes, _this6.distPath);
      }
      yield fsExtra.copy(_this6.srcBuiltPath, _this6.distNuxtPath);

      // Add .nojekyll file to let Github Pages add the _nuxt/ folder
      // https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
      const nojekyllPath = path.resolve(_this6.distPath, '.nojekyll');
      fsExtra.writeFile(nojekyllPath, '');

      // Cleanup SSR related files
      const extraFiles = ['index.spa.html', 'index.ssr.html', 'server-bundle.json', 'vue-ssr-client-manifest.json'].map(function (file) {
        return path.resolve(_this6.distNuxtPath, file);
      });

      extraFiles.forEach(function (file) {
        if (fsExtra.existsSync(file)) {
          fsExtra.removeSync(file);
        }
      });

      debug('Static & build files copied');
    })();
  }

  decorateWithPayloads(routes, generateRoutes) {
    let routeMap = {};
    // Fill routeMap for known routes
    routes.forEach(route => {
      routeMap[route] = {
        route,
        payload: null
      };
    });
    // Fill routeMap with given generate.routes
    generateRoutes.forEach(route => {
      // route is either a string or like {route : "/my_route/1"}
      const path$$1 = _.isString(route) ? route : route.route;
      routeMap[path$$1] = {
        route: path$$1,
        payload: route.payload || null
      };
    });
    return _.values(routeMap);
  }

  generateRoute({ route, payload = {}, errors = [] }) {
    var _this7 = this;

    return asyncToGenerator(function* () {
      let html;

      try {
        const res = yield _this7.nuxt.renderer.renderRoute(route, { _generate: true, payload });
        html = res.html;
        if (res.error) {
          errors.push({ type: 'handled', route, error: res.error });
        }
      } catch (err) {
        /* istanbul ignore next */
        return errors.push({ type: 'unhandled', route, error: err });
      }

      if (_this7.options.generate.minify) {
        try {
          html = htmlMinifier.minify(html, _this7.options.generate.minify);
        } catch (err) /* istanbul ignore next */{
          const minifyErr = new Error(`HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ${html}`);
          errors.push({ type: 'unhandled', route, error: minifyErr });
        }
      }

      let path$$1 = path.join(route, path.sep, 'index.html'); // /about -> /about/index.html
      path$$1 = path$$1 === '/404/index.html' ? '/404.html' : path$$1; // /404 -> /404.html
      debug((!cluster.isMaster ? `Worker ${process.pid}: ` : '') + 'Generate file: ' + path$$1);
      path$$1 = path.join(_this7.distPath, path$$1);

      // Make sure the sub folders are created
      yield fsExtra.mkdirp(path.dirname(path$$1));
      yield fsExtra.writeFile(path$$1, html, 'utf8');

      return true;
    })();
  }
}

exports.Generator = Generator;
//# sourceMappingURL=generator.js.map
