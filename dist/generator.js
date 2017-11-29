/*!
 * Nuxt-Generate-Cluster v1.0.0-rc11
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nuxt = require('nuxt');
var lodash = require('lodash');
var cluster = _interopDefault(require('cluster'));
var Debug = _interopDefault(require('debug'));

var cov_ab3wyokk3 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/commands.js',
      hash = '9251ede3791565c5fdcb9fa87a5d26607afc0931',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/commands.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Commands = {
  sendErrors: 'handleErrors',
  sendRoutes: 'requestRoutes'
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator$$1 ? outerFn : Generator$$1;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator$$1() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values$$1([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator$$1.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values$$1(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values$$1;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values$$1(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var cov_11e9avu7x0 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/mixins/hookable.js',
      hash = '93e9f1c10c44bbb8c3317915bbcd4a38965e4679',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/mixins/hookable.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 6,
          column: 3
        }
      },
      '1': {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 19
        }
      },
      '2': {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 44,
          column: 3
        }
      },
      '3': {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 12,
          column: 7
        }
      },
      '4': {
        start: {
          line: 11,
          column: 8
        },
        end: {
          line: 11,
          column: 24
        }
      },
      '5': {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 19,
          column: 7
        }
      },
      '6': {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 22
        }
      },
      '7': {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 49
        }
      },
      '8': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 32
        }
      },
      '9': {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 29,
          column: 7
        }
      },
      '10': {
        start: {
          line: 28,
          column: 8
        },
        end: {
          line: 28,
          column: 14
        }
      },
      '11': {
        start: {
          line: 31,
          column: 18
        },
        end: {
          line: 31,
          column: 20
        }
      },
      '12': {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 37,
          column: 7
        }
      },
      '13': {
        start: {
          line: 33,
          column: 8
        },
        end: {
          line: 33,
          column: 78
        }
      },
      '14': {
        start: {
          line: 33,
          column: 65
        },
        end: {
          line: 33,
          column: 76
        }
      },
      '15': {
        start: {
          line: 35,
          column: 8
        },
        end: {
          line: 35,
          column: 51
        }
      },
      '16': {
        start: {
          line: 36,
          column: 8
        },
        end: {
          line: 36,
          column: 26
        }
      },
      '17': {
        start: {
          line: 38,
          column: 6
        },
        end: {
          line: 38,
          column: 44
        }
      },
      '18': {
        start: {
          line: 42,
          column: 6
        },
        end: {
          line: 42,
          column: 47
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 3,
            column: 15
          },
          end: {
            line: 3,
            column: 16
          }
        },
        loc: {
          start: {
            line: 3,
            column: 25
          },
          end: {
            line: 45,
            column: 1
          }
        },
        line: 3
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 9,
            column: 5
          }
        },
        loc: {
          start: {
            line: 9,
            column: 16
          },
          end: {
            line: 13,
            column: 5
          }
        },
        line: 9
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 15,
            column: 5
          }
        },
        loc: {
          start: {
            line: 15,
            column: 19
          },
          end: {
            line: 24,
            column: 5
          }
        },
        line: 15
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 26,
            column: 5
          }
        },
        loc: {
          start: {
            line: 26,
            column: 34
          },
          end: {
            line: 39,
            column: 5
          }
        },
        line: 26
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 33,
            column: 57
          },
          end: {
            line: 33,
            column: 58
          }
        },
        loc: {
          start: {
            line: 33,
            column: 65
          },
          end: {
            line: 33,
            column: 76
          }
        },
        line: 33
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 41,
            column: 5
          }
        },
        loc: {
          start: {
            line: 41,
            column: 19
          },
          end: {
            line: 43,
            column: 5
          }
        },
        line: 41
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        }, {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        }],
        line: 4
      },
      '1': {
        loc: {
          start: {
            line: 10,
            column: 6
          },
          end: {
            line: 12,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 10,
            column: 6
          },
          end: {
            line: 12,
            column: 7
          }
        }, {
          start: {
            line: 10,
            column: 6
          },
          end: {
            line: 12,
            column: 7
          }
        }],
        line: 10
      },
      '2': {
        loc: {
          start: {
            line: 17,
            column: 6
          },
          end: {
            line: 19,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 17,
            column: 6
          },
          end: {
            line: 19,
            column: 7
          }
        }],
        line: 17
      },
      '3': {
        loc: {
          start: {
            line: 17,
            column: 10
          },
          end: {
            line: 17,
            column: 43
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 17,
            column: 10
          },
          end: {
            line: 17,
            column: 15
          }
        }, {
          start: {
            line: 17,
            column: 19
          },
          end: {
            line: 17,
            column: 43
          }
        }],
        line: 17
      },
      '4': {
        loc: {
          start: {
            line: 22,
            column: 26
          },
          end: {
            line: 22,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 22,
            column: 26
          },
          end: {
            line: 22,
            column: 43
          }
        }, {
          start: {
            line: 22,
            column: 47
          },
          end: {
            line: 22,
            column: 49
          }
        }],
        line: 22
      },
      '5': {
        loc: {
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        }, {
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        }],
        line: 27
      },
      '6': {
        loc: {
          start: {
            line: 38,
            column: 13
          },
          end: {
            line: 38,
            column: 44
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 38,
            column: 32
          },
          end: {
            line: 38,
            column: 38
          }
        }, {
          start: {
            line: 38,
            column: 41
          },
          end: {
            line: 38,
            column: 44
          }
        }],
        line: 38
      },
      '7': {
        loc: {
          start: {
            line: 42,
            column: 13
          },
          end: {
            line: 42,
            column: 47
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 42,
            column: 13
          },
          end: {
            line: 42,
            column: 24
          }
        }, {
          start: {
            line: 42,
            column: 28
          },
          end: {
            line: 42,
            column: 47
          }
        }],
        line: 42
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Hookable = (function (Base) {
  cov_11e9avu7x0.f[0]++;
  cov_11e9avu7x0.s[0]++;

  if (!Base) {
    cov_11e9avu7x0.b[0][0]++;
    cov_11e9avu7x0.s[1]++;

    Base = function Base() {
      classCallCheck(this, Base);
    };
  } else {
    cov_11e9avu7x0.b[0][1]++;
  }

  cov_11e9avu7x0.s[2]++;
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'initHooks',
      value: function initHooks() {
        cov_11e9avu7x0.f[1]++;
        cov_11e9avu7x0.s[3]++;

        if (!this._hooks) {
          cov_11e9avu7x0.b[1][0]++;
          cov_11e9avu7x0.s[4]++;

          this._hooks = {};
        } else {
          cov_11e9avu7x0.b[1][1]++;
        }
      }
    }, {
      key: 'hook',
      value: function hook(name, fn) {
        cov_11e9avu7x0.f[2]++;
        cov_11e9avu7x0.s[5]++;

        /* istanbul ignore if */
        if ((cov_11e9avu7x0.b[3][0]++, !name) || (cov_11e9avu7x0.b[3][1]++, typeof fn !== 'function')) {
          return;
        } else {
          cov_11e9avu7x0.b[2][0]++;
        }
        cov_11e9avu7x0.s[6]++;
        this.initHooks();

        cov_11e9avu7x0.s[7]++;
        this._hooks[name] = (cov_11e9avu7x0.b[4][0]++, this._hooks[name]) || (cov_11e9avu7x0.b[4][1]++, []);
        cov_11e9avu7x0.s[8]++;
        this._hooks[name].push(fn);
      }
    }, {
      key: 'callHook',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(name) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var ret;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cov_11e9avu7x0.f[3]++;
                  cov_11e9avu7x0.s[9]++;

                  if (this.hasHooks(name)) {
                    _context.next = 8;
                    break;
                  }

                  cov_11e9avu7x0.b[5][0]++;
                  cov_11e9avu7x0.s[10]++;
                  return _context.abrupt('return');

                case 8:
                  cov_11e9avu7x0.b[5][1]++;

                case 9:
                  // debug(`Call ${name} hooks (${this._hooks[name].length})`)
                  ret = (cov_11e9avu7x0.s[11]++, []);
                  cov_11e9avu7x0.s[12]++;
                  _context.prev = 11;
                  cov_11e9avu7x0.s[13]++;
                  _context.t0 = ret;
                  _context.next = 16;
                  return nuxt.Utils.sequence(this._hooks[name], function (fn) {
                    cov_11e9avu7x0.f[4]++;
                    cov_11e9avu7x0.s[14]++;
                    return fn.apply(undefined, args);
                  });

                case 16:
                  _context.t1 = _context.sent;

                  _context.t0.push.call(_context.t0, _context.t1);

                  _context.next = 26;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t2 = _context['catch'](11);
                  cov_11e9avu7x0.s[15]++;

                  console.error('> Error on hook "' + name + '":'); // eslint-disable-line no-console
                  cov_11e9avu7x0.s[16]++;
                  console.error(_context.t2); // eslint-disable-line no-console

                case 26:
                  cov_11e9avu7x0.s[17]++;
                  return _context.abrupt('return', ret.length === 1 ? (cov_11e9avu7x0.b[6][0]++, ret[0]) : (cov_11e9avu7x0.b[6][1]++, ret));

                case 28:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[11, 20]]);
        }));

        function callHook(_x) {
          return _ref.apply(this, arguments);
        }

        return callHook;
      }()
    }, {
      key: 'hasHooks',
      value: function hasHooks(name) {
        cov_11e9avu7x0.f[5]++;
        cov_11e9avu7x0.s[18]++;

        return (cov_11e9avu7x0.b[7][0]++, this._hooks) && (cov_11e9avu7x0.b[7][1]++, !!this._hooks[name]);
      }
    }]);
    return _class;
  }(Base);
});

var cov_1nz0wblge3 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/mixins/index.js',
      hash = 'db45a55685e1d9dad4fe65cf8ef78cd8a04a09aa',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/mixins/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var CommonMixins = Object.freeze({
	Hookable: Hookable
});

