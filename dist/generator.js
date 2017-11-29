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

var Hookable = (function (Base) {
  if (!Base) {
    Base = function Base() {
      classCallCheck(this, Base);
    };
  }

  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'initHooks',
      value: function initHooks() {
        if (!this._hooks) {
          this._hooks = {};
        }
      }
    }, {
      key: 'hook',
      value: function hook(name, fn) {
        /* istanbul ignore if */
        if (!name || typeof fn !== 'function') {
          return;
        }
        this.initHooks();

        this._hooks[name] = this._hooks[name] || [];
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
                  if (this.hasHooks(name)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:
                  // debug(`Call ${name} hooks (${this._hooks[name].length})`)
                  ret = [];
                  _context.prev = 3;
                  _context.t0 = ret;
                  _context.next = 7;
                  return nuxt.Utils.sequence(this._hooks[name], function (fn) {
                    return fn.apply(undefined, args);
                  });

                case 7:
                  _context.t1 = _context.sent;

                  _context.t0.push.call(_context.t0, _context.t1);

                  _context.next = 15;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t2 = _context['catch'](3);

                  console.error('> Error on hook "' + name + '":'); // eslint-disable-line no-console
                  console.error(_context.t2); // eslint-disable-line no-console

                case 15:
                  return _context.abrupt('return', ret.length === 1 ? ret[0] : ret);

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 11]]);
        }));

        function callHook(_x) {
          return _ref.apply(this, arguments);
        }

        return callHook;
      }()
    }, {
      key: 'hasHooks',
      value: function hasHooks(name) {
        return this._hooks && !!this._hooks[name];
      }
    }]);
    return _class;
  }(Base);
});



var CommonMixins = Object.freeze({
	Hookable: Hookable
});

var Watchdog = function (_Hookable) {
  inherits(Watchdog, _Hookable);

  function Watchdog() {
    classCallCheck(this, Watchdog);

    var _this = possibleConstructorReturn(this, (Watchdog.__proto__ || Object.getPrototypeOf(Watchdog)).call(this));

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
              workerIds = Object.keys(this.workers);
              i = 0;

            case 2:
              if (!(i < workerIds.length)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return this.workers[workerIds[i]];

            case 5:
              i++;
              _context.next = 2;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, iterator, this);
    })
  }, {
    key: 'addInfo',
    value: function addInfo(workerId, key, extraInfo) {
      if (arguments.length === 2) {
        extraInfo = key;
        key = undefined;
      }

      if (this.workers[workerId]) {
        if (key) {
          this.workers[workerId][key] = extraInfo;
        } else {
          this.workers[workerId] = Object.assign(this.workers[workerId], extraInfo || {});
        }
      }
    }
  }, {
    key: 'appendInfo',
    value: function appendInfo(workerId, key, extraInfo) {
      if (this.workers[workerId]) {
        var keyType = _typeof(this.workers[workerId][key]);

        if (keyType === 'undefined') {
          console.error('Key ' + key + ' is undefined for worker ' + workerId); // eslint-disable-line no-console
        } else if (keyType === 'string') {
          this.workers[workerId][key] += extraInfo;
        } else if (keyType === 'number') {
          this.workers[workerId][key] += parseInt(extraInfo);
        } else if (Array.isArray(this.workers[workerId][key])) {
          Array.prototype.push.apply(this.workers[workerId][key], extraInfo);
        } else if (keyType === 'object') {
          this.workers[workerId][key] = Object.assign(this.workers[workerId][key], extraInfo || {});
        }
      }
    }
  }, {
    key: 'addWorker',
    value: function addWorker(workerId, extraInfo) {
      if (typeof this.workers[workerId] !== 'undefined') {
        console.error('A worker with workerId ' + workerId + ' is already registered to the watchdog'); // eslint-disable-line no-console
      }

      this.workers[workerId] = Object.assign({
        id: workerId,
        start: process.hrtime(),
        duration: 0,
        signal: 0,
        code: 0,
        routes: 0,
        errors: 0
      }, extraInfo || {});
    }
  }, {
    key: 'exitWorker',
    value: function exitWorker(workerId, extraInfo) {
      if (this.workers[workerId]) {
        var duration = process.hrtime(this.workers[workerId].start);
        this.workers[workerId].duration = duration[0] * 1E9 + duration[1];

        if (extraInfo) {
          this.addInfo(workerId, extraInfo);
        }
      }
    }
  }, {
    key: 'countAlive',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var Iter, alive, worker, workerAlive;
        return regenerator.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Iter = this.iterator();
                alive = 0;
                worker = void 0;

              case 3:
                if (!((worker = Iter.next()) && !worker.done)) {
                  _context2.next = 11;
                  break;
                }

                if (!(typeof worker.value !== 'undefined')) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return this.callHook('isWorkerAlive', worker.value);

              case 7:
                workerAlive = _context2.sent;

                if (workerAlive) {
                  alive++;
                }

              case 9:
                _context2.next = 3;
                break;

              case 11:
                return _context2.abrupt('return', alive);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function countAlive() {
        return _ref.apply(this, arguments);
      }

      return countAlive;
    }()
  }, {
    key: 'allDead',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var Iter, worker, isDead;
        return regenerator.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                Iter = this.iterator();
                worker = void 0;

              case 2:
                if (!((worker = Iter.next()) && !worker.done)) {
                  _context3.next = 9;
                  break;
                }

                if (!(typeof worker.value !== 'undefined')) {
                  _context3.next = 7;
                  break;
                }

                // let isDead = await this.callHook('isWorkerDead', worker.value)
                isDead = this.workers[worker.value.id].duration > 0;

                if (isDead) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', false);

              case 7:
                _context3.next = 2;
                break;

              case 9:
                return _context3.abrupt('return', true);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function allDead() {
        return _ref2.apply(this, arguments);
      }

      return allDead;
    }()
  }]);
  return Watchdog;
}(Hookable());