var cov_zhx9j8a1s = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/watchdog.js',
      hash = '1aac9a4f8d34d61b6449d89f4c361d684314ff6e',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/watchdog.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 11
        }
      },
      '1': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 21
        }
      },
      '2': {
        start: {
          line: 11,
          column: 22
        },
        end: {
          line: 11,
          column: 47
        }
      },
      '3': {
        start: {
          line: 13,
          column: 12
        },
        end: {
          line: 13,
          column: 13
        }
      },
      '4': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 17,
          column: 5
        }
      },
      '5': {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 15,
          column: 38
        }
      },
      '6': {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 9
        }
      },
      '7': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 24,
          column: 5
        }
      },
      '8': {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 21
        }
      },
      '9': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 21
        }
      },
      '10': {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 32,
          column: 5
        }
      },
      '11': {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 31,
          column: 7
        }
      },
      '12': {
        start: {
          line: 28,
          column: 8
        },
        end: {
          line: 28,
          column: 47
        }
      },
      '13': {
        start: {
          line: 30,
          column: 8
        },
        end: {
          line: 30,
          column: 87
        }
      },
      '14': {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 50,
          column: 5
        }
      },
      '15': {
        start: {
          line: 37,
          column: 22
        },
        end: {
          line: 37,
          column: 56
        }
      },
      '16': {
        start: {
          line: 39,
          column: 6
        },
        end: {
          line: 49,
          column: 7
        }
      },
      '17': {
        start: {
          line: 40,
          column: 8
        },
        end: {
          line: 40,
          column: 71
        }
      },
      '18': {
        start: {
          line: 41,
          column: 13
        },
        end: {
          line: 49,
          column: 7
        }
      },
      '19': {
        start: {
          line: 42,
          column: 8
        },
        end: {
          line: 42,
          column: 48
        }
      },
      '20': {
        start: {
          line: 43,
          column: 13
        },
        end: {
          line: 49,
          column: 7
        }
      },
      '21': {
        start: {
          line: 44,
          column: 8
        },
        end: {
          line: 44,
          column: 58
        }
      },
      '22': {
        start: {
          line: 45,
          column: 13
        },
        end: {
          line: 49,
          column: 7
        }
      },
      '23': {
        start: {
          line: 46,
          column: 8
        },
        end: {
          line: 46,
          column: 74
        }
      },
      '24': {
        start: {
          line: 47,
          column: 13
        },
        end: {
          line: 49,
          column: 7
        }
      },
      '25': {
        start: {
          line: 48,
          column: 8
        },
        end: {
          line: 48,
          column: 97
        }
      },
      '26': {
        start: {
          line: 54,
          column: 4
        },
        end: {
          line: 56,
          column: 5
        }
      },
      '27': {
        start: {
          line: 55,
          column: 6
        },
        end: {
          line: 55,
          column: 95
        }
      },
      '28': {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 66,
          column: 23
        }
      },
      '29': {
        start: {
          line: 70,
          column: 4
        },
        end: {
          line: 77,
          column: 5
        }
      },
      '30': {
        start: {
          line: 71,
          column: 23
        },
        end: {
          line: 71,
          column: 67
        }
      },
      '31': {
        start: {
          line: 72,
          column: 6
        },
        end: {
          line: 72,
          column: 71
        }
      },
      '32': {
        start: {
          line: 74,
          column: 6
        },
        end: {
          line: 76,
          column: 7
        }
      },
      '33': {
        start: {
          line: 75,
          column: 8
        },
        end: {
          line: 75,
          column: 41
        }
      },
      '34': {
        start: {
          line: 81,
          column: 17
        },
        end: {
          line: 81,
          column: 32
        }
      },
      '35': {
        start: {
          line: 83,
          column: 16
        },
        end: {
          line: 83,
          column: 17
        }
      },
      '36': {
        start: {
          line: 85,
          column: 4
        },
        end: {
          line: 92,
          column: 5
        }
      },
      '37': {
        start: {
          line: 86,
          column: 6
        },
        end: {
          line: 91,
          column: 7
        }
      },
      '38': {
        start: {
          line: 87,
          column: 26
        },
        end: {
          line: 87,
          column: 76
        }
      },
      '39': {
        start: {
          line: 88,
          column: 8
        },
        end: {
          line: 90,
          column: 9
        }
      },
      '40': {
        start: {
          line: 89,
          column: 10
        },
        end: {
          line: 89,
          column: 17
        }
      },
      '41': {
        start: {
          line: 93,
          column: 4
        },
        end: {
          line: 93,
          column: 16
        }
      },
      '42': {
        start: {
          line: 97,
          column: 17
        },
        end: {
          line: 97,
          column: 32
        }
      },
      '43': {
        start: {
          line: 100,
          column: 4
        },
        end: {
          line: 108,
          column: 5
        }
      },
      '44': {
        start: {
          line: 101,
          column: 6
        },
        end: {
          line: 107,
          column: 7
        }
      },
      '45': {
        start: {
          line: 103,
          column: 21
        },
        end: {
          line: 103,
          column: 63
        }
      },
      '46': {
        start: {
          line: 104,
          column: 8
        },
        end: {
          line: 106,
          column: 9
        }
      },
      '47': {
        start: {
          line: 105,
          column: 10
        },
        end: {
          line: 105,
          column: 22
        }
      },
      '48': {
        start: {
          line: 109,
          column: 4
        },
        end: {
          line: 109,
          column: 15
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 4,
            column: 3
          }
        },
        loc: {
          start: {
            line: 4,
            column: 16
          },
          end: {
            line: 8,
            column: 3
          }
        },
        line: 4
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        },
        loc: {
          start: {
            line: 10,
            column: 14
          },
          end: {
            line: 18,
            column: 3
          }
        },
        line: 10
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        loc: {
          start: {
            line: 20,
            column: 36
          },
          end: {
            line: 33,
            column: 3
          }
        },
        line: 20
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 35,
            column: 2
          },
          end: {
            line: 35,
            column: 3
          }
        },
        loc: {
          start: {
            line: 35,
            column: 39
          },
          end: {
            line: 51,
            column: 3
          }
        },
        line: 35
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 53,
            column: 2
          },
          end: {
            line: 53,
            column: 3
          }
        },
        loc: {
          start: {
            line: 53,
            column: 33
          },
          end: {
            line: 67,
            column: 3
          }
        },
        line: 53
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 69,
            column: 2
          },
          end: {
            line: 69,
            column: 3
          }
        },
        loc: {
          start: {
            line: 69,
            column: 34
          },
          end: {
            line: 78,
            column: 3
          }
        },
        line: 69
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 80,
            column: 2
          },
          end: {
            line: 80,
            column: 3
          }
        },
        loc: {
          start: {
            line: 80,
            column: 21
          },
          end: {
            line: 94,
            column: 3
          }
        },
        line: 80
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 96,
            column: 2
          },
          end: {
            line: 96,
            column: 3
          }
        },
        loc: {
          start: {
            line: 96,
            column: 18
          },
          end: {
            line: 110,
            column: 3
          }
        },
        line: 96
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }, {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }],
        line: 21
      },
      '1': {
        loc: {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        }, {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        }],
        line: 26
      },
      '2': {
        loc: {
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 31,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 31,
            column: 7
          }
        }, {
          start: {
            line: 27,
            column: 6
          },
          end: {
            line: 31,
            column: 7
          }
        }],
        line: 27
      },
      '3': {
        loc: {
          start: {
            line: 30,
            column: 71
          },
          end: {
            line: 30,
            column: 86
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 30,
            column: 71
          },
          end: {
            line: 30,
            column: 80
          }
        }, {
          start: {
            line: 30,
            column: 84
          },
          end: {
            line: 30,
            column: 86
          }
        }],
        line: 30
      },
      '4': {
        loc: {
          start: {
            line: 36,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 36,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        }, {
          start: {
            line: 36,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        }],
        line: 36
      },
      '5': {
        loc: {
          start: {
            line: 39,
            column: 6
          },
          end: {
            line: 49,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 39,
            column: 6
          },
          end: {
            line: 49,
            column: 7
          }
        }, {
          start: {
            line: 39,
            column: 6
          },
          end: {
            line: 49,
            column: 7
          }
        }],
        line: 39
      },
      '6': {
        loc: {
          start: {
            line: 41,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 41,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }, {
          start: {
            line: 41,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }],
        line: 41
      },
      '7': {
        loc: {
          start: {
            line: 43,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 43,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }, {
          start: {
            line: 43,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }],
        line: 43
      },
      '8': {
        loc: {
          start: {
            line: 45,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 45,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }, {
          start: {
            line: 45,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }],
        line: 45
      },
      '9': {
        loc: {
          start: {
            line: 47,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 47,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }, {
          start: {
            line: 47,
            column: 13
          },
          end: {
            line: 49,
            column: 7
          }
        }],
        line: 47
      },
      '10': {
        loc: {
          start: {
            line: 48,
            column: 81
          },
          end: {
            line: 48,
            column: 96
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 48,
            column: 81
          },
          end: {
            line: 48,
            column: 90
          }
        }, {
          start: {
            line: 48,
            column: 94
          },
          end: {
            line: 48,
            column: 96
          }
        }],
        line: 48
      },
      '11': {
        loc: {
          start: {
            line: 54,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 54,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        }, {
          start: {
            line: 54,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        }],
        line: 54
      },
      '12': {
        loc: {
          start: {
            line: 66,
            column: 7
          },
          end: {
            line: 66,
            column: 22
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 66,
            column: 7
          },
          end: {
            line: 66,
            column: 16
          }
        }, {
          start: {
            line: 66,
            column: 20
          },
          end: {
            line: 66,
            column: 22
          }
        }],
        line: 66
      },
      '13': {
        loc: {
          start: {
            line: 70,
            column: 4
          },
          end: {
            line: 77,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 70,
            column: 4
          },
          end: {
            line: 77,
            column: 5
          }
        }, {
          start: {
            line: 70,
            column: 4
          },
          end: {
            line: 77,
            column: 5
          }
        }],
        line: 70
      },
      '14': {
        loc: {
          start: {
            line: 74,
            column: 6
          },
          end: {
            line: 76,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 74,
            column: 6
          },
          end: {
            line: 76,
            column: 7
          }
        }, {
          start: {
            line: 74,
            column: 6
          },
          end: {
            line: 76,
            column: 7
          }
        }],
        line: 74
      },
      '15': {
        loc: {
          start: {
            line: 85,
            column: 11
          },
          end: {
            line: 85,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 85,
            column: 12
          },
          end: {
            line: 85,
            column: 32
          }
        }, {
          start: {
            line: 85,
            column: 37
          },
          end: {
            line: 85,
            column: 49
          }
        }],
        line: 85
      },
      '16': {
        loc: {
          start: {
            line: 86,
            column: 6
          },
          end: {
            line: 91,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 86,
            column: 6
          },
          end: {
            line: 91,
            column: 7
          }
        }, {
          start: {
            line: 86,
            column: 6
          },
          end: {
            line: 91,
            column: 7
          }
        }],
        line: 86
      },
      '17': {
        loc: {
          start: {
            line: 88,
            column: 8
          },
          end: {
            line: 90,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 88,
            column: 8
          },
          end: {
            line: 90,
            column: 9
          }
        }, {
          start: {
            line: 88,
            column: 8
          },
          end: {
            line: 90,
            column: 9
          }
        }],
        line: 88
      },
      '18': {
        loc: {
          start: {
            line: 100,
            column: 11
          },
          end: {
            line: 100,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 100,
            column: 12
          },
          end: {
            line: 100,
            column: 32
          }
        }, {
          start: {
            line: 100,
            column: 37
          },
          end: {
            line: 100,
            column: 49
          }
        }],
        line: 100
      },
      '19': {
        loc: {
          start: {
            line: 101,
            column: 6
          },
          end: {
            line: 107,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 101,
            column: 6
          },
          end: {
            line: 107,
            column: 7
          }
        }, {
          start: {
            line: 101,
            column: 6
          },
          end: {
            line: 107,
            column: 7
          }
        }],
        line: 101
      },
      '20': {
        loc: {
          start: {
            line: 104,
            column: 8
          },
          end: {
            line: 106,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 104,
            column: 8
          },
          end: {
            line: 106,
            column: 9
          }
        }, {
          start: {
            line: 104,
            column: 8
          },
          end: {
            line: 106,
            column: 9
          }
        }],
        line: 104
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0,
      '37': 0,
      '38': 0,
      '39': 0,
      '40': 0,
      '41': 0,
      '42': 0,
      '43': 0,
      '44': 0,
      '45': 0,
      '46': 0,
      '47': 0,
      '48': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0, 0],
      '9': [0, 0],
      '10': [0, 0],
      '11': [0, 0],
      '12': [0, 0],
      '13': [0, 0],
      '14': [0, 0],
      '15': [0, 0],
      '16': [0, 0],
      '17': [0, 0],
      '18': [0, 0],
      '19': [0, 0],
      '20': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Watchdog = function (_ref) {
  inherits(Watchdog, _ref);

  function Watchdog() {
    classCallCheck(this, Watchdog);
    cov_zhx9j8a1s.f[0]++;
    cov_zhx9j8a1s.s[0]++;

    var _this = possibleConstructorReturn(this, (Watchdog.__proto__ || Object.getPrototypeOf(Watchdog)).call(this));

    cov_zhx9j8a1s.s[1]++;


    _this.workers = {};
    return _this;
  }

  createClass(Watchdog, [{
    key: 'iterator',
    value: /*#__PURE__*/regenerator.mark(function iterator() {
      var workerIds, i;
      return regenerator.wrap(function iterator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cov_zhx9j8a1s.f[1]++;
              workerIds = (cov_zhx9j8a1s.s[2]++, Object.keys(this.workers));
              i = (cov_zhx9j8a1s.s[3]++, 0);
              cov_zhx9j8a1s.s[4]++;

            case 4:
              if (!(i < workerIds.length)) {
                _context.next = 12;
                break;
              }

              cov_zhx9j8a1s.s[5]++;
              _context.next = 8;
              return this.workers[workerIds[i]];

            case 8:
              cov_zhx9j8a1s.s[6]++;

              i++;
              _context.next = 4;
              break;

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, iterator, this);
    })
  }, {
    key: 'addInfo',
    value: function addInfo(workerId, key, extraInfo) {
      cov_zhx9j8a1s.f[2]++;
      cov_zhx9j8a1s.s[7]++;

      if (arguments.length === 2) {
        cov_zhx9j8a1s.b[0][0]++;
        cov_zhx9j8a1s.s[8]++;

        extraInfo = key;
        cov_zhx9j8a1s.s[9]++;
        key = undefined;
      } else {
        cov_zhx9j8a1s.b[0][1]++;
      }

      cov_zhx9j8a1s.s[10]++;
      if (this.workers[workerId]) {
        cov_zhx9j8a1s.b[1][0]++;
        cov_zhx9j8a1s.s[11]++;

        if (key) {
          cov_zhx9j8a1s.b[2][0]++;
          cov_zhx9j8a1s.s[12]++;

          this.workers[workerId][key] = extraInfo;
        } else {
          cov_zhx9j8a1s.b[2][1]++;
          cov_zhx9j8a1s.s[13]++;

          this.workers[workerId] = Object.assign(this.workers[workerId], (cov_zhx9j8a1s.b[3][0]++, extraInfo) || (cov_zhx9j8a1s.b[3][1]++, {}));
        }
      } else {
        cov_zhx9j8a1s.b[1][1]++;
      }
    }
  }, {
    key: 'appendInfo',
    value: function appendInfo(workerId, key, extraInfo) {
      cov_zhx9j8a1s.f[3]++;
      cov_zhx9j8a1s.s[14]++;

      if (this.workers[workerId]) {
        cov_zhx9j8a1s.b[4][0]++;

        var keyType = (cov_zhx9j8a1s.s[15]++, _typeof(this.workers[workerId][key]));

        cov_zhx9j8a1s.s[16]++;
        if (keyType === 'undefined') {
          cov_zhx9j8a1s.b[5][0]++;
          cov_zhx9j8a1s.s[17]++;

          console.error('Key ' + key + ' is undefined for worker ' + workerId); // eslint-disable-line no-console
        } else {
            cov_zhx9j8a1s.b[5][1]++;
            cov_zhx9j8a1s.s[18]++;
            if (keyType === 'string') {
              cov_zhx9j8a1s.b[6][0]++;
              cov_zhx9j8a1s.s[19]++;

              this.workers[workerId][key] += extraInfo;
            } else {
                cov_zhx9j8a1s.b[6][1]++;
                cov_zhx9j8a1s.s[20]++;
                if (keyType === 'number') {
                  cov_zhx9j8a1s.b[7][0]++;
                  cov_zhx9j8a1s.s[21]++;

                  this.workers[workerId][key] += parseInt(extraInfo);
                } else {
                    cov_zhx9j8a1s.b[7][1]++;
                    cov_zhx9j8a1s.s[22]++;
                    if (Array.isArray(this.workers[workerId][key])) {
                      cov_zhx9j8a1s.b[8][0]++;
                      cov_zhx9j8a1s.s[23]++;

                      Array.prototype.push.apply(this.workers[workerId][key], extraInfo);
                    } else {
                        cov_zhx9j8a1s.b[8][1]++;
                        cov_zhx9j8a1s.s[24]++;
                        if (keyType === 'object') {
                          cov_zhx9j8a1s.b[9][0]++;
                          cov_zhx9j8a1s.s[25]++;

                          this.workers[workerId][key] = Object.assign(this.workers[workerId][key], (cov_zhx9j8a1s.b[10][0]++, extraInfo) || (cov_zhx9j8a1s.b[10][1]++, {}));
                        } else {
                          cov_zhx9j8a1s.b[9][1]++;
                        }
                      }
                  }
              }
          }
      } else {
        cov_zhx9j8a1s.b[4][1]++;
      }
    }
  }, {
    key: 'addWorker',
    value: function addWorker(workerId, extraInfo) {
      cov_zhx9j8a1s.f[4]++;
      cov_zhx9j8a1s.s[26]++;

      if (typeof this.workers[workerId] !== 'undefined') {
        cov_zhx9j8a1s.b[11][0]++;
        cov_zhx9j8a1s.s[27]++;

        console.error('A worker with workerId ' + workerId + ' is already registered to the watchdog'); // eslint-disable-line no-console
      } else {
        cov_zhx9j8a1s.b[11][1]++;
      }

      cov_zhx9j8a1s.s[28]++;
      this.workers[workerId] = Object.assign({
        id: workerId,
        start: process.hrtime(),
        duration: 0,
        signal: 0,
        code: 0,
        routes: 0,
        errors: 0
      }, (cov_zhx9j8a1s.b[12][0]++, extraInfo) || (cov_zhx9j8a1s.b[12][1]++, {}));
    }
  }, {
    key: 'exitWorker',
    value: function exitWorker(workerId, extraInfo) {
      cov_zhx9j8a1s.f[5]++;
      cov_zhx9j8a1s.s[29]++;

      if (this.workers[workerId]) {
        cov_zhx9j8a1s.b[13][0]++;

        var duration = (cov_zhx9j8a1s.s[30]++, process.hrtime(this.workers[workerId].start));
        cov_zhx9j8a1s.s[31]++;
        this.workers[workerId].duration = duration[0] * 1E9 + duration[1];

        cov_zhx9j8a1s.s[32]++;
        if (extraInfo) {
          cov_zhx9j8a1s.b[14][0]++;
          cov_zhx9j8a1s.s[33]++;

          this.addInfo(workerId, extraInfo);
        } else {
          cov_zhx9j8a1s.b[14][1]++;
        }
      } else {
        cov_zhx9j8a1s.b[13][1]++;
      }
    }
  }, {
    key: 'countAlive',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var Iter, alive, worker, workerAlive;
        return regenerator.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_zhx9j8a1s.f[6]++;
                Iter = (cov_zhx9j8a1s.s[34]++, this.iterator());
                alive = (cov_zhx9j8a1s.s[35]++, 0);
                worker = void 0;
                cov_zhx9j8a1s.s[36]++;

              case 5:
                if (!((cov_zhx9j8a1s.b[15][0]++, worker = Iter.next()) && (cov_zhx9j8a1s.b[15][1]++, !worker.done))) {
                  _context2.next = 20;
                  break;
                }

                cov_zhx9j8a1s.s[37]++;

                if (!(typeof worker.value !== 'undefined')) {
                  _context2.next = 17;
                  break;
                }

                cov_zhx9j8a1s.b[16][0]++;
                cov_zhx9j8a1s.s[38]++;
                _context2.next = 12;
                return this.callHook('isWorkerAlive', worker.value);

              case 12:
                workerAlive = _context2.sent;
                cov_zhx9j8a1s.s[39]++;

                if (workerAlive) {
                  cov_zhx9j8a1s.b[17][0]++;
                  cov_zhx9j8a1s.s[40]++;

                  alive++;
                } else {
                  cov_zhx9j8a1s.b[17][1]++;
                }
                _context2.next = 18;
                break;

              case 17:
                cov_zhx9j8a1s.b[16][1]++;

              case 18:
                _context2.next = 5;
                break;

              case 20:
                cov_zhx9j8a1s.s[41]++;
                return _context2.abrupt('return', alive);

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function countAlive() {
        return _ref2.apply(this, arguments);
      }

      return countAlive;
    }()
  }, {
    key: 'allDead',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var Iter, worker, isDead;
        return regenerator.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cov_zhx9j8a1s.f[7]++;
                Iter = (cov_zhx9j8a1s.s[42]++, this.iterator());
                worker = void 0;
                cov_zhx9j8a1s.s[43]++;

              case 4:
                if (!((cov_zhx9j8a1s.b[18][0]++, worker = Iter.next()) && (cov_zhx9j8a1s.b[18][1]++, !worker.done))) {
                  _context3.next = 22;
                  break;
                }

                cov_zhx9j8a1s.s[44]++;

                if (!(typeof worker.value !== 'undefined')) {
                  _context3.next = 19;
                  break;
                }

                cov_zhx9j8a1s.b[19][0]++;

                // let isDead = await this.callHook('isWorkerDead', worker.value)
                isDead = (cov_zhx9j8a1s.s[45]++, this.workers[worker.value.id].duration > 0);
                cov_zhx9j8a1s.s[46]++;

                if (isDead) {
                  _context3.next = 16;
                  break;
                }

                cov_zhx9j8a1s.b[20][0]++;
                cov_zhx9j8a1s.s[47]++;
                return _context3.abrupt('return', false);

              case 16:
                cov_zhx9j8a1s.b[20][1]++;

              case 17:
                _context3.next = 20;
                break;

              case 19:
                cov_zhx9j8a1s.b[19][1]++;

              case 20:
                _context3.next = 4;
                break;

              case 22:
                cov_zhx9j8a1s.s[48]++;
                return _context3.abrupt('return', true);

              case 24:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function allDead() {
        return _ref3.apply(this, arguments);
      }

      return allDead;
    }()
  }]);
  return Watchdog;
}((Hookable()));

var cov_ux63eeeru = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/master.js',
      hash = 'ef32dcb8b81227a81b68566e64ca4ee2a03e9156',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/master.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 11
        }
      },
      '1': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 26
        }
      },
      '2': {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 34
        }
      },
      '3': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 37
        }
      },
      '4': {
        start: {
          line: 15,
          column: 17
        },
        end: {
          line: 15,
          column: 34
        }
      },
      '5': {
        start: {
          line: 16,
          column: 20
        },
        end: {
          line: 16,
          column: 37
        }
      },
      '6': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 49
        }
      },
      '7': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 118
        }
      },
      '8': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 116
        }
      },
      '9': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 20
        }
      },
      '10': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 20
        }
      },
      '11': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 32,
          column: 5
        }
      },
      '12': {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 28,
          column: 24
        }
      },
      '13': {
        start: {
          line: 29,
          column: 6
        },
        end: {
          line: 29,
          column: 42
        }
      },
      '14': {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 27
        }
      },
      '15': {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 32
        }
      },
      '16': {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 36,
          column: 29
        }
      },
      '17': {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 40,
          column: 29
        }
      },
      '18': {
        start: {
          line: 40,
          column: 16
        },
        end: {
          line: 40,
          column: 29
        }
      },
      '19': {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 41,
          column: 64
        }
      },
      '20': {
        start: {
          line: 45,
          column: 4
        },
        end: {
          line: 45,
          column: 29
        }
      },
      '21': {
        start: {
          line: 49,
          column: 4
        },
        end: {
          line: 58,
          column: 5
        }
      },
      '22': {
        start: {
          line: 50,
          column: 21
        },
        end: {
          line: 50,
          column: 60
        }
      },
      '23': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 55,
          column: 7
        }
      },
      '24': {
        start: {
          line: 53,
          column: 8
        },
        end: {
          line: 53,
          column: 55
        }
      },
      '25': {
        start: {
          line: 54,
          column: 8
        },
        end: {
          line: 54,
          column: 39
        }
      },
      '26': {
        start: {
          line: 56,
          column: 6
        },
        end: {
          line: 56,
          column: 17
        }
      },
      '27': {
        start: {
          line: 59,
          column: 4
        },
        end: {
          line: 59,
          column: 16
        }
      },
      '28': {
        start: {
          line: 64,
          column: 28
        },
        end: {
          line: 64,
          column: 50
        }
      },
      '29': {
        start: {
          line: 65,
          column: 4
        },
        end: {
          line: 67,
          column: 5
        }
      },
      '30': {
        start: {
          line: 66,
          column: 6
        },
        end: {
          line: 66,
          column: 74
        }
      },
      '31': {
        start: {
          line: 69,
          column: 4
        },
        end: {
          line: 69,
          column: 28
        }
      },
      '32': {
        start: {
          line: 73,
          column: 22
        },
        end: {
          line: 73,
          column: 47
        }
      },
      '33': {
        start: {
          line: 74,
          column: 19
        },
        end: {
          line: 74,
          column: 51
        }
      },
      '34': {
        start: {
          line: 76,
          column: 4
        },
        end: {
          line: 76,
          column: 17
        }
      },
      '35': {
        start: {
          line: 80,
          column: 4
        },
        end: {
          line: 80,
          column: 40
        }
      },
      '36': {
        start: {
          line: 82,
          column: 19
        },
        end: {
          line: 82,
          column: 49
        }
      },
      '37': {
        start: {
          line: 83,
          column: 4
        },
        end: {
          line: 83,
          column: 71
        }
      },
      '38': {
        start: {
          line: 85,
          column: 17
        },
        end: {
          line: 89,
          column: 5
        }
      },
      '39': {
        start: {
          line: 91,
          column: 4
        },
        end: {
          line: 93,
          column: 5
        }
      },
      '40': {
        start: {
          line: 92,
          column: 6
        },
        end: {
          line: 92,
          column: 44
        }
      },
      '41': {
        start: {
          line: 95,
          column: 4
        },
        end: {
          line: 95,
          column: 46
        }
      },
      '42': {
        start: {
          line: 97,
          column: 4
        },
        end: {
          line: 97,
          column: 20
        }
      },
      '43': {
        start: {
          line: 101,
          column: 4
        },
        end: {
          line: 101,
          column: 61
        }
      },
      '44': {
        start: {
          line: 102,
          column: 4
        },
        end: {
          line: 102,
          column: 16
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 7,
            column: 3
          }
        },
        loc: {
          start: {
            line: 7,
            column: 59
          },
          end: {
            line: 24,
            column: 3
          }
        },
        line: 7
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 26,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        },
        loc: {
          start: {
            line: 26,
            column: 36
          },
          end: {
            line: 37,
            column: 3
          }
        },
        line: 26
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 39,
            column: 2
          },
          end: {
            line: 39,
            column: 3
          }
        },
        loc: {
          start: {
            line: 39,
            column: 24
          },
          end: {
            line: 42,
            column: 3
          }
        },
        line: 39
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 44,
            column: 2
          },
          end: {
            line: 44,
            column: 3
          }
        },
        loc: {
          start: {
            line: 44,
            column: 16
          },
          end: {
            line: 46,
            column: 3
          }
        },
        line: 44
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 48,
            column: 2
          },
          end: {
            line: 48,
            column: 3
          }
        },
        loc: {
          start: {
            line: 48,
            column: 26
          },
          end: {
            line: 60,
            column: 3
          }
        },
        line: 48
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 62,
            column: 2
          },
          end: {
            line: 62,
            column: 3
          }
        },
        loc: {
          start: {
            line: 62,
            column: 23
          },
          end: {
            line: 70,
            column: 3
          }
        },
        line: 62
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 72,
            column: 2
          },
          end: {
            line: 72,
            column: 3
          }
        },
        loc: {
          start: {
            line: 72,
            column: 19
          },
          end: {
            line: 77,
            column: 3
          }
        },
        line: 72
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 79,
            column: 2
          },
          end: {
            line: 79,
            column: 3
          }
        },
        loc: {
          start: {
            line: 79,
            column: 25
          },
          end: {
            line: 98,
            column: 3
          }
        },
        line: 79
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 100,
            column: 2
          },
          end: {
            line: 100,
            column: 3
          }
        },
        loc: {
          start: {
            line: 100,
            column: 23
          },
          end: {
            line: 103,
            column: 3
          }
        },
        line: 100
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 19,
            column: 23
          },
          end: {
            line: 19,
            column: 118
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 19,
            column: 23
          },
          end: {
            line: 19,
            column: 44
          }
        }, {
          start: {
            line: 19,
            column: 48
          },
          end: {
            line: 19,
            column: 87
          }
        }, {
          start: {
            line: 19,
            column: 91
          },
          end: {
            line: 19,
            column: 118
          }
        }],
        line: 19
      },
      '1': {
        loc: {
          start: {
            line: 20,
            column: 29
          },
          end: {
            line: 20,
            column: 116
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 20,
            column: 29
          },
          end: {
            line: 20,
            column: 56
          }
        }, {
          start: {
            line: 20,
            column: 60
          },
          end: {
            line: 20,
            column: 109
          }
        }, {
          start: {
            line: 20,
            column: 113
          },
          end: {
            line: 20,
            column: 116
          }
        }],
        line: 20
      },
      '2': {
        loc: {
          start: {
            line: 26,
            column: 12
          },
          end: {
            line: 26,
            column: 34
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 26,
            column: 32
          },
          end: {
            line: 26,
            column: 34
          }
        }],
        line: 26
      },
      '3': {
        loc: {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        }, {
          start: {
            line: 27,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        }],
        line: 27
      },
      '4': {
        loc: {
          start: {
            line: 40,
            column: 4
          },
          end: {
            line: 40,
            column: 29
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 40,
            column: 4
          },
          end: {
            line: 40,
            column: 29
          }
        }, {
          start: {
            line: 40,
            column: 4
          },
          end: {
            line: 40,
            column: 29
          }
        }],
        line: 40
      },
      '5': {
        loc: {
          start: {
            line: 51,
            column: 6
          },
          end: {
            line: 55,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 51,
            column: 6
          },
          end: {
            line: 55,
            column: 7
          }
        }, {
          start: {
            line: 51,
            column: 6
          },
          end: {
            line: 55,
            column: 7
          }
        }],
        line: 51
      },
      '6': {
        loc: {
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 67,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 67,
            column: 5
          }
        }, {
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 67,
            column: 5
          }
        }],
        line: 65
      },
      '7': {
        loc: {
          start: {
            line: 91,
            column: 4
          },
          end: {
            line: 93,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 91,
            column: 4
          },
          end: {
            line: 93,
            column: 5
          }
        }, {
          start: {
            line: 91,
            column: 4
          },
          end: {
            line: 93,
            column: 5
          }
        }],
        line: 91
      },
      '8': {
        loc: {
          start: {
            line: 91,
            column: 8
          },
          end: {
            line: 91,
            column: 81
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 91,
            column: 8
          },
          end: {
            line: 91,
            column: 29
          }
        }, {
          start: {
            line: 91,
            column: 33
          },
          end: {
            line: 91,
            column: 81
          }
        }],
        line: 91
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0,
      '37': 0,
      '38': 0,
      '39': 0,
      '40': 0,
      '41': 0,
      '42': 0,
      '43': 0,
      '44': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0
    },
    b: {
      '0': [0, 0, 0],
      '1': [0, 0, 0],
      '2': [0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Master = function (_ref) {
  inherits(Master, _ref);

  function Master(options, _ref2) {
    var workerCount = _ref2.workerCount,
        workerConcurrency = _ref2.workerConcurrency;
    classCallCheck(this, Master);
    cov_ux63eeeru.f[0]++;
    cov_ux63eeeru.s[0]++;

    var _this = possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

    cov_ux63eeeru.s[1]++;


    _this.options = options;

    cov_ux63eeeru.s[2]++;
    _this.watchdog = new Watchdog();
    cov_ux63eeeru.s[3]++;
    _this.startTime = process.hrtime();

    var nuxt$$1 = (cov_ux63eeeru.s[4]++, new nuxt.Nuxt(options));
    var builder = (cov_ux63eeeru.s[5]++, new nuxt.Builder(nuxt$$1));
    cov_ux63eeeru.s[6]++;
    _this.generator = new nuxt.Generator(nuxt$$1, builder);

    cov_ux63eeeru.s[7]++;
    _this.workerCount = (cov_ux63eeeru.b[0][0]++, parseInt(workerCount)) || (cov_ux63eeeru.b[0][1]++, parseInt(nuxt$$1.options.generate.workers)) || (cov_ux63eeeru.b[0][2]++, require('os').cpus().length);
    cov_ux63eeeru.s[8]++;
    _this.workerConcurrency = (cov_ux63eeeru.b[1][0]++, parseInt(workerConcurrency)) || (cov_ux63eeeru.b[1][1]++, parseInt(nuxt$$1.options.generate.workerConcurrency)) || (cov_ux63eeeru.b[1][2]++, 500);

    cov_ux63eeeru.s[9]++;
    _this.routes = [];
    cov_ux63eeeru.s[10]++;
    _this.errors = [];
    return _this;
  }

  createClass(Master, [{
    key: 'run',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (cov_ux63eeeru.b[2][0]++, {}),
            build = _ref4.build,
            params = _ref4.params;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_ux63eeeru.f[1]++;
                cov_ux63eeeru.s[11]++;

                if (!build) {
                  _context.next = 12;
                  break;
                }

                cov_ux63eeeru.b[3][0]++;
                cov_ux63eeeru.s[12]++;
                _context.next = 7;
                return this.build();

              case 7:
                cov_ux63eeeru.s[13]++;
                _context.next = 10;
                return this.callHook('built', params);

              case 10:
                _context.next = 16;
                break;

              case 12:
                cov_ux63eeeru.b[3][1]++;
                cov_ux63eeeru.s[14]++;
                _context.next = 16;
                return this.initiate();

              case 16:
                cov_ux63eeeru.s[15]++;
                _context.next = 19;
                return this.getRoutes(params);

              case 19:
                cov_ux63eeeru.s[16]++;
                _context.next = 22;
                return this.startWorkers();

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'initiate',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(build) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_ux63eeeru.f[2]++;
                cov_ux63eeeru.s[17]++;

                if (!build) {
                    cov_ux63eeeru.b[4][0]++;
                    cov_ux63eeeru.s[18]++;
                    build = false;
                  } else {
                  cov_ux63eeeru.b[4][1]++;
                }cov_ux63eeeru.s[19]++;
                _context2.next = 6;
                return this.generator.initiate({ build: build, init: build });

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initiate(_x2) {
        return _ref5.apply(this, arguments);
      }

      return initiate;
    }()
  }, {
    key: 'build',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cov_ux63eeeru.f[3]++;
                cov_ux63eeeru.s[20]++;
                _context3.next = 4;
                return this.initiate(true);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function build() {
        return _ref6.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(params) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cov_ux63eeeru.f[4]++;
                cov_ux63eeeru.s[21]++;
                _context4.prev = 2;
                cov_ux63eeeru.s[22]++;
                _context4.next = 6;
                return this.generator.initRoutes(params);

              case 6:
                routes = _context4.sent;
                cov_ux63eeeru.s[23]++;

                if (routes.length) {
                  cov_ux63eeeru.b[5][0]++;
                  cov_ux63eeeru.s[24]++;

                  // add routes to any existing routes
                  Array.prototype.push.apply(this.routes, routes);
                  cov_ux63eeeru.s[25]++;
                  this.routes = lodash.uniq(this.routes);
                } else {
                  cov_ux63eeeru.b[5][1]++;
                }
                cov_ux63eeeru.s[26]++;
                return _context4.abrupt('return', true);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](2);

              case 15:
                cov_ux63eeeru.s[27]++;
                return _context4.abrupt('return', false);

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 13]]);
      }));

      function getRoutes(_x3) {
        return _ref7.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'calculateBatchSize',
    value: function calculateBatchSize() {
      cov_ux63eeeru.f[5]++;

      // Even the load between workers
      var workerConcurrency = (cov_ux63eeeru.s[28]++, this.workerConcurrency);
      cov_ux63eeeru.s[29]++;
      if (this.routes.length < this.workerCount * this.workerConcurrency) {
        cov_ux63eeeru.b[6][0]++;
        cov_ux63eeeru.s[30]++;

        workerConcurrency = Math.ceil(this.routes.length / this.workerCount);
      } else {
        cov_ux63eeeru.b[6][1]++;
      }

      cov_ux63eeeru.s[31]++;
      return workerConcurrency;
    }
  }, {
    key: 'getBatchRoutes',
    value: function getBatchRoutes() {
      cov_ux63eeeru.f[6]++;

      var batchSize = (cov_ux63eeeru.s[32]++, this.calculateBatchSize());
      var routes = (cov_ux63eeeru.s[33]++, this.routes.splice(0, batchSize));

      cov_ux63eeeru.s[34]++;
      return routes;
    }
  }, {
    key: 'done',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(workerInfo) {
        var duration, info;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                cov_ux63eeeru.f[7]++;
                cov_ux63eeeru.s[35]++;
                _context5.next = 4;
                return this.generator.afterGenerate();

              case 4:
                duration = (cov_ux63eeeru.s[36]++, process.hrtime(this.startTime));
                cov_ux63eeeru.s[37]++;

                duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10;

                info = (cov_ux63eeeru.s[38]++, {
                  duration: duration,
                  errors: this.errors,
                  workerInfo: workerInfo
                });
                cov_ux63eeeru.s[39]++;

                if (!((cov_ux63eeeru.b[8][0]++, this.options.generate) && (cov_ux63eeeru.b[8][1]++, typeof this.options.generate.done === 'function'))) {
                  _context5.next = 16;
                  break;
                }

                cov_ux63eeeru.b[7][0]++;
                cov_ux63eeeru.s[40]++;
                _context5.next = 14;
                return this.options.generate.done(info);

              case 14:
                _context5.next = 17;
                break;

              case 16:
                cov_ux63eeeru.b[7][1]++;

              case 17:
                cov_ux63eeeru.s[41]++;
                _context5.next = 20;
                return this.callHook('generate:done', info);

              case 20:
                cov_ux63eeeru.s[42]++;


                this.errors = [];

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function done(_x4) {
        return _ref8.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cov_ux63eeeru.f[8]++;
                cov_ux63eeeru.s[43]++;

                console.error('Should be implemented by a derived class'); // eslint-disable-line no-console
                cov_ux63eeeru.s[44]++;
                return _context6.abrupt('return', false);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function startWorkers() {
        return _ref9.apply(this, arguments);
      }

      return startWorkers;
    }()
  }]);
  return Master;
}((Hookable()));