var Master = function (_Hookable) {
  inherits(Master, _Hookable);

  function Master(options, _ref) {
    var workerCount = _ref.workerCount,
        workerConcurrency = _ref.workerConcurrency;
    classCallCheck(this, Master);

    var _this = possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

    _this.options = options;

    _this.watchdog = new Watchdog();
    _this.startTime = process.hrtime();

    var nuxt$$1 = new nuxt.Nuxt(options);
    var builder = new nuxt.Builder(nuxt$$1);
    _this.generator = new nuxt.Generator(nuxt$$1, builder);

    _this.workerCount = parseInt(workerCount) || parseInt(nuxt$$1.options.generate.workers) || require('os').cpus().length;
    _this.workerConcurrency = parseInt(workerConcurrency) || parseInt(nuxt$$1.options.generate.workerConcurrency) || 500;

    _this.routes = [];
    _this.errors = [];
    return _this;
  }

  createClass(Master, [{
    key: 'run',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            build = _ref3.build,
            params = _ref3.params;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!build) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return this.build();

              case 3:
                _context.next = 5;
                return this.callHook('built', params);

              case 5:
                _context.next = 9;
                break;

              case 7:
                _context.next = 9;
                return this.initiate();

              case 9:
                _context.next = 11;
                return this.getRoutes(params);

              case 11:
                _context.next = 13;
                return this.startWorkers();

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'initiate',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(build) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!build) build = false;
                _context2.next = 3;
                return this.generator.initiate({ build: build, init: build });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initiate(_x2) {
        return _ref4.apply(this, arguments);
      }

      return initiate;
    }()
  }, {
    key: 'build',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.initiate(true);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function build() {
        return _ref5.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(params) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.generator.initRoutes(params);

              case 3:
                routes = _context4.sent;

                if (routes.length) {
                  // add routes to any existing routes
                  Array.prototype.push.apply(this.routes, routes);
                  this.routes = lodash.uniq(this.routes);
                }
                return _context4.abrupt('return', true);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](0);

              case 10:
                return _context4.abrupt('return', false);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function getRoutes(_x3) {
        return _ref6.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'calculateBatchSize',
    value: function calculateBatchSize() {
      // Even the load between workers
      var workerConcurrency = this.workerConcurrency;
      if (this.routes.length < this.workerCount * this.workerConcurrency) {
        workerConcurrency = Math.ceil(this.routes.length / this.workerCount);
      }

      return workerConcurrency;
    }
  }, {
    key: 'getBatchRoutes',
    value: function getBatchRoutes() {
      var batchSize = this.calculateBatchSize();
      var routes = this.routes.splice(0, batchSize);

      return routes;
    }
  }, {
    key: 'done',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(workerInfo) {
        var duration, info;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.generator.afterGenerate();

              case 2:
                duration = process.hrtime(this.startTime);

                duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10;

                info = {
                  duration: duration,
                  errors: this.errors,
                  workerInfo: workerInfo
                };

                if (!(this.options.generate && typeof this.options.generate.done === 'function')) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 8;
                return this.options.generate.done(info);

              case 8:
                _context5.next = 10;
                return this.callHook('generate:done', info);

              case 10:

                this.errors = [];

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function done(_x4) {
        return _ref7.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.error('Should be implemented by a derived class'); // eslint-disable-line no-console
                return _context6.abrupt('return', false);

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function startWorkers() {
        return _ref8.apply(this, arguments);
      }

      return startWorkers;
    }()
  }]);
  return Master;
}(Hookable());