var cov_29ov6lgjyf = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/worker.js',
      hash = '9171b31cc37ccc46ec441d4652ed25c92d482f1a',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/worker.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 26
        }
      },
      '1': {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 16
        }
      },
      '2': {
        start: {
          line: 8,
          column: 17
        },
        end: {
          line: 8,
          column: 34
        }
      },
      '3': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 40
        }
      },
      '4': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 16
        }
      },
      '5': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 64
        }
      },
      '6': {
        start: {
          line: 21,
          column: 17
        },
        end: {
          line: 21,
          column: 19
        }
      },
      '7': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 29,
          column: 5
        }
      },
      '8': {
        start: {
          line: 24,
          column: 6
        },
        end: {
          line: 24,
          column: 58
        }
      },
      '9': {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 26,
          column: 88
        }
      },
      '10': {
        start: {
          line: 27,
          column: 6
        },
        end: {
          line: 27,
          column: 22
        }
      },
      '11': {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 28,
          column: 13
        }
      },
      '12': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 17
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 4,
            column: 3
          }
        },
        loc: {
          start: {
            line: 4,
            column: 23
          },
          end: {
            line: 10,
            column: 3
          }
        },
        line: 4
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 12,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        },
        loc: {
          start: {
            line: 12,
            column: 12
          },
          end: {
            line: 14,
            column: 3
          }
        },
        line: 12
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        },
        loc: {
          start: {
            line: 16,
            column: 14
          },
          end: {
            line: 18,
            column: 3
          }
        },
        line: 16
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        loc: {
          start: {
            line: 20,
            column: 31
          },
          end: {
            line: 32,
            column: 3
          }
        },
        line: 20
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Worker = function () {
  function Worker(options) {
    classCallCheck(this, Worker);
    cov_29ov6lgjyf.f[0]++;
    cov_29ov6lgjyf.s[0]++;

    this.options = options;
    cov_29ov6lgjyf.s[1]++;
    this.id = -1;

    var nuxt$$1 = (cov_29ov6lgjyf.s[2]++, new nuxt.Nuxt(options));
    cov_29ov6lgjyf.s[3]++;
    this.generator = new nuxt.Generator(nuxt$$1);
  }

  createClass(Worker, [{
    key: 'setId',
    value: function setId(id) {
      cov_29ov6lgjyf.f[1]++;
      cov_29ov6lgjyf.s[4]++;

      this.id = id;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_29ov6lgjyf.f[2]++;
                cov_29ov6lgjyf.s[5]++;
                _context.next = 4;
                return this.generator.initiate({ build: false, init: false });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(routes) {
        var errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_29ov6lgjyf.f[3]++;
                errors = (cov_29ov6lgjyf.s[6]++, []);
                cov_29ov6lgjyf.s[7]++;
                _context2.prev = 3;
                cov_29ov6lgjyf.s[8]++;
                _context2.next = 7;
                return this.generator.generateRoutes(routes);

              case 7:
                errors = _context2.sent;
                _context2.next = 18;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](3);
                cov_29ov6lgjyf.s[9]++;

                console.error('Worker ' + process.pid + ': Exception while generating routes, exiting'); // eslint-disable-line no-console
                cov_29ov6lgjyf.s[10]++;
                console.error(_context2.t0); // eslint-disable-line no-console
                cov_29ov6lgjyf.s[11]++;
                throw _context2.t0;

              case 18:
                cov_29ov6lgjyf.s[12]++;
                return _context2.abrupt('return', errors);

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function generateRoutes(_x) {
        return _ref2.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker;
}();

var cov_19oiqgbd4i = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/index.js',
      hash = '265bb583f2a43fd687591a0558187a9a03687cbe',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var Generate = Object.freeze({
	Commands: Commands,
	Watchdog: Watchdog,
	Master: Master,
	Worker: Worker
});

var cov_jqnx95x11 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/messaging.js',
      hash = '527447ff35f9e255bfd02d05253bc4cebd4f50fa',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/messaging.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 25
        },
        end: {
          line: 71,
          column: 1
        }
      },
      '1': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 11,
          column: 5
        }
      },
      '2': {
        start: {
          line: 8,
          column: 6
        },
        end: {
          line: 8,
          column: 32
        }
      },
      '3': {
        start: {
          line: 9,
          column: 11
        },
        end: {
          line: 11,
          column: 5
        }
      },
      '4': {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 12
        }
      },
      '5': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 17,
          column: 5
        }
      },
      '6': {
        start: {
          line: 14,
          column: 6
        },
        end: {
          line: 14,
          column: 59
        }
      },
      '7': {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 59
        }
      },
      '8': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 29
        }
      },
      '9': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 24,
          column: 5
        }
      },
      '10': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 44
        }
      },
      '11': {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 56
        }
      },
      '12': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 36,
          column: 5
        }
      },
      '13': {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 30,
          column: 22
        }
      },
      '14': {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 22
        }
      },
      '15': {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 24
        }
      },
      '16': {
        start: {
          line: 33,
          column: 11
        },
        end: {
          line: 36,
          column: 5
        }
      },
      '17': {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 22
        }
      },
      '18': {
        start: {
          line: 35,
          column: 6
        },
        end: {
          line: 35,
          column: 24
        }
      },
      '19': {
        start: {
          line: 38,
          column: 16
        },
        end: {
          line: 38,
          column: 27
        }
      },
      '20': {
        start: {
          line: 39,
          column: 4
        },
        end: {
          line: 49,
          column: 5
        }
      },
      '21': {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 40,
          column: 52
        }
      },
      '22': {
        start: {
          line: 41,
          column: 11
        },
        end: {
          line: 49,
          column: 5
        }
      },
      '23': {
        start: {
          line: 42,
          column: 6
        },
        end: {
          line: 42,
          column: 63
        }
      },
      '24': {
        start: {
          line: 44,
          column: 6
        },
        end: {
          line: 48,
          column: 7
        }
      },
      '25': {
        start: {
          line: 45,
          column: 8
        },
        end: {
          line: 45,
          column: 54
        }
      },
      '26': {
        start: {
          line: 47,
          column: 8
        },
        end: {
          line: 47,
          column: 46
        }
      },
      '27': {
        start: {
          line: 53,
          column: 4
        },
        end: {
          line: 56,
          column: 5
        }
      },
      '28': {
        start: {
          line: 54,
          column: 6
        },
        end: {
          line: 54,
          column: 18
        }
      },
      '29': {
        start: {
          line: 55,
          column: 6
        },
        end: {
          line: 55,
          column: 24
        }
      },
      '30': {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 61,
          column: 5
        }
      },
      '31': {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
          column: 60
        }
      },
      '32': {
        start: {
          line: 60,
          column: 6
        },
        end: {
          line: 60,
          column: 12
        }
      },
      '33': {
        start: {
          line: 63,
          column: 20
        },
        end: {
          line: 63,
          column: 33
        }
      },
      '34': {
        start: {
          line: 65,
          column: 4
        },
        end: {
          line: 69,
          column: 5
        }
      },
      '35': {
        start: {
          line: 66,
          column: 6
        },
        end: {
          line: 66,
          column: 26
        }
      },
      '36': {
        start: {
          line: 68,
          column: 6
        },
        end: {
          line: 68,
          column: 27
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 5,
            column: 15
          },
          end: {
            line: 5,
            column: 16
          }
        },
        loc: {
          start: {
            line: 5,
            column: 25
          },
          end: {
            line: 71,
            column: 1
          }
        },
        line: 5
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 30
          },
          end: {
            line: 19,
            column: 3
          }
        },
        line: 6
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 21,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        loc: {
          start: {
            line: 21,
            column: 18
          },
          end: {
            line: 26,
            column: 3
          }
        },
        line: 21
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 28,
            column: 2
          },
          end: {
            line: 28,
            column: 3
          }
        },
        loc: {
          start: {
            line: 28,
            column: 48
          },
          end: {
            line: 50,
            column: 3
          }
        },
        line: 28
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 52,
            column: 2
          },
          end: {
            line: 52,
            column: 3
          }
        },
        loc: {
          start: {
            line: 52,
            column: 33
          },
          end: {
            line: 70,
            column: 3
          }
        },
        line: 52
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 7,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 7,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        }, {
          start: {
            line: 7,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        }],
        line: 7
      },
      '1': {
        loc: {
          start: {
            line: 9,
            column: 11
          },
          end: {
            line: 11,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 9,
            column: 11
          },
          end: {
            line: 11,
            column: 5
          }
        }, {
          start: {
            line: 9,
            column: 11
          },
          end: {
            line: 11,
            column: 5
          }
        }],
        line: 9
      },
      '2': {
        loc: {
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        }, {
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        }],
        line: 13
      },
      '3': {
        loc: {
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }, {
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }],
        line: 22
      },
      '4': {
        loc: {
          start: {
            line: 25,
            column: 11
          },
          end: {
            line: 25,
            column: 56
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 25,
            column: 11
          },
          end: {
            line: 25,
            column: 14
          }
        }, {
          start: {
            line: 25,
            column: 18
          },
          end: {
            line: 25,
            column: 56
          }
        }],
        line: 25
      },
      '5': {
        loc: {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        }, {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        }],
        line: 29
      },
      '6': {
        loc: {
          start: {
            line: 33,
            column: 11
          },
          end: {
            line: 36,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 33,
            column: 11
          },
          end: {
            line: 36,
            column: 5
          }
        }, {
          start: {
            line: 33,
            column: 11
          },
          end: {
            line: 36,
            column: 5
          }
        }],
        line: 33
      },
      '7': {
        loc: {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 49,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 49,
            column: 5
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 49,
            column: 5
          }
        }],
        line: 39
      },
      '8': {
        loc: {
          start: {
            line: 41,
            column: 11
          },
          end: {
            line: 49,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 41,
            column: 11
          },
          end: {
            line: 49,
            column: 5
          }
        }, {
          start: {
            line: 41,
            column: 11
          },
          end: {
            line: 49,
            column: 5
          }
        }],
        line: 41
      },
      '9': {
        loc: {
          start: {
            line: 44,
            column: 6
          },
          end: {
            line: 48,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 44,
            column: 6
          },
          end: {
            line: 48,
            column: 7
          }
        }, {
          start: {
            line: 44,
            column: 6
          },
          end: {
            line: 48,
            column: 7
          }
        }],
        line: 44
      },
      '10': {
        loc: {
          start: {
            line: 53,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 53,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        }, {
          start: {
            line: 53,
            column: 4
          },
          end: {
            line: 56,
            column: 5
          }
        }],
        line: 53
      },
      '11': {
        loc: {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        }, {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        }],
        line: 58
      },
      '12': {
        loc: {
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 69,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 69,
            column: 5
          }
        }, {
          start: {
            line: 65,
            column: 4
          },
          end: {
            line: 69,
            column: 5
          }
        }],
        line: 65
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0, 0],
      '9': [0, 0],
      '10': [0, 0],
      '11': [0, 0],
      '12': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var Messaging = (function (Base) {
  cov_jqnx95x11.f[0]++;
  cov_jqnx95x11.s[0]++;
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'startListeningForMessages',
      value: function startListeningForMessages() {
        cov_jqnx95x11.f[1]++;
        cov_jqnx95x11.s[1]++;

        if (typeof this.__isListening === 'undefined') {
          cov_jqnx95x11.b[0][0]++;
          cov_jqnx95x11.s[2]++;

          this.__isListening = false;
        } else {
            cov_jqnx95x11.b[0][1]++;
            cov_jqnx95x11.s[3]++;
            if (this.__isListening) {
              cov_jqnx95x11.b[1][0]++;
              cov_jqnx95x11.s[4]++;

              return;
            } else {
              cov_jqnx95x11.b[1][1]++;
            }
          }cov_jqnx95x11.s[5]++;
        if (cluster.isMaster) {
          cov_jqnx95x11.b[2][0]++;
          cov_jqnx95x11.s[6]++;

          cluster.on('message', this.receiveCommand.bind(this));
        } else {
          cov_jqnx95x11.b[2][1]++;
          cov_jqnx95x11.s[7]++;

          process.on('message', this.receiveCommand.bind(this));
        }
        cov_jqnx95x11.s[8]++;
        this.__isListening = true;
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        cov_jqnx95x11.f[2]++;
        cov_jqnx95x11.s[9]++;

        if (typeof this._commandsArray === 'undefined') {
          cov_jqnx95x11.b[3][0]++;
          cov_jqnx95x11.s[10]++;

          this._commandsArray = lodash.values(Commands);
        } else {
          cov_jqnx95x11.b[3][1]++;
        }
        cov_jqnx95x11.s[11]++;
        return (cov_jqnx95x11.b[4][0]++, cmd) && (cov_jqnx95x11.b[4][1]++, lodash.indexOf(this._commandsArray, cmd) > -1);
      }
    }, {
      key: 'receiveCommand',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker, message, handle) {
          var cmd,
              _args = arguments;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cov_jqnx95x11.f[3]++;
                  cov_jqnx95x11.s[12]++;

                  if (_args.length === 2) {
                    cov_jqnx95x11.b[5][0]++;
                    cov_jqnx95x11.s[13]++;

                    handle = message;
                    cov_jqnx95x11.s[14]++;
                    message = worker;
                    cov_jqnx95x11.s[15]++;
                    worker = undefined;
                  } else {
                      cov_jqnx95x11.b[5][1]++;
                      cov_jqnx95x11.s[16]++;
                      if (_args.length === 1) {
                        cov_jqnx95x11.b[6][0]++;
                        cov_jqnx95x11.s[17]++;

                        message = worker;
                        cov_jqnx95x11.s[18]++;
                        worker = undefined;
                      } else {
                        cov_jqnx95x11.b[6][1]++;
                      }
                    }cmd = (cov_jqnx95x11.s[19]++, message.cmd);
                  cov_jqnx95x11.s[20]++;

                  if (this.hasCommand(cmd)) {
                    _context.next = 11;
                    break;
                  }

                  cov_jqnx95x11.b[7][0]++;
                  cov_jqnx95x11.s[21]++;

                  console.error('Received unknown command $cmd'); // eslint-disable-line no-console
                  _context.next = 32;
                  break;

                case 11:
                  cov_jqnx95x11.b[7][1]++;
                  cov_jqnx95x11.s[22]++;

                  if (this.hasHooks(cmd)) {
                    _context.next = 19;
                    break;
                  }

                  cov_jqnx95x11.b[8][0]++;
                  cov_jqnx95x11.s[23]++;

                  console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
                  _context.next = 32;
                  break;

                case 19:
                  cov_jqnx95x11.b[8][1]++;
                  cov_jqnx95x11.s[24]++;

                  if (!worker) {
                    _context.next = 28;
                    break;
                  }

                  cov_jqnx95x11.b[9][0]++;
                  cov_jqnx95x11.s[25]++;
                  _context.next = 26;
                  return this.callHook(cmd, worker, message.args);

                case 26:
                  _context.next = 32;
                  break;

                case 28:
                  cov_jqnx95x11.b[9][1]++;
                  cov_jqnx95x11.s[26]++;
                  _context.next = 32;
                  return this.callHook(cmd, message.args);

                case 32:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function receiveCommand(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return receiveCommand;
      }()
    }, {
      key: 'sendCommand',
      value: function sendCommand(worker, cmd, args) {
        cov_jqnx95x11.f[4]++;
        cov_jqnx95x11.s[27]++;

        if (arguments.length === 1) {
          cov_jqnx95x11.b[10][0]++;
          cov_jqnx95x11.s[28]++;

          cmd = worker;
          cov_jqnx95x11.s[29]++;
          worker = undefined;
        } else {
          cov_jqnx95x11.b[10][1]++;
        }

        cov_jqnx95x11.s[30]++;
        if (!this.hasCommand(cmd)) {
          cov_jqnx95x11.b[11][0]++;
          cov_jqnx95x11.s[31]++;

          console.error('Trying to send unknown command ' + cmd); // eslint-disable-line no-console
          cov_jqnx95x11.s[32]++;
          return;
        } else {
          cov_jqnx95x11.b[11][1]++;
        }

        var message = (cov_jqnx95x11.s[33]++, { cmd: cmd, args: args });

        cov_jqnx95x11.s[34]++;
        if (worker) {
          cov_jqnx95x11.b[12][0]++;
          cov_jqnx95x11.s[35]++;

          worker.send(message);
        } else {
          cov_jqnx95x11.b[12][1]++;
          cov_jqnx95x11.s[36]++;

          process.send(message);
        }
      }
    }]);
    return _class;
  }(Base);
});

var cov_2fjgxfe7u7 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/index.js',
      hash = '349b4910d424c49f4f437c50d298ddeb97701091',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var index$1 = Object.freeze({
	Messaging: Messaging
});

var cov_2246pxsqco = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/master.js',
      hash = '84de1c85439f3bc4c0b2b257fb1c65f9f74ea036',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/master.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 14
        },
        end: {
          line: 7,
          column: 42
        }
      },
      '1': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 54
        }
      },
      '2': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 15,
          column: 5
        }
      },
      '3': {
        start: {
          line: 14,
          column: 6
        },
        end: {
          line: 14,
          column: 32
        }
      },
      '4': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 46
        }
      },
      '5': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 46
        }
      },
      '6': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 62
        }
      },
      '7': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 62
        }
      },
      '8': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 25,
          column: 6
        }
      },
      '9': {
        start: {
          line: 32,
          column: 4
        },
        end: {
          line: 32,
          column: 42
        }
      },
      '10': {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 25
        }
      },
      '11': {
        start: {
          line: 38,
          column: 4
        },
        end: {
          line: 38,
          column: 30
        }
      },
      '12': {
        start: {
          line: 40,
          column: 20
        },
        end: {
          line: 40,
          column: 49
        }
      },
      '13': {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 44,
          column: 5
        }
      },
      '14': {
        start: {
          line: 43,
          column: 6
        },
        end: {
          line: 43,
          column: 72
        }
      },
      '15': {
        start: {
          line: 48,
          column: 19
        },
        end: {
          line: 48,
          column: 40
        }
      },
      '16': {
        start: {
          line: 50,
          column: 4
        },
        end: {
          line: 59,
          column: 5
        }
      },
      '17': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 58
        }
      },
      '18': {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
          column: 25
        }
      },
      '19': {
        start: {
          line: 55,
          column: 6
        },
        end: {
          line: 55,
          column: 69
        }
      },
      '20': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 66
        }
      },
      '21': {
        start: {
          line: 58,
          column: 6
        },
        end: {
          line: 58,
          column: 59
        }
      },
      '22': {
        start: {
          line: 63,
          column: 4
        },
        end: {
          line: 66,
          column: 5
        }
      },
      '23': {
        start: {
          line: 64,
          column: 6
        },
        end: {
          line: 64,
          column: 51
        }
      },
      '24': {
        start: {
          line: 65,
          column: 6
        },
        end: {
          line: 65,
          column: 64
        }
      },
      '25': {
        start: {
          line: 70,
          column: 17
        },
        end: {
          line: 70,
          column: 41
        }
      },
      '26': {
        start: {
          line: 73,
          column: 4
        },
        end: {
          line: 81,
          column: 5
        }
      },
      '27': {
        start: {
          line: 74,
          column: 6
        },
        end: {
          line: 74,
          column: 27
        }
      },
      '28': {
        start: {
          line: 76,
          column: 22
        },
        end: {
          line: 76,
          column: 123
        }
      },
      '29': {
        start: {
          line: 77,
          column: 6
        },
        end: {
          line: 79,
          column: 7
        }
      },
      '30': {
        start: {
          line: 78,
          column: 8
        },
        end: {
          line: 78,
          column: 54
        }
      },
      '31': {
        start: {
          line: 80,
          column: 6
        },
        end: {
          line: 80,
          column: 22
        }
      },
      '32': {
        start: {
          line: 83,
          column: 4
        },
        end: {
          line: 83,
          column: 22
        }
      },
      '33': {
        start: {
          line: 87,
          column: 4
        },
        end: {
          line: 89,
          column: 5
        }
      },
      '34': {
        start: {
          line: 88,
          column: 6
        },
        end: {
          line: 88,
          column: 61
        }
      },
      '35': {
        start: {
          line: 93,
          column: 16
        },
        end: {
          line: 93,
          column: 34
        }
      },
      '36': {
        start: {
          line: 94,
          column: 4
        },
        end: {
          line: 94,
          column: 56
        }
      },
      '37': {
        start: {
          line: 96,
          column: 4
        },
        end: {
          line: 96,
          column: 47
        }
      },
      '38': {
        start: {
          line: 100,
          column: 21
        },
        end: {
          line: 100,
          column: 30
        }
      },
      '39': {
        start: {
          line: 102,
          column: 4
        },
        end: {
          line: 102,
          column: 56
        }
      },
      '40': {
        start: {
          line: 104,
          column: 18
        },
        end: {
          line: 104,
          column: 45
        }
      },
      '41': {
        start: {
          line: 106,
          column: 4
        },
        end: {
          line: 108,
          column: 5
        }
      },
      '42': {
        start: {
          line: 110,
          column: 4
        },
        end: {
          line: 112,
          column: 5
        }
      },
      '43': {
        start: {
          line: 113,
          column: 4
        },
        end: {
          line: 113,
          column: 18
        }
      },
      '44': {
        start: {
          line: 115,
          column: 20
        },
        end: {
          line: 115,
          column: 49
        }
      },
      '45': {
        start: {
          line: 116,
          column: 4
        },
        end: {
          line: 118,
          column: 5
        }
      },
      '46': {
        start: {
          line: 117,
          column: 6
        },
        end: {
          line: 117,
          column: 23
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        },
        loc: {
          start: {
            line: 10,
            column: 71
          },
          end: {
            line: 29,
            column: 3
          }
        },
        line: 10
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 22,
            column: 40
          },
          end: {
            line: 22,
            column: 41
          }
        },
        loc: {
          start: {
            line: 22,
            column: 58
          },
          end: {
            line: 25,
            column: 5
          }
        },
        line: 22
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 31,
            column: 2
          },
          end: {
            line: 31,
            column: 3
          }
        },
        loc: {
          start: {
            line: 31,
            column: 18
          },
          end: {
            line: 35,
            column: 3
          }
        },
        line: 31
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 37,
            column: 2
          },
          end: {
            line: 37,
            column: 3
          }
        },
        loc: {
          start: {
            line: 37,
            column: 26
          },
          end: {
            line: 45,
            column: 3
          }
        },
        line: 37
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 47,
            column: 2
          },
          end: {
            line: 47,
            column: 3
          }
        },
        loc: {
          start: {
            line: 47,
            column: 27
          },
          end: {
            line: 60,
            column: 3
          }
        },
        line: 47
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 62,
            column: 2
          },
          end: {
            line: 62,
            column: 3
          }
        },
        loc: {
          start: {
            line: 62,
            column: 33
          },
          end: {
            line: 67,
            column: 3
          }
        },
        line: 62
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 69,
            column: 2
          },
          end: {
            line: 69,
            column: 3
          }
        },
        loc: {
          start: {
            line: 69,
            column: 15
          },
          end: {
            line: 84,
            column: 3
          }
        },
        line: 69
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 86,
            column: 2
          },
          end: {
            line: 86,
            column: 3
          }
        },
        loc: {
          start: {
            line: 86,
            column: 23
          },
          end: {
            line: 90,
            column: 3
          }
        },
        line: 86
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 92,
            column: 2
          },
          end: {
            line: 92,
            column: 3
          }
        },
        loc: {
          start: {
            line: 92,
            column: 17
          },
          end: {
            line: 97,
            column: 3
          }
        },
        line: 92
      },
      '9': {
        name: '(anonymous_9)',
        decl: {
          start: {
            line: 99,
            column: 2
          },
          end: {
            line: 99,
            column: 3
          }
        },
        loc: {
          start: {
            line: 99,
            column: 37
          },
          end: {
            line: 119,
            column: 3
          }
        },
        line: 99
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 10,
            column: 23
          },
          end: {
            line: 10,
            column: 69
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 10,
            column: 67
          },
          end: {
            line: 10,
            column: 69
          }
        }],
        line: 10
      },
      '1': {
        loc: {
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 15,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 15,
            column: 5
          }
        }, {
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 15,
            column: 5
          }
        }],
        line: 13
      },
      '2': {
        loc: {
          start: {
            line: 42,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 42,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        }, {
          start: {
            line: 42,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        }],
        line: 42
      },
      '3': {
        loc: {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 59,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 59,
            column: 5
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 59,
            column: 5
          }
        }],
        line: 50
      },
      '4': {
        loc: {
          start: {
            line: 63,
            column: 4
          },
          end: {
            line: 66,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 63,
            column: 4
          },
          end: {
            line: 66,
            column: 5
          }
        }, {
          start: {
            line: 63,
            column: 4
          },
          end: {
            line: 66,
            column: 5
          }
        }],
        line: 63
      },
      '5': {
        loc: {
          start: {
            line: 63,
            column: 8
          },
          end: {
            line: 63,
            column: 50
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 63,
            column: 8
          },
          end: {
            line: 63,
            column: 35
          }
        }, {
          start: {
            line: 63,
            column: 39
          },
          end: {
            line: 63,
            column: 50
          }
        }],
        line: 63
      },
      '6': {
        loc: {
          start: {
            line: 73,
            column: 11
          },
          end: {
            line: 73,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 73,
            column: 12
          },
          end: {
            line: 73,
            column: 32
          }
        }, {
          start: {
            line: 73,
            column: 37
          },
          end: {
            line: 73,
            column: 49
          }
        }],
        line: 73
      },
      '7': {
        loc: {
          start: {
            line: 77,
            column: 6
          },
          end: {
            line: 79,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 77,
            column: 6
          },
          end: {
            line: 79,
            column: 7
          }
        }, {
          start: {
            line: 77,
            column: 6
          },
          end: {
            line: 79,
            column: 7
          }
        }],
        line: 77
      },
      '8': {
        loc: {
          start: {
            line: 106,
            column: 4
          },
          end: {
            line: 108,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 106,
            column: 4
          },
          end: {
            line: 108,
            column: 5
          }
        }],
        line: 106
      },
      '9': {
        loc: {
          start: {
            line: 110,
            column: 4
          },
          end: {
            line: 112,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 110,
            column: 4
          },
          end: {
            line: 112,
            column: 5
          }
        }],
        line: 110
      },
      '10': {
        loc: {
          start: {
            line: 116,
            column: 4
          },
          end: {
            line: 118,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 116,
            column: 4
          },
          end: {
            line: 118,
            column: 5
          }
        }, {
          start: {
            line: 116,
            column: 4
          },
          end: {
            line: 118,
            column: 5
          }
        }],
        line: 116
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0,
      '37': 0,
      '38': 0,
      '39': 0,
      '40': 0,
      '41': 0,
      '42': 0,
      '43': 0,
      '44': 0,
      '45': 0,
      '46': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    },
    b: {
      '0': [0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0],
      '9': [0],
      '10': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var debug = (cov_2246pxsqco.s[0]++, Debug('nuxt:cluster-master'));

var Master$1 = function (_ref) {
  inherits(Master$$1, _ref);

  function Master$$1(options) {
    var _this2 = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2246pxsqco.b[0][0]++, {}),
        workerCount = _ref2.workerCount,
        workerConcurrency = _ref2.workerConcurrency,
        setup = _ref2.setup;

    classCallCheck(this, Master$$1);
    cov_2246pxsqco.f[0]++;
    cov_2246pxsqco.s[1]++;

    var _this = possibleConstructorReturn(this, (Master$$1.__proto__ || Object.getPrototypeOf(Master$$1)).call(this, options, { workerCount: workerCount, workerConcurrency: workerConcurrency }));

    cov_2246pxsqco.s[2]++;


    if (setup) {
      cov_2246pxsqco.b[1][0]++;
      cov_2246pxsqco.s[3]++;

      cluster.setupMaster(setup);
    } else {
      cov_2246pxsqco.b[1][1]++;
    }
    cov_2246pxsqco.s[4]++;
    cluster.on('fork', _this.onFork.bind(_this));
    cov_2246pxsqco.s[5]++;
    cluster.on('exit', _this.onExit.bind(_this));

    cov_2246pxsqco.s[6]++;
    _this.hook(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    cov_2246pxsqco.s[7]++;
    _this.hook(Commands.sendErrors, _this.saveErrors.bind(_this));

    cov_2246pxsqco.s[8]++;
    _this.watchdog.hook('isWorkerAlive', function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_2246pxsqco.f[1]++;
                return _context.abrupt('return', typeof cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected());

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
    /* this.watchdog.addHook('isWorkerDead', async (worker) => {
      return typeof cluster.workers[worker.id] === 'undefined' || cluster.workers[worker.id].isDead()
    }) */
    return _this;
  }

  createClass(Master$$1, [{
    key: 'run',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_2246pxsqco.f[2]++;
                cov_2246pxsqco.s[9]++;
                _context2.next = 4;
                return this.startListeningForMessages();

              case 4:
                cov_2246pxsqco.s[10]++;
                _context2.next = 7;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'run', this).call(this, args);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x3) {
        return _ref4.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var success;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cov_2246pxsqco.f[3]++;
                cov_2246pxsqco.s[11]++;

                debug('Retrieving routes');

                cov_2246pxsqco.s[12]++;
                _context3.next = 6;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'getRoutes', this).call(this, params);

              case 6:
                success = _context3.sent;
                cov_2246pxsqco.s[13]++;


                if (success) {
                  cov_2246pxsqco.b[2][0]++;
                  cov_2246pxsqco.s[14]++;

                  debug('A total of ' + this.routes.length + ' routes will be generated');
                } else {
                  cov_2246pxsqco.b[2][1]++;
                }

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoutes(_x4) {
        return _ref5.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(worker) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cov_2246pxsqco.f[4]++;
                routes = (cov_2246pxsqco.s[15]++, this.getBatchRoutes());
                cov_2246pxsqco.s[16]++;


                if (!routes.length) {
                  cov_2246pxsqco.b[3][0]++;
                  cov_2246pxsqco.s[17]++;

                  debug('No more routes, exiting worker ' + worker.id);

                  cov_2246pxsqco.s[18]++;
                  worker.disconnect();
                } else {
                  cov_2246pxsqco.b[3][1]++;
                  cov_2246pxsqco.s[19]++;

                  debug('Sending ' + routes.length + ' routes to worker ' + worker.id);

                  cov_2246pxsqco.s[20]++;
                  this.watchdog.appendInfo(worker.id, 'routes', routes.length);
                  cov_2246pxsqco.s[21]++;
                  this.sendCommand(worker, Commands.sendRoutes, routes);
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendRoutes(_x5) {
        return _ref6.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(worker, args) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                cov_2246pxsqco.f[5]++;
                cov_2246pxsqco.s[22]++;

                if ((cov_2246pxsqco.b[5][0]++, typeof args !== 'undefined') && (cov_2246pxsqco.b[5][1]++, args.length)) {
                  cov_2246pxsqco.b[4][0]++;
                  cov_2246pxsqco.s[23]++;

                  Array.prototype.push.apply(this.errors, args);
                  cov_2246pxsqco.s[24]++;
                  this.watchdog.appendInfo(worker.id, 'errors', args.length);
                } else {
                  cov_2246pxsqco.b[4][1]++;
                }

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveErrors(_x6, _x7) {
        return _ref7.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'done',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var Iter, worker, workerMsg;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cov_2246pxsqco.f[6]++;
                Iter = (cov_2246pxsqco.s[25]++, this.watchdog.iterator());
                worker = void 0;
                cov_2246pxsqco.s[26]++;

                while ((cov_2246pxsqco.b[6][0]++, worker = Iter.next()) && (cov_2246pxsqco.b[6][1]++, !worker.done)) {
                  cov_2246pxsqco.s[27]++;

                  worker = worker.value;

                  workerMsg = (cov_2246pxsqco.s[28]++, 'Worker ' + worker.id + ' generated ' + worker.routes + ' routes in ' + Math.round(worker.duration / 1E8) / 10 + 's');
                  cov_2246pxsqco.s[29]++;

                  if (worker.errors > 0) {
                    cov_2246pxsqco.b[7][0]++;
                    cov_2246pxsqco.s[30]++;

                    workerMsg += ' with ' + worker.errors + ' error(s)';
                  } else {
                    cov_2246pxsqco.b[7][1]++;
                  }
                  cov_2246pxsqco.s[31]++;
                  debug(workerMsg);
                }

                cov_2246pxsqco.s[32]++;
                _context6.next = 8;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'done', this).call(this);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function done() {
        return _ref8.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var i;
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cov_2246pxsqco.f[7]++;
                cov_2246pxsqco.s[33]++;
                _context7.next = 4;
                return this.watchdog.countAlive();

              case 4:
                i = _context7.sent;

              case 5:
                if (!(i < this.workerCount)) {
                  _context7.next = 11;
                  break;
                }

                cov_2246pxsqco.s[34]++;

                cluster.fork({ options: JSON.stringify(this.options) });

              case 8:
                i++;
                _context7.next = 5;
                break;

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startWorkers() {
        return _ref9.apply(this, arguments);
      }

      return startWorkers;
    }()
  }, {
    key: 'onFork',
    value: function onFork(worker) {
      cov_2246pxsqco.f[8]++;

      var pid = (cov_2246pxsqco.s[35]++, worker.process.pid);
      cov_2246pxsqco.s[36]++;
      debug('Worker ' + worker.id + ' started with pid ' + pid);

      cov_2246pxsqco.s[37]++;
      this.watchdog.addWorker(worker.id, { pid: pid });
    }
  }, {
    key: 'onExit',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker, code, signal) {
        var workerId, message, allDead;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                cov_2246pxsqco.f[9]++;
                workerId = (cov_2246pxsqco.s[38]++, worker.id);
                cov_2246pxsqco.s[39]++;


                this.watchdog.exitWorker(workerId, { code: code, signal: signal });

                message = (cov_2246pxsqco.s[40]++, 'Worker ' + workerId + ' exited');
                /* istanbul ignore if */

                cov_2246pxsqco.s[41]++;
                if (code !== 0) {
                  message += ' with status code ' + code;
                } else {
                  cov_2246pxsqco.b[8][0]++;
                }
                /* istanbul ignore if */
                cov_2246pxsqco.s[42]++;
                if (signal) {
                  message += ' by signal ' + signal;
                } else {
                  cov_2246pxsqco.b[9][0]++;
                }
                cov_2246pxsqco.s[43]++;
                debug(message);

                cov_2246pxsqco.s[44]++;
                _context8.next = 14;
                return this.watchdog.allDead();

              case 14:
                allDead = _context8.sent;
                cov_2246pxsqco.s[45]++;

                if (!allDead) {
                  _context8.next = 23;
                  break;
                }

                cov_2246pxsqco.b[10][0]++;
                cov_2246pxsqco.s[46]++;
                _context8.next = 21;
                return this.done();

              case 21:
                _context8.next = 24;
                break;

              case 23:
                cov_2246pxsqco.b[10][1]++;

              case 24:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onExit(_x8, _x9, _x10) {
        return _ref10.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}((Hookable(Messaging(Master))));

var cov_1o0lmw3tts = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/worker.js',
      hash = 'cd3196574a28969b483b2cabdf3212a0770d6950',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/worker.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 14
        },
        end: {
          line: 7,
          column: 42
        }
      },
      '1': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 18
        }
      },
      '2': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 16,
          column: 5
        }
      },
      '3': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 20,
          column: 6
        }
      },
      '4': {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 19,
          column: 56
        }
      },
      '5': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 66
        }
      },
      '6': {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 26,
          column: 21
        }
      },
      '7': {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 28,
          column: 36
        }
      },
      '8': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 41
        }
      },
      '9': {
        start: {
          line: 33,
          column: 19
        },
        end: {
          line: 33,
          column: 23
        }
      },
      '10': {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 75
        }
      },
      '11': {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 44,
          column: 5
        }
      },
      '12': {
        start: {
          line: 38,
          column: 6
        },
        end: {
          line: 38,
          column: 49
        }
      },
      '13': {
        start: {
          line: 46,
          column: 4
        },
        end: {
          line: 58,
          column: 5
        }
      },
      '14': {
        start: {
          line: 47,
          column: 6
        },
        end: {
          line: 55,
          column: 8
        }
      },
      '15': {
        start: {
          line: 48,
          column: 8
        },
        end: {
          line: 48,
          column: 32
        }
      },
      '16': {
        start: {
          line: 50,
          column: 8
        },
        end: {
          line: 53,
          column: 9
        }
      },
      '17': {
        start: {
          line: 52,
          column: 10
        },
        end: {
          line: 52,
          column: 57
        }
      },
      '18': {
        start: {
          line: 54,
          column: 8
        },
        end: {
          line: 54,
          column: 20
        }
      },
      '19': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 62
        }
      },
      '20': {
        start: {
          line: 60,
          column: 4
        },
        end: {
          line: 60,
          column: 41
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        },
        loc: {
          start: {
            line: 10,
            column: 23
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 10
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 18,
            column: 54
          },
          end: {
            line: 18,
            column: 55
          }
        },
        loc: {
          start: {
            line: 18,
            column: 75
          },
          end: {
            line: 20,
            column: 5
          }
        },
        line: 18
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        },
        loc: {
          start: {
            line: 25,
            column: 14
          },
          end: {
            line: 30,
            column: 3
          }
        },
        line: 25
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 32,
            column: 2
          },
          end: {
            line: 32,
            column: 3
          }
        },
        loc: {
          start: {
            line: 32,
            column: 29
          },
          end: {
            line: 61,
            column: 3
          }
        },
        line: 32
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 47,
            column: 26
          },
          end: {
            line: 47,
            column: 27
          }
        },
        loc: {
          start: {
            line: 47,
            column: 37
          },
          end: {
            line: 55,
            column: 7
          }
        },
        line: 47
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }],
        line: 14
      },
      '1': {
        loc: {
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }, {
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }],
        line: 46
      },
      '2': {
        loc: {
          start: {
            line: 46,
            column: 8
          },
          end: {
            line: 46,
            column: 31
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 46,
            column: 8
          },
          end: {
            line: 46,
            column: 14
          }
        }, {
          start: {
            line: 46,
            column: 18
          },
          end: {
            line: 46,
            column: 31
          }
        }],
        line: 46
      },
      '3': {
        loc: {
          start: {
            line: 50,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 50,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        }, {
          start: {
            line: 50,
            column: 8
          },
          end: {
            line: 53,
            column: 9
          }
        }],
        line: 50
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    b: {
      '0': [0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var debug$1 = (cov_1o0lmw3tts.s[0]++, Debug('nuxt:cluster-worker'));

var Worker$1 = function (_ref) {
  inherits(Worker$$1, _ref);

  function Worker$$1(options) {
    classCallCheck(this, Worker$$1);
    cov_1o0lmw3tts.f[0]++;
    cov_1o0lmw3tts.s[1]++;

    /* istanbul ignore if */
    var _this = possibleConstructorReturn(this, (Worker$$1.__proto__ || Object.getPrototypeOf(Worker$$1)).call(this, options));

    cov_1o0lmw3tts.s[2]++;
    if (cluster.isWorker) {
      _this.setId(cluster.worker.id);
    } else {
      cov_1o0lmw3tts.b[0][0]++;
    }

    cov_1o0lmw3tts.s[3]++;
    _this.generator.nuxt.hook('generate:routeCreated', function (_ref2) {
      var route = _ref2.route,
          path = _ref2.path;
      cov_1o0lmw3tts.f[1]++;
      cov_1o0lmw3tts.s[4]++;

      debug$1('Worker ' + _this.id + ' generated file: ' + path);
    });

    cov_1o0lmw3tts.s[5]++;
    _this.hook(Commands.sendRoutes, _this.generateRoutes.bind(_this));
    return _this;
  }

  createClass(Worker$$1, [{
    key: 'run',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_1o0lmw3tts.f[2]++;
                cov_1o0lmw3tts.s[6]++;
                _context.next = 4;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'run', this).call(this);

              case 4:
                cov_1o0lmw3tts.s[7]++;


                this.startListeningForMessages();
                cov_1o0lmw3tts.s[8]++;
                this.sendCommand(Commands.sendRoutes);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        var _this2 = this;

        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_1o0lmw3tts.f[3]++;
                routes = (cov_1o0lmw3tts.s[9]++, args);
                cov_1o0lmw3tts.s[10]++;

                debug$1('Worker ' + this.id + ' received ' + routes.length + ' routes from master');

                errors = void 0;
                cov_1o0lmw3tts.s[11]++;
                _context2.prev = 6;
                cov_1o0lmw3tts.s[12]++;
                _context2.next = 10;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'generateRoutes', this).call(this, routes);

              case 10:
                errors = _context2.sent;
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](6);

                /* istanbul ignore next */
                if (cluster.isWorker) {
                  process.exit(1);
                }

              case 16:
                cov_1o0lmw3tts.s[13]++;


                if ((cov_1o0lmw3tts.b[2][0]++, errors) && (cov_1o0lmw3tts.b[2][1]++, errors.length)) {
                  cov_1o0lmw3tts.b[1][0]++;
                  cov_1o0lmw3tts.s[14]++;

                  errors = errors.map(function (error) {
                    cov_1o0lmw3tts.f[4]++;
                    cov_1o0lmw3tts.s[15]++;

                    error.workerId = _this2.id;

                    cov_1o0lmw3tts.s[16]++;
                    if (error.type === 'unhandled') {
                      cov_1o0lmw3tts.b[3][0]++;
                      cov_1o0lmw3tts.s[17]++;

                      // convert error stack to a string already, we cant send a stack object to the master process
                      error.error = { stack: '' + error.error.stack };
                    } else {
                      cov_1o0lmw3tts.b[3][1]++;
                    }
                    cov_1o0lmw3tts.s[18]++;
                    return error;
                  });

                  cov_1o0lmw3tts.s[19]++;
                  this.sendCommand(undefined, Commands.sendErrors, errors);
                } else {
                  cov_1o0lmw3tts.b[1][1]++;
                }

                cov_1o0lmw3tts.s[20]++;
                this.sendCommand(Commands.sendRoutes);

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 13]]);
      }));

      function generateRoutes(_x) {
        return _ref4.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}((Hookable(Messaging(Worker))));