var Worker = function () {
  function Worker(options) {
    classCallCheck(this, Worker);

    this.options = options;
    this.id = -1;

    var nuxt$$1 = new nuxt.Nuxt(options);
    this.generator = new nuxt.Generator(nuxt$$1);
  }

  createClass(Worker, [{
    key: 'setId',
    value: function setId(id) {
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
                _context.next = 2;
                return this.generator.initiate({ build: false, init: false });

              case 2:
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
                errors = [];
                _context2.prev = 1;
                _context2.next = 4;
                return this.generator.generateRoutes(routes);

              case 4:
                errors = _context2.sent;
                _context2.next = 12;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](1);

                console.error('Worker ' + process.pid + ': Exception while generating routes, exiting'); // eslint-disable-line no-console
                console.error(_context2.t0); // eslint-disable-line no-console
                throw _context2.t0;

              case 12:
                return _context2.abrupt('return', errors);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function generateRoutes(_x) {
        return _ref2.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker;
}();



var Generate = Object.freeze({
	Commands: Commands,
	Watchdog: Watchdog,
	Master: Master,
	Worker: Worker
});

var Messaging = (function (Base) {
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'startListeningForMessages',
      value: function startListeningForMessages() {
        if (typeof this.__isListening === 'undefined') {
          this.__isListening = false;
        } else if (this.__isListening) {
          return;
        }

        if (cluster.isMaster) {
          cluster.on('message', this.receiveCommand.bind(this));
        } else {
          process.on('message', this.receiveCommand.bind(this));
        }
        this.__isListening = true;
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        if (typeof this._commandsArray === 'undefined') {
          this._commandsArray = lodash.values(Commands);
        }
        return cmd && lodash.indexOf(this._commandsArray, cmd) > -1;
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
                  if (_args.length === 2) {
                    handle = message;
                    message = worker;
                    worker = undefined;
                  } else if (_args.length === 1) {
                    message = worker;
                    worker = undefined;
                  }

                  cmd = message.cmd;

                  if (this.hasCommand(cmd)) {
                    _context.next = 6;
                    break;
                  }

                  console.error('Received unknown command $cmd'); // eslint-disable-line no-console
                  _context.next = 17;
                  break;

                case 6:
                  if (this.hasHooks(cmd)) {
                    _context.next = 10;
                    break;
                  }

                  console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
                  _context.next = 17;
                  break;

                case 10:
                  if (!worker) {
                    _context.next = 15;
                    break;
                  }

                  _context.next = 13;
                  return this.callHook(cmd, worker, message.args);

                case 13:
                  _context.next = 17;
                  break;

                case 15:
                  _context.next = 17;
                  return this.callHook(cmd, message.args);

                case 17:
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
        if (arguments.length === 1) {
          cmd = worker;
          worker = undefined;
        }

        if (!this.hasCommand(cmd)) {
          console.error('Trying to send unknown command ' + cmd); // eslint-disable-line no-console
          return;
        }

        var message = { cmd: cmd, args: args };

        if (worker) {
          worker.send(message);
        } else {
          process.send(message);
        }
      }
    }]);
    return _class;
  }(Base);
});



var index$1 = Object.freeze({
	Messaging: Messaging
});

var debug = Debug('nuxt:cluster-master');