var cov_1uiervxvsl = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/index.js',
      hash = '735ea719beeb911985d03d30504b3cd7931dfa6c',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var Cluster = Object.freeze({
	Master: Master$1,
	Worker: Worker$1,
	Mixins: index$1
});

var cov_2mygcx72de = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/single/mixins/messaging.js',
      hash = 'c9dc7d4c0a447afa83975db0eba92403fe0f80fc',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/single/mixins/messaging.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 13
        },
        end: {
          line: 4,
          column: 17
        }
      },
      '1': {
        start: {
          line: 6,
          column: 25
        },
        end: {
          line: 62,
          column: 1
        }
      },
      '2': {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 12,
          column: 5
        }
      },
      '3': {
        start: {
          line: 9,
          column: 6
        },
        end: {
          line: 9,
          column: 32
        }
      },
      '4': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 16,
          column: 5
        }
      },
      '5': {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 15,
          column: 19
        }
      },
      '6': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 29
        }
      },
      '7': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 23,
          column: 5
        }
      },
      '8': {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 44
        }
      },
      '9': {
        start: {
          line: 24,
          column: 4
        },
        end: {
          line: 24,
          column: 56
        }
      },
      '10': {
        start: {
          line: 28,
          column: 16
        },
        end: {
          line: 28,
          column: 27
        }
      },
      '11': {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 40,
          column: 5
        }
      },
      '12': {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 54
        }
      },
      '13': {
        start: {
          line: 32,
          column: 11
        },
        end: {
          line: 40,
          column: 5
        }
      },
      '14': {
        start: {
          line: 33,
          column: 6
        },
        end: {
          line: 33,
          column: 63
        }
      },
      '15': {
        start: {
          line: 35,
          column: 6
        },
        end: {
          line: 39,
          column: 7
        }
      },
      '16': {
        start: {
          line: 36,
          column: 8
        },
        end: {
          line: 36,
          column: 54
        }
      },
      '17': {
        start: {
          line: 38,
          column: 8
        },
        end: {
          line: 38,
          column: 46
        }
      },
      '18': {
        start: {
          line: 44,
          column: 4
        },
        end: {
          line: 47,
          column: 5
        }
      },
      '19': {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 45,
          column: 18
        }
      },
      '20': {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 46,
          column: 24
        }
      },
      '21': {
        start: {
          line: 49,
          column: 4
        },
        end: {
          line: 52,
          column: 5
        }
      },
      '22': {
        start: {
          line: 50,
          column: 6
        },
        end: {
          line: 50,
          column: 60
        }
      },
      '23': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 12
        }
      },
      '24': {
        start: {
          line: 54,
          column: 20
        },
        end: {
          line: 54,
          column: 33
        }
      },
      '25': {
        start: {
          line: 56,
          column: 4
        },
        end: {
          line: 60,
          column: 5
        }
      },
      '26': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 47
        }
      },
      '27': {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
          column: 42
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 6,
            column: 15
          },
          end: {
            line: 6,
            column: 16
          }
        },
        loc: {
          start: {
            line: 6,
            column: 25
          },
          end: {
            line: 62,
            column: 1
          }
        },
        line: 6
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 7,
            column: 3
          }
        },
        loc: {
          start: {
            line: 7,
            column: 30
          },
          end: {
            line: 18,
            column: 3
          }
        },
        line: 7
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        loc: {
          start: {
            line: 20,
            column: 18
          },
          end: {
            line: 25,
            column: 3
          }
        },
        line: 20
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 27,
            column: 2
          },
          end: {
            line: 27,
            column: 3
          }
        },
        loc: {
          start: {
            line: 27,
            column: 40
          },
          end: {
            line: 41,
            column: 3
          }
        },
        line: 27
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 43,
            column: 2
          },
          end: {
            line: 43,
            column: 3
          }
        },
        loc: {
          start: {
            line: 43,
            column: 33
          },
          end: {
            line: 61,
            column: 3
          }
        },
        line: 43
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        }, {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        }],
        line: 8
      },
      '1': {
        loc: {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }, {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }],
        line: 14
      },
      '2': {
        loc: {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }, {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }],
        line: 21
      },
      '3': {
        loc: {
          start: {
            line: 24,
            column: 11
          },
          end: {
            line: 24,
            column: 56
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 24,
            column: 11
          },
          end: {
            line: 24,
            column: 14
          }
        }, {
          start: {
            line: 24,
            column: 18
          },
          end: {
            line: 24,
            column: 56
          }
        }],
        line: 24
      },
      '4': {
        loc: {
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        }, {
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        }],
        line: 30
      },
      '5': {
        loc: {
          start: {
            line: 32,
            column: 11
          },
          end: {
            line: 40,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 32,
            column: 11
          },
          end: {
            line: 40,
            column: 5
          }
        }, {
          start: {
            line: 32,
            column: 11
          },
          end: {
            line: 40,
            column: 5
          }
        }],
        line: 32
      },
      '6': {
        loc: {
          start: {
            line: 35,
            column: 6
          },
          end: {
            line: 39,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 35,
            column: 6
          },
          end: {
            line: 39,
            column: 7
          }
        }, {
          start: {
            line: 35,
            column: 6
          },
          end: {
            line: 39,
            column: 7
          }
        }],
        line: 35
      },
      '7': {
        loc: {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 47,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 47,
            column: 5
          }
        }, {
          start: {
            line: 44,
            column: 4
          },
          end: {
            line: 47,
            column: 5
          }
        }],
        line: 44
      },
      '8': {
        loc: {
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        }, {
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        }],
        line: 49
      },
      '9': {
        loc: {
          start: {
            line: 56,
            column: 4
          },
          end: {
            line: 60,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 56,
            column: 4
          },
          end: {
            line: 60,
            column: 5
          }
        }, {
          start: {
            line: 56,
            column: 4
          },
          end: {
            line: 60,
            column: 5
          }
        }],
        line: 56
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0, 0],
      '9': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var master = (cov_2mygcx72de.s[0]++, null);