var Master$1 = function (_Hookable) {
  inherits(Master$$1, _Hookable);

  function Master$$1(options) {
    var _this2 = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        workerCount = _ref.workerCount,
        workerConcurrency = _ref.workerConcurrency,
        setup = _ref.setup;

    classCallCheck(this, Master$$1);

    var _this = possibleConstructorReturn(this, (Master$$1.__proto__ || Object.getPrototypeOf(Master$$1)).call(this, options, { workerCount: workerCount, workerConcurrency: workerConcurrency }));

    if (setup) {
      cluster.setupMaster(setup);
    }
    cluster.on('fork', _this.onFork.bind(_this));
    cluster.on('exit', _this.onExit.bind(_this));

    _this.hook(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    _this.hook(Commands.sendErrors, _this.saveErrors.bind(_this));

    _this.watchdog.hook('isWorkerAlive', function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', typeof cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected());

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
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
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.startListeningForMessages();

              case 2:
                _context2.next = 4;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'run', this).call(this, args);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x3) {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var success;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug('Retrieving routes');

                _context3.next = 3;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'getRoutes', this).call(this, params);

              case 3:
                success = _context3.sent;


                if (success) {
                  debug('A total of ' + this.routes.length + ' routes will be generated');
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoutes(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(worker) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                routes = this.getBatchRoutes();


                if (!routes.length) {
                  debug('No more routes, exiting worker ' + worker.id);

                  worker.disconnect();
                } else {
                  debug('Sending ' + routes.length + ' routes to worker ' + worker.id);

                  this.watchdog.appendInfo(worker.id, 'routes', routes.length);
                  this.sendCommand(worker, Commands.sendRoutes, routes);
                }

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendRoutes(_x5) {
        return _ref5.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(worker, args) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (typeof args !== 'undefined' && args.length) {
                  Array.prototype.push.apply(this.errors, args);
                  this.watchdog.appendInfo(worker.id, 'errors', args.length);
                }

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveErrors(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'done',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var Iter, worker, workerMsg;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                Iter = this.watchdog.iterator();
                worker = void 0;

                while ((worker = Iter.next()) && !worker.done) {
                  worker = worker.value;

                  workerMsg = 'Worker ' + worker.id + ' generated ' + worker.routes + ' routes in ' + Math.round(worker.duration / 1E8) / 10 + 's';

                  if (worker.errors > 0) {
                    workerMsg += ' with ' + worker.errors + ' error(s)';
                  }
                  debug(workerMsg);
                }

                _context6.next = 5;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'done', this).call(this);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function done() {
        return _ref7.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var i;
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.watchdog.countAlive();

              case 2:
                i = _context7.sent;

              case 3:
                if (!(i < this.workerCount)) {
                  _context7.next = 8;
                  break;
                }

                cluster.fork({ options: JSON.stringify(this.options) });

              case 5:
                i++;
                _context7.next = 3;
                break;

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startWorkers() {
        return _ref8.apply(this, arguments);
      }

      return startWorkers;
    }()
  }, {
    key: 'onFork',
    value: function onFork(worker) {
      var pid = worker.process.pid;
      debug('Worker ' + worker.id + ' started with pid ' + pid);

      this.watchdog.addWorker(worker.id, { pid: pid });
    }
  }, {
    key: 'onExit',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker, code, signal) {
        var workerId, message, allDead;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                workerId = worker.id;


                this.watchdog.exitWorker(workerId, { code: code, signal: signal });

                message = 'Worker ' + workerId + ' exited';
                /* istanbul ignore if */

                if (code !== 0) {
                  message += ' with status code ' + code;
                }
                /* istanbul ignore if */
                if (signal) {
                  message += ' by signal ' + signal;
                }
                debug(message);

                _context8.next = 8;
                return this.watchdog.allDead();

              case 8:
                allDead = _context8.sent;

                if (!allDead) {
                  _context8.next = 12;
                  break;
                }

                _context8.next = 12;
                return this.done();

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onExit(_x8, _x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}(Hookable(Messaging(Master)));

var debug$1 = Debug('nuxt:cluster-worker');

var Worker$1 = function (_Hookable) {
  inherits(Worker$$1, _Hookable);

  function Worker$$1(options) {
    classCallCheck(this, Worker$$1);

    /* istanbul ignore if */
    var _this = possibleConstructorReturn(this, (Worker$$1.__proto__ || Object.getPrototypeOf(Worker$$1)).call(this, options));

    if (cluster.isWorker) {
      _this.setId(cluster.worker.id);
    }

    _this.generator.nuxt.hook('generate:routeCreated', function (_ref) {
      var route = _ref.route,
          path = _ref.path;

      debug$1('Worker ' + _this.id + ' generated file: ' + path);
    });

    _this.hook(Commands.sendRoutes, _this.generateRoutes.bind(_this));
    return _this;
  }

  createClass(Worker$$1, [{
    key: 'run',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'run', this).call(this);

              case 2:

                this.startListeningForMessages();
                this.sendCommand(Commands.sendRoutes);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        var _this2 = this;

        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                routes = args;

                debug$1('Worker ' + this.id + ' received ' + routes.length + ' routes from master');

                errors = void 0;
                _context2.prev = 3;
                _context2.next = 6;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'generateRoutes', this).call(this, routes);

              case 6:
                errors = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](3);

                /* istanbul ignore next */
                if (cluster.isWorker) {
                  process.exit(1);
                }

              case 12:

                if (errors && errors.length) {
                  errors = errors.map(function (error) {
                    error.workerId = _this2.id;

                    if (error.type === 'unhandled') {
                      // convert error stack to a string already, we cant send a stack object to the master process
                      error.error = { stack: '' + error.error.stack };
                    }
                    return error;
                  });

                  this.sendCommand(undefined, Commands.sendErrors, errors);
                }

                this.sendCommand(Commands.sendRoutes);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      function generateRoutes(_x) {
        return _ref3.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}(Hookable(Messaging(Worker)));



var Cluster = Object.freeze({
	Master: Master$1,
	Worker: Worker$1,
	Mixins: index$1
});

var master = null;

var Messaging$1 = (function (Base) {
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'startListeningForMessages',
      value: function startListeningForMessages() {
        if (typeof this.__isListening === 'undefined') {
          this.__isListening = false;
        } else /* istanbul ignore next */if (this.__isListening) {
            return;
          }

        if (typeof this.workers !== 'undefined') {
          master = this;
        }
        this.__isListening = true;
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        if (typeof this._commandsArray === 'undefined') {
          this._commandsArray = lodash.values(Commands);
        }
        return cmd && lodash.indexOf(this._commandsArray, cmd) > -1;
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
                  cmd = message.cmd;

                  if (this.hasCommand(cmd)) {
                    _context.next = 5;
                    break;
                  }

                  console.error('Received unknown command ' + cmd); // eslint-disable-line no-console
                  _context.next = 16;
                  break;

                case 5:
                  if (this.hasHooks(cmd)) {
                    _context.next = 9;
                    break;
                  }

                  console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
                  _context.next = 16;
                  break;

                case 9:
                  if (!worker) {
                    _context.next = 14;
                    break;
                  }

                  _context.next = 12;
                  return this.callHook(cmd, worker, message.args);

                case 12:
                  _context.next = 16;
                  break;

                case 14:
                  _context.next = 16;
                  return this.callHook(cmd, message.args);

                case 16:
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
        if (arguments.length === 1) {
          cmd = worker;
          worker = undefined;
        }

        if (!this.hasCommand(cmd)) {
          console.error('Trying to send unknown command ' + cmd); // eslint-disable-line no-console
          return;
        }

        var message = { cmd: cmd, args: args };

        if (worker) {
          worker.receiveCommand(undefined, message);
        } else {
          master.receiveCommand(this, message);
        }
      }
    }]);
    return _class;
  }(Base);
});



var index$2 = Object.freeze({
	Messaging: Messaging$1
});

var debug$2 = Debug('nuxt:master');

var Master$3 = function (_Hookable) {
  inherits(Master$$1, _Hookable);

  function Master$$1(options) {
    var _this2 = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        workerCount = _ref.workerCount,
        workerConcurrency = _ref.workerConcurrency,
        setup = _ref.setup;

    classCallCheck(this, Master$$1);

    var _this = possibleConstructorReturn(this, (Master$$1.__proto__ || Object.getPrototypeOf(Master$$1)).call(this, options, { workerCount: workerCount, workerConcurrency: workerConcurrency }));

    _this.workers = [];
    _this.lastWorkerId = 0;

    _this.hook(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    _this.hook(Commands.sendErrors, _this.saveErrors.bind(_this));

    _this.watchdog.hook('isWorkerAlive', function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(worker) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', typeof _this.workers[worker.id] !== 'undefined');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    return _this;
  }

  createClass(Master$$1, [{
    key: 'run',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.startListeningForMessages();

              case 2:
                _context2.next = 4;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'run', this).call(this, args);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x3) {
        return _ref3.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var success;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug$2('Retrieving routes');

                _context3.next = 3;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'getRoutes', this).call(this, params);

              case 3:
                success = _context3.sent;


                if (success) {
                  debug$2('A total of ' + this.routes.length + ' routes will be generated');
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoutes(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(worker) {
        var routes;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                routes = this.getBatchRoutes();


                if (!routes.length) {
                  debug$2('No more routes, exiting worker ' + worker.id);

                  this.onExit(worker);
                } else {
                  debug$2('Sending ' + routes.length + ' routes to worker ' + worker.id);

                  this.watchdog.appendInfo(worker.id, 'routes', routes.length);
                  this.sendCommand(worker, Commands.sendRoutes, routes);
                }

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendRoutes(_x5) {
        return _ref5.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(worker, args) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (typeof args !== 'undefined' && args.length) {
                  Array.prototype.push.apply(this.errors, args);
                  this.watchdog.appendInfo(worker.id, 'errors', args.length);
                }

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveErrors(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'done',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var Iter, worker, workerMsg;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                Iter = this.watchdog.iterator();
                worker = void 0;

                while ((worker = Iter.next()) && !worker.done) {
                  worker = worker.value;

                  workerMsg = 'Worker ' + worker.id + ' generated ' + worker.routes + ' routes in ' + Math.round(worker.duration / 1E8) / 10 + 's';

                  if (worker.errors > 0) {
                    workerMsg += ' with ' + worker.errors + ' error(s)';
                  }
                  debug$2(workerMsg);
                }

                _context6.next = 5;
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'done', this).call(this);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function done() {
        return _ref7.apply(this, arguments);
      }

      return done;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var i, worker;
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.watchdog.countAlive();

              case 2:
                i = _context7.sent;

              case 3:
                if (!(i < this.workerCount)) {
                  _context7.next = 13;
                  break;
                }

                this.lastWorkerId++;
                worker = new Worker$3(this.options, this.lastWorkerId);

                this.workers.push(worker);
                this.watchdog.addWorker(worker.id);

                worker.run();
                debug$2('Worker ' + worker.id + ' started');

              case 10:
                i++;
                _context7.next = 3;
                break;

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startWorkers() {
        return _ref8.apply(this, arguments);
      }

      return startWorkers;
    }()
  }, {
    key: 'onExit',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker) {
        var workerId, message, allDead;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                workerId = worker.id;


                this.watchdog.exitWorker(workerId);
                lodash.pull(this.workers, worker);

                message = 'Worker ' + workerId + ' exited';

                debug$2(message);

                _context8.next = 7;
                return this.watchdog.allDead();

              case 7:
                allDead = _context8.sent;

                if (!allDead) {
                  _context8.next = 11;
                  break;
                }

                _context8.next = 11;
                return this.done();

              case 11:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onExit(_x8) {
        return _ref9.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}(Hookable(Messaging$1(Master)));

var debug$3 = Debug('nuxt:worker');

var Worker$3 = function (_Hookable) {
  inherits(Worker$$1, _Hookable);

  function Worker$$1(options, id) {
    classCallCheck(this, Worker$$1);

    var _this = possibleConstructorReturn(this, (Worker$$1.__proto__ || Object.getPrototypeOf(Worker$$1)).call(this, options));

    _this.setId(id);

    _this.hook(Commands.sendRoutes, _this.generateRoutes.bind(_this));

    _this.generator.nuxt.hook('generate:routeCreated', function (_ref) {
      var route = _ref.route,
          path = _ref.path;

      debug$3('Worker ' + _this.id + ' generated file: ' + path);
    });
    return _this;
  }

  createClass(Worker$$1, [{
    key: 'run',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'run', this).call(this);

              case 2:

                this.startListeningForMessages();
                this.sendCommand(Commands.sendRoutes);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        var _this2 = this;

        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                routes = args;

                debug$3('Worker ' + this.id + ' received ' + routes.length + ' routes from master');

                errors = void 0;
                _context2.prev = 3;
                _context2.next = 6;
                return get(Worker$$1.prototype.__proto__ || Object.getPrototypeOf(Worker$$1.prototype), 'generateRoutes', this).call(this, routes);

              case 6:
                errors = _context2.sent;
                _context2.next = 11;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](3);

              case 11:

                if (errors && errors.length) {
                  errors = errors.map(function (error) {
                    error.workerId = _this2.id;

                    if (error.type === 'unhandled') {
                      // convert error stack to a string already, we cant send a stack object to the master process
                      error.error = { stack: '' + error.error.stack };
                    }
                    return error;
                  });

                  this.sendCommand(undefined, Commands.sendErrors, errors);
                }

                this.sendCommand(Commands.sendRoutes);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      function generateRoutes(_x) {
        return _ref3.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}(Hookable(Messaging$1(Worker)));



var Single = Object.freeze({
	Master: Master$3,
	Worker: Worker$3,
	Mixins: index$2
});

var index = Object.assign({}, Cluster, {
  Generate: Generate,
  Single: Single,
  Mixins: Object.assign({}, index$1, CommonMixins)
});

module.exports = index;
//# sourceMappingURL=generator.js.map