var Messaging$1 = (function (Base) {
  cov_2mygcx72de.f[0]++;
  cov_2mygcx72de.s[1]++;
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'startListeningForMessages',
      value: function startListeningForMessages() {
        cov_2mygcx72de.f[1]++;
        cov_2mygcx72de.s[2]++;

        if (typeof this.__isListening === 'undefined') {
          cov_2mygcx72de.b[0][0]++;
          cov_2mygcx72de.s[3]++;

          this.__isListening = false;
        } else /* istanbul ignore next */{
            cov_2mygcx72de.b[0][1]++;
            if (this.__isListening) {
              return;
            }
          }cov_2mygcx72de.s[4]++;
        if (typeof this.workers !== 'undefined') {
          cov_2mygcx72de.b[1][0]++;
          cov_2mygcx72de.s[5]++;

          master = this;
        } else {
          cov_2mygcx72de.b[1][1]++;
        }
        cov_2mygcx72de.s[6]++;
        this.__isListening = true;
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        cov_2mygcx72de.f[2]++;
        cov_2mygcx72de.s[7]++;

        if (typeof this._commandsArray === 'undefined') {
          cov_2mygcx72de.b[2][0]++;
          cov_2mygcx72de.s[8]++;

          this._commandsArray = lodash.values(Commands);
        } else {
          cov_2mygcx72de.b[2][1]++;
        }
        cov_2mygcx72de.s[9]++;
        return (cov_2mygcx72de.b[3][0]++, cmd) && (cov_2mygcx72de.b[3][1]++, lodash.indexOf(this._commandsArray, cmd) > -1);
      }
    }, {
      key: 'receiveCommand',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker, message) {
          var cmd;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cov_2mygcx72de.f[3]++;
                  cmd = (cov_2mygcx72de.s[10]++, message.cmd);
                  cov_2mygcx72de.s[11]++;

                  if (this.hasCommand(cmd)) {
                    _context.next = 9;
                    break;
                  }

                  cov_2mygcx72de.b[4][0]++;
                  cov_2mygcx72de.s[12]++;

                  console.error('Received unknown command ' + cmd); // eslint-disable-line no-console
                  _context.next = 30;
                  break;

                case 9:
                  cov_2mygcx72de.b[4][1]++;
                  cov_2mygcx72de.s[13]++;

                  if (this.hasHooks(cmd)) {
                    _context.next = 17;
                    break;
                  }

                  cov_2mygcx72de.b[5][0]++;
                  cov_2mygcx72de.s[14]++;

                  console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
                  _context.next = 30;
                  break;

                case 17:
                  cov_2mygcx72de.b[5][1]++;
                  cov_2mygcx72de.s[15]++;

                  if (!worker) {
                    _context.next = 26;
                    break;
                  }

                  cov_2mygcx72de.b[6][0]++;
                  cov_2mygcx72de.s[16]++;
                  _context.next = 24;
                  return this.callHook(cmd, worker, message.args);

                case 24:
                  _context.next = 30;
                  break;

                case 26:
                  cov_2mygcx72de.b[6][1]++;
                  cov_2mygcx72de.s[17]++;
                  _context.next = 30;
                  return this.callHook(cmd, message.args);

                case 30:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function receiveCommand(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return receiveCommand;
      }()
    }, {
      key: 'sendCommand',
      value: function sendCommand(worker, cmd, args) {
        cov_2mygcx72de.f[4]++;
        cov_2mygcx72de.s[18]++;

        if (arguments.length === 1) {
          cov_2mygcx72de.b[7][0]++;
          cov_2mygcx72de.s[19]++;

          cmd = worker;
          cov_2mygcx72de.s[20]++;
          worker = undefined;
        } else {
          cov_2mygcx72de.b[7][1]++;
        }

        cov_2mygcx72de.s[21]++;
        if (!this.hasCommand(cmd)) {
          cov_2mygcx72de.b[8][0]++;
          cov_2mygcx72de.s[22]++;

          console.error('Trying to send unknown command ' + cmd); // eslint-disable-line no-console
          cov_2mygcx72de.s[23]++;
          return;
        } else {
          cov_2mygcx72de.b[8][1]++;
        }

        var message = (cov_2mygcx72de.s[24]++, { cmd: cmd, args: args });

        cov_2mygcx72de.s[25]++;
        if (worker) {
          cov_2mygcx72de.b[9][0]++;
          cov_2mygcx72de.s[26]++;

          worker.receiveCommand(undefined, message);
        } else {
          cov_2mygcx72de.b[9][1]++;
          cov_2mygcx72de.s[27]++;

          master.receiveCommand(this, message);
        }
      }
    }]);
    return _class;
  }(Base);
});

var cov_2d211jmy19 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/single/mixins/index.js',
      hash = 'dc78eaef623aaed88c4906a57926a21d6644a5d7',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/single/mixins/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var index$2 = Object.freeze({
	Messaging: Messaging$1
});

var cov_2qyaf1dgnu = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/single/master.js',
      hash = '9a1ec5c8a371a0cbc5f57ea98b3b46e7b122ee38',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/single/master.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 14
        },
        end: {
          line: 8,
          column: 34
        }
      },
      '1': {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 54
        }
      },
      '2': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 21
        }
      },
      '3': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 25
        }
      },
      '4': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 62
        }
      },
      '5': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 62
        }
      },
      '6': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 23,
          column: 6
        }
      },
      '7': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 42
        }
      },
      '8': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 25
        }
      },
      '9': {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 33,
          column: 30
        }
      },
      '10': {
        start: {
          line: 35,
          column: 20
        },
        end: {
          line: 35,
          column: 49
        }
      },
      '11': {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 39,
          column: 5
        }
      },
      '12': {
        start: {
          line: 38,
          column: 6
        },
        end: {
          line: 38,
          column: 72
        }
      },
      '13': {
        start: {
          line: 43,
          column: 19
        },
        end: {
          line: 43,
          column: 40
        }
      },
      '14': {
        start: {
          line: 45,
          column: 4
        },
        end: {
          line: 54,
          column: 5
        }
      },
      '15': {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 46,
          column: 58
        }
      },
      '16': {
        start: {
          line: 48,
          column: 6
        },
        end: {
          line: 48,
          column: 25
        }
      },
      '17': {
        start: {
          line: 50,
          column: 6
        },
        end: {
          line: 50,
          column: 69
        }
      },
      '18': {
        start: {
          line: 52,
          column: 6
        },
        end: {
          line: 52,
          column: 66
        }
      },
      '19': {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
          column: 59
        }
      },
      '20': {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 61,
          column: 5
        }
      },
      '21': {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
          column: 51
        }
      },
      '22': {
        start: {
          line: 60,
          column: 6
        },
        end: {
          line: 60,
          column: 64
        }
      },
      '23': {
        start: {
          line: 65,
          column: 17
        },
        end: {
          line: 65,
          column: 41
        }
      },
      '24': {
        start: {
          line: 68,
          column: 4
        },
        end: {
          line: 76,
          column: 5
        }
      },
      '25': {
        start: {
          line: 69,
          column: 6
        },
        end: {
          line: 69,
          column: 27
        }
      },
      '26': {
        start: {
          line: 71,
          column: 22
        },
        end: {
          line: 71,
          column: 123
        }
      },
      '27': {
        start: {
          line: 72,
          column: 6
        },
        end: {
          line: 74,
          column: 7
        }
      },
      '28': {
        start: {
          line: 73,
          column: 8
        },
        end: {
          line: 73,
          column: 54
        }
      },
      '29': {
        start: {
          line: 75,
          column: 6
        },
        end: {
          line: 75,
          column: 22
        }
      },
      '30': {
        start: {
          line: 78,
          column: 4
        },
        end: {
          line: 78,
          column: 22
        }
      },
      '31': {
        start: {
          line: 82,
          column: 4
        },
        end: {
          line: 90,
          column: 5
        }
      },
      '32': {
        start: {
          line: 83,
          column: 6
        },
        end: {
          line: 83,
          column: 25
        }
      },
      '33': {
        start: {
          line: 84,
          column: 19
        },
        end: {
          line: 84,
          column: 62
        }
      },
      '34': {
        start: {
          line: 85,
          column: 6
        },
        end: {
          line: 85,
          column: 31
        }
      },
      '35': {
        start: {
          line: 86,
          column: 6
        },
        end: {
          line: 86,
          column: 40
        }
      },
      '36': {
        start: {
          line: 88,
          column: 6
        },
        end: {
          line: 88,
          column: 18
        }
      },
      '37': {
        start: {
          line: 89,
          column: 6
        },
        end: {
          line: 89,
          column: 42
        }
      },
      '38': {
        start: {
          line: 94,
          column: 21
        },
        end: {
          line: 94,
          column: 30
        }
      },
      '39': {
        start: {
          line: 96,
          column: 4
        },
        end: {
          line: 96,
          column: 38
        }
      },
      '40': {
        start: {
          line: 97,
          column: 4
        },
        end: {
          line: 97,
          column: 30
        }
      },
      '41': {
        start: {
          line: 99,
          column: 20
        },
        end: {
          line: 99,
          column: 47
        }
      },
      '42': {
        start: {
          line: 100,
          column: 4
        },
        end: {
          line: 100,
          column: 18
        }
      },
      '43': {
        start: {
          line: 102,
          column: 20
        },
        end: {
          line: 102,
          column: 49
        }
      },
      '44': {
        start: {
          line: 103,
          column: 4
        },
        end: {
          line: 105,
          column: 5
        }
      },
      '45': {
        start: {
          line: 104,
          column: 6
        },
        end: {
          line: 104,
          column: 23
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 11,
            column: 2
          },
          end: {
            line: 11,
            column: 3
          }
        },
        loc: {
          start: {
            line: 11,
            column: 71
          },
          end: {
            line: 24,
            column: 3
          }
        },
        line: 11
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 20,
            column: 40
          },
          end: {
            line: 20,
            column: 41
          }
        },
        loc: {
          start: {
            line: 20,
            column: 58
          },
          end: {
            line: 23,
            column: 5
          }
        },
        line: 20
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 26,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        },
        loc: {
          start: {
            line: 26,
            column: 18
          },
          end: {
            line: 30,
            column: 3
          }
        },
        line: 26
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 32,
            column: 2
          },
          end: {
            line: 32,
            column: 3
          }
        },
        loc: {
          start: {
            line: 32,
            column: 26
          },
          end: {
            line: 40,
            column: 3
          }
        },
        line: 32
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 42,
            column: 2
          },
          end: {
            line: 42,
            column: 3
          }
        },
        loc: {
          start: {
            line: 42,
            column: 27
          },
          end: {
            line: 55,
            column: 3
          }
        },
        line: 42
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 57,
            column: 2
          },
          end: {
            line: 57,
            column: 3
          }
        },
        loc: {
          start: {
            line: 57,
            column: 33
          },
          end: {
            line: 62,
            column: 3
          }
        },
        line: 57
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 64,
            column: 2
          },
          end: {
            line: 64,
            column: 3
          }
        },
        loc: {
          start: {
            line: 64,
            column: 15
          },
          end: {
            line: 79,
            column: 3
          }
        },
        line: 64
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 81,
            column: 2
          },
          end: {
            line: 81,
            column: 3
          }
        },
        loc: {
          start: {
            line: 81,
            column: 23
          },
          end: {
            line: 91,
            column: 3
          }
        },
        line: 81
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 93,
            column: 2
          },
          end: {
            line: 93,
            column: 3
          }
        },
        loc: {
          start: {
            line: 93,
            column: 23
          },
          end: {
            line: 106,
            column: 3
          }
        },
        line: 93
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 11,
            column: 23
          },
          end: {
            line: 11,
            column: 69
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 11,
            column: 67
          },
          end: {
            line: 11,
            column: 69
          }
        }],
        line: 11
      },
      '1': {
        loc: {
          start: {
            line: 37,
            column: 4
          },
          end: {
            line: 39,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 37,
            column: 4
          },
          end: {
            line: 39,
            column: 5
          }
        }, {
          start: {
            line: 37,
            column: 4
          },
          end: {
            line: 39,
            column: 5
          }
        }],
        line: 37
      },
      '2': {
        loc: {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        }],
        line: 45
      },
      '3': {
        loc: {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        }, {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 61,
            column: 5
          }
        }],
        line: 58
      },
      '4': {
        loc: {
          start: {
            line: 58,
            column: 8
          },
          end: {
            line: 58,
            column: 50
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 58,
            column: 8
          },
          end: {
            line: 58,
            column: 35
          }
        }, {
          start: {
            line: 58,
            column: 39
          },
          end: {
            line: 58,
            column: 50
          }
        }],
        line: 58
      },
      '5': {
        loc: {
          start: {
            line: 68,
            column: 11
          },
          end: {
            line: 68,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 68,
            column: 12
          },
          end: {
            line: 68,
            column: 32
          }
        }, {
          start: {
            line: 68,
            column: 37
          },
          end: {
            line: 68,
            column: 49
          }
        }],
        line: 68
      },
      '6': {
        loc: {
          start: {
            line: 72,
            column: 6
          },
          end: {
            line: 74,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 72,
            column: 6
          },
          end: {
            line: 74,
            column: 7
          }
        }, {
          start: {
            line: 72,
            column: 6
          },
          end: {
            line: 74,
            column: 7
          }
        }],
        line: 72
      },
      '7': {
        loc: {
          start: {
            line: 103,
            column: 4
          },
          end: {
            line: 105,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 103,
            column: 4
          },
          end: {
            line: 105,
            column: 5
          }
        }, {
          start: {
            line: 103,
            column: 4
          },
          end: {
            line: 105,
            column: 5
          }
        }],
        line: 103
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0,
      '37': 0,
      '38': 0,
      '39': 0,
      '40': 0,
      '41': 0,
      '42': 0,
      '43': 0,
      '44': 0,
      '45': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0
    },
    b: {
      '0': [0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var debug$2 = (cov_2qyaf1dgnu.s[0]++, Debug('nuxt:master'));

var Master$3 = function (_ref) {
  inherits(Master$$1, _ref);

  function Master$$1(options) {
    var _this2 = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_2qyaf1dgnu.b[0][0]++, {}),
        workerCount = _ref2.workerCount,
        workerConcurrency = _ref2.workerConcurrency,
        setup = _ref2.setup;

    classCallCheck(this, Master$$1);
    cov_2qyaf1dgnu.f[0]++;
    cov_2qyaf1dgnu.s[1]++;

    var _this = possibleConstructorReturn(this, (Master$$1.__proto__ || Object.getPrototypeOf(Master$$1)).call(this, options, { workerCount: workerCount, workerConcurrency: workerConcurrency }));

    cov_2qyaf1dgnu.s[2]++;


    _this.workers = [];
    cov_2qyaf1dgnu.s[3]++;
    _this.lastWorkerId = 0;

    cov_2qyaf1dgnu.s[4]++;
    _this.hook(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    cov_2qyaf1dgnu.s[5]++;
    _this.hook(Commands.sendErrors, _this.saveErrors.bind(_this));

    cov_2qyaf1dgnu.s[6]++;
    _this.watchdog.hook('isWorkerAlive', function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_2qyaf1dgnu.f[1]++;
                return _context.abrupt('return', typeof _this.workers[worker.id] !== 'undefined');

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
    return _this;
  }

  createClass(Master$$1, [{
    key: 'run',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_2qyaf1dgnu.f[2]++;
                cov_2qyaf1dgnu.s[7]++;
                _context2.next = 4;
                return this.startListeningForMessages();

              case 4:
                cov_2qyaf1dgnu.s[8]++;
                _context2.next = 7;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'run', this).call(this, args);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x3) {
        return _ref4.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var success;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cov_2qyaf1dgnu.f[3]++;
                cov_2qyaf1dgnu.s[9]++;

                debug$2('Retrieving routes');

                cov_2qyaf1dgnu.s[10]++;
                _context3.next = 6;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'getRoutes', this).call(this, params);

              case 6:
                success = _context3.sent;
                cov_2qyaf1dgnu.s[11]++;


                if (success) {
                  cov_2qyaf1dgnu.b[1][0]++;
                  cov_2qyaf1dgnu.s[12]++;

                  debug$2('A total of ' + this.routes.length + ' routes will be generated');
                } else {
                  cov_2qyaf1dgnu.b[1][1]++;
                }

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoutes(_x4) {
        return _ref5.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(worker) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cov_2qyaf1dgnu.f[4]++;
                routes = (cov_2qyaf1dgnu.s[13]++, this.getBatchRoutes());
                cov_2qyaf1dgnu.s[14]++;


                if (!routes.length) {
                  cov_2qyaf1dgnu.b[2][0]++;
                  cov_2qyaf1dgnu.s[15]++;

                  debug$2('No more routes, exiting worker ' + worker.id);

                  cov_2qyaf1dgnu.s[16]++;
                  this.onExit(worker);
                } else {
                  cov_2qyaf1dgnu.b[2][1]++;
                  cov_2qyaf1dgnu.s[17]++;

                  debug$2('Sending ' + routes.length + ' routes to worker ' + worker.id);

                  cov_2qyaf1dgnu.s[18]++;
                  this.watchdog.appendInfo(worker.id, 'routes', routes.length);
                  cov_2qyaf1dgnu.s[19]++;
                  this.sendCommand(worker, Commands.sendRoutes, routes);
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendRoutes(_x5) {
        return _ref6.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(worker, args) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                cov_2qyaf1dgnu.f[5]++;
                cov_2qyaf1dgnu.s[20]++;

                if ((cov_2qyaf1dgnu.b[4][0]++, typeof args !== 'undefined') && (cov_2qyaf1dgnu.b[4][1]++, args.length)) {
                  cov_2qyaf1dgnu.b[3][0]++;
                  cov_2qyaf1dgnu.s[21]++;

                  Array.prototype.push.apply(this.errors, args);
                  cov_2qyaf1dgnu.s[22]++;
                  this.watchdog.appendInfo(worker.id, 'errors', args.length);
                } else {
                  cov_2qyaf1dgnu.b[3][1]++;
                }

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveErrors(_x6, _x7) {
        return _ref7.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'done',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var Iter, worker, workerMsg;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cov_2qyaf1dgnu.f[6]++;
                Iter = (cov_2qyaf1dgnu.s[23]++, this.watchdog.iterator());
                worker = void 0;
                cov_2qyaf1dgnu.s[24]++;

                while ((cov_2qyaf1dgnu.b[5][0]++, worker = Iter.next()) && (cov_2qyaf1dgnu.b[5][1]++, !worker.done)) {
                  cov_2qyaf1dgnu.s[25]++;

                  worker = worker.value;

                  workerMsg = (cov_2qyaf1dgnu.s[26]++, 'Worker ' + worker.id + ' generated ' + worker.routes + ' routes in ' + Math.round(worker.duration / 1E8) / 10 + 's');
                  cov_2qyaf1dgnu.s[27]++;

                  if (worker.errors > 0) {
                    cov_2qyaf1dgnu.b[6][0]++;
                    cov_2qyaf1dgnu.s[28]++;

                    workerMsg += ' with ' + worker.errors + ' error(s)';
                  } else {
                    cov_2qyaf1dgnu.b[6][1]++;
                  }
                  cov_2qyaf1dgnu.s[29]++;
                  debug$2(workerMsg);
                }

                cov_2qyaf1dgnu.s[30]++;
                _context6.next = 8;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'done', this).call(this);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function done() {
        return _ref8.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var i, worker;
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cov_2qyaf1dgnu.f[7]++;
                cov_2qyaf1dgnu.s[31]++;
                _context7.next = 4;
                return this.watchdog.countAlive();

              case 4:
                i = _context7.sent;

              case 5:
                if (!(i < this.workerCount)) {
                  _context7.next = 20;
                  break;
                }

                cov_2qyaf1dgnu.s[32]++;

                this.lastWorkerId++;
                worker = (cov_2qyaf1dgnu.s[33]++, new Worker$3(this.options, this.lastWorkerId));
                cov_2qyaf1dgnu.s[34]++;

                this.workers.push(worker);
                cov_2qyaf1dgnu.s[35]++;
                this.watchdog.addWorker(worker.id);

                cov_2qyaf1dgnu.s[36]++;
                worker.run();
                cov_2qyaf1dgnu.s[37]++;
                debug$2('Worker ' + worker.id + ' started');

              case 17:
                i++;
                _context7.next = 5;
                break;

              case 20:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startWorkers() {
        return _ref9.apply(this, arguments);
      }

      return startWorkers;
    }()
  }, {
    key: 'onExit',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker) {
        var workerId, message, allDead;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                cov_2qyaf1dgnu.f[8]++;
                workerId = (cov_2qyaf1dgnu.s[38]++, worker.id);
                cov_2qyaf1dgnu.s[39]++;


                this.watchdog.exitWorker(workerId);
                cov_2qyaf1dgnu.s[40]++;
                lodash.pull(this.workers, worker);

                message = (cov_2qyaf1dgnu.s[41]++, 'Worker ' + workerId + ' exited');
                cov_2qyaf1dgnu.s[42]++;

                debug$2(message);

                cov_2qyaf1dgnu.s[43]++;
                _context8.next = 12;
                return this.watchdog.allDead();

              case 12:
                allDead = _context8.sent;
                cov_2qyaf1dgnu.s[44]++;

                if (!allDead) {
                  _context8.next = 21;
                  break;
                }

                cov_2qyaf1dgnu.b[7][0]++;
                cov_2qyaf1dgnu.s[45]++;
                _context8.next = 19;
                return this.done();

              case 19:
                _context8.next = 22;
                break;

              case 21:
                cov_2qyaf1dgnu.b[7][1]++;

              case 22:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onExit(_x8) {
        return _ref10.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}((Hookable(Messaging$1(Master))));

var cov_4zkynsb9d = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/single/worker.js',
      hash = 'c95614b85301ed7c3233ebdc82980582a8221af0',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/single/worker.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 14
        },
        end: {
          line: 6,
          column: 34
        }
      },
      '1': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 18
        }
      },
      '2': {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 18
        }
      },
      '3': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 66
        }
      },
      '4': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 18,
          column: 6
        }
      },
      '5': {
        start: {
          line: 17,
          column: 6
        },
        end: {
          line: 17,
          column: 56
        }
      },
      '6': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 21
        }
      },
      '7': {
        start: {
          line: 24,
          column: 4
        },
        end: {
          line: 24,
          column: 36
        }
      },
      '8': {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 41
        }
      },
      '9': {
        start: {
          line: 29,
          column: 19
        },
        end: {
          line: 29,
          column: 23
        }
      },
      '10': {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 30,
          column: 75
        }
      },
      '11': {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 36,
          column: 5
        }
      },
      '12': {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 49
        }
      },
      '13': {
        start: {
          line: 38,
          column: 4
        },
        end: {
          line: 50,
          column: 5
        }
      },
      '14': {
        start: {
          line: 39,
          column: 6
        },
        end: {
          line: 47,
          column: 8
        }
      },
      '15': {
        start: {
          line: 40,
          column: 8
        },
        end: {
          line: 40,
          column: 32
        }
      },
      '16': {
        start: {
          line: 42,
          column: 8
        },
        end: {
          line: 45,
          column: 9
        }
      },
      '17': {
        start: {
          line: 44,
          column: 10
        },
        end: {
          line: 44,
          column: 57
        }
      },
      '18': {
        start: {
          line: 46,
          column: 8
        },
        end: {
          line: 46,
          column: 20
        }
      },
      '19': {
        start: {
          line: 49,
          column: 6
        },
        end: {
          line: 49,
          column: 62
        }
      },
      '20': {
        start: {
          line: 52,
          column: 4
        },
        end: {
          line: 52,
          column: 41
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        },
        loc: {
          start: {
            line: 9,
            column: 27
          },
          end: {
            line: 19,
            column: 3
          }
        },
        line: 9
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 16,
            column: 54
          },
          end: {
            line: 16,
            column: 55
          }
        },
        loc: {
          start: {
            line: 16,
            column: 75
          },
          end: {
            line: 18,
            column: 5
          }
        },
        line: 16
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 21,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        loc: {
          start: {
            line: 21,
            column: 14
          },
          end: {
            line: 26,
            column: 3
          }
        },
        line: 21
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 28,
            column: 2
          },
          end: {
            line: 28,
            column: 3
          }
        },
        loc: {
          start: {
            line: 28,
            column: 29
          },
          end: {
            line: 53,
            column: 3
          }
        },
        line: 28
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 39,
            column: 26
          },
          end: {
            line: 39,
            column: 27
          }
        },
        loc: {
          start: {
            line: 39,
            column: 37
          },
          end: {
            line: 47,
            column: 7
          }
        },
        line: 39
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        }, {
          start: {
            line: 38,
            column: 4
          },
          end: {
            line: 50,
            column: 5
          }
        }],
        line: 38
      },
      '1': {
        loc: {
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 38,
            column: 31
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 38,
            column: 14
          }
        }, {
          start: {
            line: 38,
            column: 18
          },
          end: {
            line: 38,
            column: 31
          }
        }],
        line: 38
      },
      '2': {
        loc: {
          start: {
            line: 42,
            column: 8
          },
          end: {
            line: 45,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 42,
            column: 8
          },
          end: {
            line: 45,
            column: 9
          }
        }, {
          start: {
            line: 42,
            column: 8
          },
          end: {
            line: 45,
            column: 9
          }
        }],
        line: 42
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var debug$3 = (cov_4zkynsb9d.s[0]++, Debug('nuxt:worker'));

var Worker$3 = function (_ref) {
  inherits(Worker$$1, _ref);

  function Worker$$1(options, id) {
    classCallCheck(this, Worker$$1);
    cov_4zkynsb9d.f[0]++;
    cov_4zkynsb9d.s[1]++;

    var _this = possibleConstructorReturn(this, (Worker$$1.__proto__ || Object.getPrototypeOf(Worker$$1)).call(this, options));

    cov_4zkynsb9d.s[2]++;


    _this.setId(id);

    cov_4zkynsb9d.s[3]++;
    _this.hook(Commands.sendRoutes, _this.generateRoutes.bind(_this));

    cov_4zkynsb9d.s[4]++;
    _this.generator.nuxt.hook('generate:routeCreated', function (_ref2) {
      var route = _ref2.route,
          path = _ref2.path;
      cov_4zkynsb9d.f[1]++;
      cov_4zkynsb9d.s[5]++;

      debug$3('Worker ' + _this.id + ' generated file: ' + path);
    });
    return _this;
  }

  createClass(Worker$$1, [{
    key: 'run',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_4zkynsb9d.f[2]++;
                cov_4zkynsb9d.s[6]++;
                _context.next = 4;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'run', this).call(this);

              case 4:
                cov_4zkynsb9d.s[7]++;


                this.startListeningForMessages();
                cov_4zkynsb9d.s[8]++;
                this.sendCommand(Commands.sendRoutes);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        var _this2 = this;

        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_4zkynsb9d.f[3]++;
                routes = (cov_4zkynsb9d.s[9]++, args);
                cov_4zkynsb9d.s[10]++;

                debug$3('Worker ' + this.id + ' received ' + routes.length + ' routes from master');

                errors = void 0;
                cov_4zkynsb9d.s[11]++;
                _context2.prev = 6;
                cov_4zkynsb9d.s[12]++;
                _context2.next = 10;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'generateRoutes', this).call(this, routes);

              case 10:
                errors = _context2.sent;
                _context2.next = 15;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](6);

              case 15:
                cov_4zkynsb9d.s[13]++;


                if ((cov_4zkynsb9d.b[1][0]++, errors) && (cov_4zkynsb9d.b[1][1]++, errors.length)) {
                  cov_4zkynsb9d.b[0][0]++;
                  cov_4zkynsb9d.s[14]++;

                  errors = errors.map(function (error) {
                    cov_4zkynsb9d.f[4]++;
                    cov_4zkynsb9d.s[15]++;

                    error.workerId = _this2.id;

                    cov_4zkynsb9d.s[16]++;
                    if (error.type === 'unhandled') {
                      cov_4zkynsb9d.b[2][0]++;
                      cov_4zkynsb9d.s[17]++;

                      // convert error stack to a string already, we cant send a stack object to the master process
                      error.error = { stack: '' + error.error.stack };
                    } else {
                      cov_4zkynsb9d.b[2][1]++;
                    }
                    cov_4zkynsb9d.s[18]++;
                    return error;
                  });

                  cov_4zkynsb9d.s[19]++;
                  this.sendCommand(undefined, Commands.sendErrors, errors);
                } else {
                  cov_4zkynsb9d.b[0][1]++;
                }

                cov_4zkynsb9d.s[20]++;
                this.sendCommand(Commands.sendRoutes);

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 13]]);
      }));

      function generateRoutes(_x) {
        return _ref4.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}((Hookable(Messaging$1(Worker))));

var cov_2hthpa7bai = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/single/index.js',
      hash = '4089226863ae654ea71361c677887db0d61c5bd8',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/single/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();



var Single = Object.freeze({
	Master: Master$3,
	Worker: Worker$3,
	Mixins: index$2
});

var cov_2j34fbjas0 = function () {
  var path = '/var/www/projects.github/nuxt-generate-cluster/lib/index.js',
      hash = '8f6c32540579b4a9e957b6e4ae0ea1e4fbc534b1',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var index = Object.assign({}, Cluster, {
  Generate: Generate,
  Single: Single,
  Mixins: Object.assign({}, index$1, CommonMixins)
});

module.exports = index;
//# sourceMappingURL=generator.js.map
