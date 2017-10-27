/*!
 * Nuxt-Generate-Cluster v1.0.0-rc11
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cluster = _interopDefault(require('cluster'));
var _ = require('lodash');
var ___default = _interopDefault(_);
var nuxt = require('nuxt');
var fsExtra = require('fs-extra');
var path = require('path');
var htmlMinifier = require('html-minifier');
var Tapable = _interopDefault(require('tappable'));
var Debug = _interopDefault(require('debug'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





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

  !function (global) {
    "use strict";

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
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
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
    function Generator() {}
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
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
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
    runtime.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve$$1, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve$$1, reject);
            }, function (err) {
              invoke("throw", err, resolve$$1, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
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
            resolve$$1(result);
          }, reject);
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve$$1, reject) {
            invoke(method, arg, resolve$$1, reject);
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
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
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
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
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
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

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
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
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

      if (!info) {
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
    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
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

    runtime.keys = function (object) {
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
          var i = -1,
              next = function next() {
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

      reset: function reset(skipTempReset) {
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
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function stop() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function dispatchException(exception) {
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

          return !!caught;
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

      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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

      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
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

      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function _catch(tryLoc) {
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

      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
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
  }(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  function () {
    return this;
  }() || Function("return this")());
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this;
}() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

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
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

var cov_ab3wyokk3 = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/commands.js',
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var Commands = {
  sendErrors: 'handleErrors',
  sendRoutes: 'requestRoutes'
};

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// using the polyfill specifically to avoid the call to `Object.defineProperty` for performance reasons
function fastFilter(fun /*, thisArg*/) {
	'use strict';

	if (this === void 0 || this === null) {
		throw new TypeError();
	}

	var t = Object(this);
	var len = t.length >>> 0;
	if (typeof fun !== 'function') {
		throw new TypeError();
	}

	var res = [];
	var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
	for (var i = 0; i < len; i++) {
		if (i in t) {
			var val = t[i];

			// NOTE: Technically this should Object.defineProperty at
			//       the next index, as push can be affected by
			//       properties on Object.prototype and Array.prototype.
			//       But that method's new, and collisions should be
			//       rare, so use the more-compatible alternative.
			if (fun.call(thisArg, val, i, t)) {
				res.push(val);
			}
		}
	}

	return res;
}

function Tapable$1() {
	this._plugins = {};
}
var Tapable_1 = Tapable$1;

function copyProperties(from, to) {
	for (var key in from) {
		to[key] = from[key];
	}return to;
}

Tapable$1.mixin = function mixinTapable(pt) {
	copyProperties(Tapable$1.prototype, pt);
};

Tapable$1.prototype.applyPlugins = function applyPlugins(name) {
	if (!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		plugins[i].apply(this, args);
	}
};

Tapable$1.prototype.applyPlugins0 = function applyPlugins0(name) {
	var plugins = this._plugins[name];
	if (!plugins) return;
	for (var i = 0; i < plugins.length; i++) {
		plugins[i].call(this);
	}
};

Tapable$1.prototype.applyPlugins1 = function applyPlugins1(name, param) {
	var plugins = this._plugins[name];
	if (!plugins) return;
	for (var i = 0; i < plugins.length; i++) {
		plugins[i].call(this, param);
	}
};

Tapable$1.prototype.applyPlugins2 = function applyPlugins2(name, param1, param2) {
	var plugins = this._plugins[name];
	if (!plugins) return;
	for (var i = 0; i < plugins.length; i++) {
		plugins[i].call(this, param1, param2);
	}
};

Tapable$1.prototype.applyPluginsWaterfall = function applyPluginsWaterfall(name, init) {
	if (!this._plugins[name]) return init;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	var current = init;
	for (var i = 0; i < plugins.length; i++) {
		args[0] = current;
		current = plugins[i].apply(this, args);
	}
	return current;
};

Tapable$1.prototype.applyPluginsWaterfall0 = function applyPluginsWaterfall0(name, init) {
	var plugins = this._plugins[name];
	if (!plugins) return init;
	var current = init;
	for (var i = 0; i < plugins.length; i++) {
		current = plugins[i].call(this, current);
	}return current;
};

Tapable$1.prototype.applyPluginsWaterfall1 = function applyPluginsWaterfall1(name, init, param) {
	var plugins = this._plugins[name];
	if (!plugins) return init;
	var current = init;
	for (var i = 0; i < plugins.length; i++) {
		current = plugins[i].call(this, current, param);
	}return current;
};

Tapable$1.prototype.applyPluginsWaterfall2 = function applyPluginsWaterfall2(name, init, param1, param2) {
	var plugins = this._plugins[name];
	if (!plugins) return init;
	var current = init;
	for (var i = 0; i < plugins.length; i++) {
		current = plugins[i].call(this, current, param1, param2);
	}return current;
};

Tapable$1.prototype.applyPluginsBailResult = function applyPluginsBailResult(name) {
	if (!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1);
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].apply(this, args);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsBailResult1 = function applyPluginsBailResult1(name, param) {
	if (!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsBailResult2 = function applyPluginsBailResult2(name, param1, param2) {
	if (!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsBailResult3 = function applyPluginsBailResult3(name, param1, param2, param3) {
	if (!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsBailResult4 = function applyPluginsBailResult4(name, param1, param2, param3, param4) {
	if (!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3, param4);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsBailResult5 = function applyPluginsBailResult5(name, param1, param2, param3, param4, param5) {
	if (!this._plugins[name]) return;
	var plugins = this._plugins[name];
	for (var i = 0; i < plugins.length; i++) {
		var result = plugins[i].call(this, param1, param2, param3, param4, param5);
		if (typeof result !== "undefined") {
			return result;
		}
	}
};

Tapable$1.prototype.applyPluginsAsyncSeries = Tapable$1.prototype.applyPluginsAsync = function applyPluginsAsyncSeries(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	var plugins = this._plugins[name];
	if (!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	args.push(copyProperties(callback, function next(err) {
		if (err) return callback(err);
		i++;
		if (i >= plugins.length) {
			return callback();
		}
		plugins[i].apply(_this, args);
	}));
	plugins[0].apply(this, args);
};

Tapable$1.prototype.applyPluginsAsyncSeries1 = function applyPluginsAsyncSeries1(name, param, callback) {
	var plugins = this._plugins[name];
	if (!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	var innerCallback = copyProperties(callback, function next(err) {
		if (err) return callback(err);
		i++;
		if (i >= plugins.length) {
			return callback();
		}
		plugins[i].call(_this, param, innerCallback);
	});
	plugins[0].call(this, param, innerCallback);
};

Tapable$1.prototype.applyPluginsAsyncSeriesBailResult = function applyPluginsAsyncSeriesBailResult(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	if (!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var i = 0;
	var _this = this;
	args.push(copyProperties(callback, function next() {
		if (arguments.length > 0) return callback.apply(null, arguments);
		i++;
		if (i >= plugins.length) {
			return callback();
		}
		plugins[i].apply(_this, args);
	}));
	plugins[0].apply(this, args);
};

Tapable$1.prototype.applyPluginsAsyncSeriesBailResult1 = function applyPluginsAsyncSeriesBailResult1(name, param, callback) {
	var plugins = this._plugins[name];
	if (!plugins || plugins.length === 0) return callback();
	var i = 0;
	var _this = this;
	var innerCallback = copyProperties(callback, function next(err, result) {
		if (arguments.length > 0) return callback(err, result);
		i++;
		if (i >= plugins.length) {
			return callback();
		}
		plugins[i].call(_this, param, innerCallback);
	});
	plugins[0].call(this, param, innerCallback);
};

Tapable$1.prototype.applyPluginsAsyncWaterfall = function applyPluginsAsyncWaterfall(name, init, callback) {
	if (!this._plugins[name] || this._plugins[name].length === 0) return callback(null, init);
	var plugins = this._plugins[name];
	var i = 0;
	var _this = this;
	var next = copyProperties(callback, function (err, value) {
		if (err) return callback(err);
		i++;
		if (i >= plugins.length) {
			return callback(null, value);
		}
		plugins[i].call(_this, value, next);
	});
	plugins[0].call(this, init, next);
};

Tapable$1.prototype.applyPluginsParallel = function applyPluginsParallel(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop();
	if (!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var remaining = plugins.length;
	args.push(copyProperties(callback, function (err) {
		if (remaining < 0) return; // ignore
		if (err) {
			remaining = -1;
			return callback(err);
		}
		remaining--;
		if (remaining === 0) {
			return callback();
		}
	}));
	for (var i = 0; i < plugins.length; i++) {
		plugins[i].apply(this, args);
		if (remaining < 0) return;
	}
};

Tapable$1.prototype.applyPluginsParallelBailResult = function applyPluginsParallelBailResult(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args[args.length - 1];
	if (!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var currentPos = plugins.length;
	var currentResult;
	var done = [];
	for (var i = 0; i < plugins.length; i++) {
		args[args.length - 1] = function (i) {
			return copyProperties(callback, function () {
				if (i >= currentPos) return; // ignore
				done.push(i);
				if (arguments.length > 0) {
					currentPos = i + 1;
					done = fastFilter.call(done, function (item) {
						return item <= i;
					});
					currentResult = Array.prototype.slice.call(arguments);
				}
				if (done.length === currentPos) {
					callback.apply(null, currentResult);
					currentPos = 0;
				}
			});
		}(i);
		plugins[i].apply(this, args);
	}
};

Tapable$1.prototype.applyPluginsParallelBailResult1 = function applyPluginsParallelBailResult1(name, param, callback) {
	var plugins = this._plugins[name];
	if (!plugins || plugins.length === 0) return callback();
	var currentPos = plugins.length;
	var currentResult;
	var done = [];
	for (var i = 0; i < plugins.length; i++) {
		var innerCallback = function (i) {
			return copyProperties(callback, function () {
				if (i >= currentPos) return; // ignore
				done.push(i);
				if (arguments.length > 0) {
					currentPos = i + 1;
					done = fastFilter.call(done, function (item) {
						return item <= i;
					});
					currentResult = Array.prototype.slice.call(arguments);
				}
				if (done.length === currentPos) {
					callback.apply(null, currentResult);
					currentPos = 0;
				}
			});
		}(i);
		plugins[i].call(this, param, innerCallback);
	}
};

Tapable$1.prototype.hasPlugins = function hasPlugins(name) {
	var plugins = this._plugins[name];
	return plugins && plugins.length > 0;
};

Tapable$1.prototype.plugin = function plugin(name, fn) {
	if (Array.isArray(name)) {
		name.forEach(function (name) {
			this.plugin(name, fn);
		}, this);
		return;
	}
	if (!this._plugins[name]) this._plugins[name] = [fn];else this._plugins[name].push(fn);
};

Tapable$1.prototype.apply = function apply() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].apply(this);
	}
};

var cov_zhx9j8a1s = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/watchdog.js',
      hash = '38abbc4faeb7f6ba01a34199511c0399422d2e26',
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
          column: 101
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
            column: 17
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
            column: 15
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
            column: 37
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
            column: 40
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
            column: 34
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
            column: 35
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
            column: 22
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
            column: 19
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
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
                return this.applyPluginsWaterfall('isWorkerAlive', { worker: worker.value });

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

                // let isDead = await this.applyPluginsWaterfall('isWorkerDead', { worker: worker.value })
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
}((Tapable_1));

var cov_2cn56rfobd = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/builder/generator.js',
      hash = '6f633afc7b281a2cd3b08df621697af9933d9ef1',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/builder/generator.js',
    statementMap: {
      '0': {
        start: {
          line: 9,
          column: 14
        },
        end: {
          line: 9,
          column: 36
        }
      },
      '1': {
        start: {
          line: 10,
          column: 55
        },
        end: {
          line: 10,
          column: 60
        }
      },
      '2': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 11
        }
      },
      '3': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 20
        }
      },
      '4': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 31
        }
      },
      '5': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 26
        }
      },
      '6': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 62
        }
      },
      '7': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 62
        }
      },
      '8': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 76
        }
      },
      '9': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 120
        }
      },
      '10': {
        start: {
          line: 27,
          column: 14
        },
        end: {
          line: 27,
          column: 24
        }
      },
      '11': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 53
        }
      },
      '12': {
        start: {
          line: 31,
          column: 19
        },
        end: {
          line: 31,
          column: 42
        }
      },
      '13': {
        start: {
          line: 33,
          column: 19
        },
        end: {
          line: 33,
          column: 52
        }
      },
      '14': {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 29
        }
      },
      '15': {
        start: {
          line: 36,
          column: 21
        },
        end: {
          line: 36,
          column: 60
        }
      },
      '16': {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 38
        }
      },
      '17': {
        start: {
          line: 39,
          column: 4
        },
        end: {
          line: 39,
          column: 31
        }
      },
      '18': {
        start: {
          line: 43,
          column: 4
        },
        end: {
          line: 43,
          column: 49
        }
      },
      '19': {
        start: {
          line: 45,
          column: 4
        },
        end: {
          line: 55,
          column: 5
        }
      },
      '20': {
        start: {
          line: 46,
          column: 21
        },
        end: {
          line: 53,
          column: 8
        }
      },
      '21': {
        start: {
          line: 48,
          column: 8
        },
        end: {
          line: 52,
          column: 9
        }
      },
      '22': {
        start: {
          line: 51,
          column: 10
        },
        end: {
          line: 51,
          column: 80
        }
      },
      '23': {
        start: {
          line: 54,
          column: 6
        },
        end: {
          line: 54,
          column: 70
        }
      },
      '24': {
        start: {
          line: 60,
          column: 4
        },
        end: {
          line: 62,
          column: 5
        }
      },
      '25': {
        start: {
          line: 61,
          column: 6
        },
        end: {
          line: 61,
          column: 32
        }
      },
      '26': {
        start: {
          line: 65,
          column: 4
        },
        end: {
          line: 65,
          column: 27
        }
      },
      '27': {
        start: {
          line: 68,
          column: 4
        },
        end: {
          line: 70,
          column: 5
        }
      },
      '28': {
        start: {
          line: 69,
          column: 6
        },
        end: {
          line: 69,
          column: 32
        }
      },
      '29': {
        start: {
          line: 72,
          column: 4
        },
        end: {
          line: 72,
          column: 56
        }
      },
      '30': {
        start: {
          line: 75,
          column: 4
        },
        end: {
          line: 77,
          column: 5
        }
      },
      '31': {
        start: {
          line: 76,
          column: 6
        },
        end: {
          line: 76,
          column: 27
        }
      },
      '32': {
        start: {
          line: 82,
          column: 25
        },
        end: {
          line: 82,
          column: 27
        }
      },
      '33': {
        start: {
          line: 83,
          column: 4
        },
        end: {
          line: 104,
          column: 5
        }
      },
      '34': {
        start: {
          line: 84,
          column: 6
        },
        end: {
          line: 103,
          column: 7
        }
      },
      '35': {
        start: {
          line: 86,
          column: 8
        },
        end: {
          line: 97,
          column: 10
        }
      },
      '36': {
        start: {
          line: 87,
          column: 10
        },
        end: {
          line: 96,
          column: 11
        }
      },
      '37': {
        start: {
          line: 88,
          column: 28
        },
        end: {
          line: 88,
          column: 74
        }
      },
      '38': {
        start: {
          line: 89,
          column: 12
        },
        end: {
          line: 93,
          column: 13
        }
      },
      '39': {
        start: {
          line: 90,
          column: 14
        },
        end: {
          line: 90,
          column: 103
        }
      },
      '40': {
        start: {
          line: 90,
          column: 48
        },
        end: {
          line: 90,
          column: 70
        }
      },
      '41': {
        start: {
          line: 90,
          column: 89
        },
        end: {
          line: 90,
          column: 100
        }
      },
      '42': {
        start: {
          line: 92,
          column: 14
        },
        end: {
          line: 92,
          column: 44
        }
      },
      '43': {
        start: {
          line: 95,
          column: 12
        },
        end: {
          line: 95,
          column: 69
        }
      },
      '44': {
        start: {
          line: 98,
          column: 8
        },
        end: {
          line: 98,
          column: 91
        }
      },
      '45': {
        start: {
          line: 100,
          column: 8
        },
        end: {
          line: 100,
          column: 49
        }
      },
      '46': {
        start: {
          line: 101,
          column: 8
        },
        end: {
          line: 101,
          column: 24
        }
      },
      '47': {
        start: {
          line: 102,
          column: 8
        },
        end: {
          line: 102,
          column: 15
        }
      },
      '48': {
        start: {
          line: 107,
          column: 17
        },
        end: {
          line: 107,
          column: 103
        }
      },
      '49': {
        start: {
          line: 108,
          column: 4
        },
        end: {
          line: 108,
          column: 62
        }
      },
      '50': {
        start: {
          line: 110,
          column: 4
        },
        end: {
          line: 110,
          column: 17
        }
      },
      '51': {
        start: {
          line: 114,
          column: 17
        },
        end: {
          line: 114,
          column: 19
        }
      },
      '52': {
        start: {
          line: 116,
          column: 4
        },
        end: {
          line: 116,
          column: 71
        }
      },
      '53': {
        start: {
          line: 119,
          column: 4
        },
        end: {
          line: 125,
          column: 5
        }
      },
      '54': {
        start: {
          line: 120,
          column: 14
        },
        end: {
          line: 120,
          column: 15
        }
      },
      '55': {
        start: {
          line: 121,
          column: 6
        },
        end: {
          line: 124,
          column: 9
        }
      },
      '56': {
        start: {
          line: 122,
          column: 8
        },
        end: {
          line: 122,
          column: 59
        }
      },
      '57': {
        start: {
          line: 123,
          column: 8
        },
        end: {
          line: 123,
          column: 60
        }
      },
      '58': {
        start: {
          line: 127,
          column: 4
        },
        end: {
          line: 127,
          column: 51
        }
      },
      '59': {
        start: {
          line: 129,
          column: 4
        },
        end: {
          line: 129,
          column: 17
        }
      },
      '60': {
        start: {
          line: 133,
          column: 22
        },
        end: {
          line: 133,
          column: 55
        }
      },
      '61': {
        start: {
          line: 134,
          column: 4
        },
        end: {
          line: 141,
          column: 5
        }
      },
      '62': {
        start: {
          line: 137,
          column: 23
        },
        end: {
          line: 137,
          column: 54
        }
      },
      '63': {
        start: {
          line: 138,
          column: 6
        },
        end: {
          line: 140,
          column: 7
        }
      },
      '64': {
        start: {
          line: 139,
          column: 8
        },
        end: {
          line: 139,
          column: 39
        }
      },
      '65': {
        start: {
          line: 146,
          column: 4
        },
        end: {
          line: 146,
          column: 31
        }
      },
      '66': {
        start: {
          line: 147,
          column: 4
        },
        end: {
          line: 147,
          column: 39
        }
      },
      '67': {
        start: {
          line: 151,
          column: 4
        },
        end: {
          line: 153,
          column: 5
        }
      },
      '68': {
        start: {
          line: 154,
          column: 4
        },
        end: {
          line: 154,
          column: 52
        }
      },
      '69': {
        start: {
          line: 158,
          column: 25
        },
        end: {
          line: 158,
          column: 60
        }
      },
      '70': {
        start: {
          line: 159,
          column: 4
        },
        end: {
          line: 159,
          column: 31
        }
      },
      '71': {
        start: {
          line: 162,
          column: 23
        },
        end: {
          line: 167,
          column: 51
        }
      },
      '72': {
        start: {
          line: 167,
          column: 18
        },
        end: {
          line: 167,
          column: 50
        }
      },
      '73': {
        start: {
          line: 169,
          column: 4
        },
        end: {
          line: 173,
          column: 6
        }
      },
      '74': {
        start: {
          line: 170,
          column: 6
        },
        end: {
          line: 172,
          column: 7
        }
      },
      '75': {
        start: {
          line: 171,
          column: 8
        },
        end: {
          line: 171,
          column: 24
        }
      },
      '76': {
        start: {
          line: 175,
          column: 4
        },
        end: {
          line: 175,
          column: 40
        }
      },
      '77': {
        start: {
          line: 179,
          column: 19
        },
        end: {
          line: 179,
          column: 21
        }
      },
      '78': {
        start: {
          line: 181,
          column: 4
        },
        end: {
          line: 186,
          column: 6
        }
      },
      '79': {
        start: {
          line: 182,
          column: 6
        },
        end: {
          line: 185,
          column: 7
        }
      },
      '80': {
        start: {
          line: 188,
          column: 4
        },
        end: {
          line: 195,
          column: 6
        }
      },
      '81': {
        start: {
          line: 190,
          column: 19
        },
        end: {
          line: 190,
          column: 58
        }
      },
      '82': {
        start: {
          line: 191,
          column: 6
        },
        end: {
          line: 194,
          column: 7
        }
      },
      '83': {
        start: {
          line: 196,
          column: 4
        },
        end: {
          line: 196,
          column: 29
        }
      },
      '84': {
        start: {
          line: 202,
          column: 4
        },
        end: {
          line: 212,
          column: 5
        }
      },
      '85': {
        start: {
          line: 203,
          column: 18
        },
        end: {
          line: 203,
          column: 91
        }
      },
      '86': {
        start: {
          line: 205,
          column: 6
        },
        end: {
          line: 205,
          column: 21
        }
      },
      '87': {
        start: {
          line: 206,
          column: 6
        },
        end: {
          line: 208,
          column: 7
        }
      },
      '88': {
        start: {
          line: 207,
          column: 8
        },
        end: {
          line: 207,
          column: 65
        }
      },
      '89': {
        start: {
          line: 214,
          column: 4
        },
        end: {
          line: 221,
          column: 5
        }
      },
      '90': {
        start: {
          line: 215,
          column: 6
        },
        end: {
          line: 220,
          column: 7
        }
      },
      '91': {
        start: {
          line: 216,
          column: 8
        },
        end: {
          line: 216,
          column: 57
        }
      },
      '92': {
        start: {
          line: 223,
          column: 15
        },
        end: {
          line: 223,
          column: 45
        }
      },
      '93': {
        start: {
          line: 224,
          column: 4
        },
        end: {
          line: 224,
          column: 60
        }
      },
      '94': {
        start: {
          line: 226,
          column: 21
        },
        end: {
          line: 226,
          column: 46
        }
      },
      '95': {
        start: {
          line: 229,
          column: 4
        },
        end: {
          line: 229,
          column: 35
        }
      },
      '96': {
        start: {
          line: 230,
          column: 4
        },
        end: {
          line: 230,
          column: 43
        }
      },
      '97': {
        start: {
          line: 232,
          column: 4
        },
        end: {
          line: 232,
          column: 67
        }
      },
      '98': {
        start: {
          line: 234,
          column: 4
        },
        end: {
          line: 234,
          column: 15
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        loc: {
          start: {
            line: 13,
            column: 30
          },
          end: {
            line: 24,
            column: 3
          }
        },
        line: 13
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
            column: 54
          },
          end: {
            line: 40,
            column: 3
          }
        },
        line: 26
      },
      '2': {
        name: '(anonymous_2)',
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
            column: 33
          },
          end: {
            line: 56,
            column: 3
          }
        },
        line: 42
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 46,
            column: 32
          },
          end: {
            line: 46,
            column: 33
          }
        },
        loc: {
          start: {
            line: 46,
            column: 60
          },
          end: {
            line: 53,
            column: 7
          }
        },
        line: 46
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 58,
            column: 2
          },
          end: {
            line: 58,
            column: 3
          }
        },
        loc: {
          start: {
            line: 58,
            column: 54
          },
          end: {
            line: 78,
            column: 3
          }
        },
        line: 58
      },
      '5': {
        name: '(anonymous_5)',
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
            column: 28
          },
          end: {
            line: 111,
            column: 3
          }
        },
        line: 80
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 86,
            column: 46
          },
          end: {
            line: 86,
            column: 47
          }
        },
        loc: {
          start: {
            line: 86,
            column: 60
          },
          end: {
            line: 97,
            column: 9
          }
        },
        line: 86
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 90,
            column: 34
          },
          end: {
            line: 90,
            column: 35
          }
        },
        loc: {
          start: {
            line: 90,
            column: 46
          },
          end: {
            line: 90,
            column: 72
          }
        },
        line: 90
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 90,
            column: 80
          },
          end: {
            line: 90,
            column: 81
          }
        },
        loc: {
          start: {
            line: 90,
            column: 87
          },
          end: {
            line: 90,
            column: 102
          }
        },
        line: 90
      },
      '9': {
        name: '(anonymous_9)',
        decl: {
          start: {
            line: 113,
            column: 2
          },
          end: {
            line: 113,
            column: 3
          }
        },
        loc: {
          start: {
            line: 113,
            column: 32
          },
          end: {
            line: 130,
            column: 3
          }
        },
        line: 113
      },
      '10': {
        name: '(anonymous_10)',
        decl: {
          start: {
            line: 121,
            column: 80
          },
          end: {
            line: 121,
            column: 81
          }
        },
        loc: {
          start: {
            line: 121,
            column: 110
          },
          end: {
            line: 124,
            column: 7
          }
        },
        line: 121
      },
      '11': {
        name: '(anonymous_11)',
        decl: {
          start: {
            line: 132,
            column: 2
          },
          end: {
            line: 132,
            column: 3
          }
        },
        loc: {
          start: {
            line: 132,
            column: 24
          },
          end: {
            line: 142,
            column: 3
          }
        },
        line: 132
      },
      '12': {
        name: '(anonymous_12)',
        decl: {
          start: {
            line: 144,
            column: 2
          },
          end: {
            line: 144,
            column: 3
          }
        },
        loc: {
          start: {
            line: 144,
            column: 20
          },
          end: {
            line: 176,
            column: 3
          }
        },
        line: 144
      },
      '13': {
        name: '(anonymous_13)',
        decl: {
          start: {
            line: 167,
            column: 10
          },
          end: {
            line: 167,
            column: 11
          }
        },
        loc: {
          start: {
            line: 167,
            column: 18
          },
          end: {
            line: 167,
            column: 50
          }
        },
        line: 167
      },
      '14': {
        name: '(anonymous_14)',
        decl: {
          start: {
            line: 169,
            column: 23
          },
          end: {
            line: 169,
            column: 24
          }
        },
        loc: {
          start: {
            line: 169,
            column: 31
          },
          end: {
            line: 173,
            column: 5
          }
        },
        line: 169
      },
      '15': {
        name: '(anonymous_15)',
        decl: {
          start: {
            line: 178,
            column: 2
          },
          end: {
            line: 178,
            column: 3
          }
        },
        loc: {
          start: {
            line: 178,
            column: 48
          },
          end: {
            line: 197,
            column: 3
          }
        },
        line: 178
      },
      '16': {
        name: '(anonymous_16)',
        decl: {
          start: {
            line: 181,
            column: 19
          },
          end: {
            line: 181,
            column: 20
          }
        },
        loc: {
          start: {
            line: 181,
            column: 30
          },
          end: {
            line: 186,
            column: 5
          }
        },
        line: 181
      },
      '17': {
        name: '(anonymous_17)',
        decl: {
          start: {
            line: 188,
            column: 27
          },
          end: {
            line: 188,
            column: 28
          }
        },
        loc: {
          start: {
            line: 188,
            column: 38
          },
          end: {
            line: 195,
            column: 5
          }
        },
        line: 188
      },
      '18': {
        name: '(anonymous_18)',
        decl: {
          start: {
            line: 199,
            column: 2
          },
          end: {
            line: 199,
            column: 3
          }
        },
        loc: {
          start: {
            line: 199,
            column: 61
          },
          end: {
            line: 235,
            column: 3
          }
        },
        line: 199
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 23,
            column: 45
          },
          end: {
            line: 23,
            column: 118
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 23,
            column: 84
          },
          end: {
            line: 23,
            column: 86
          }
        }, {
          start: {
            line: 23,
            column: 89
          },
          end: {
            line: 23,
            column: 118
          }
        }],
        line: 23
      },
      '1': {
        loc: {
          start: {
            line: 26,
            column: 18
          },
          end: {
            line: 26,
            column: 52
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 26,
            column: 50
          },
          end: {
            line: 26,
            column: 52
          }
        }],
        line: 26
      },
      '2': {
        loc: {
          start: {
            line: 26,
            column: 20
          },
          end: {
            line: 26,
            column: 32
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 26,
            column: 28
          },
          end: {
            line: 26,
            column: 32
          }
        }],
        line: 26
      },
      '3': {
        loc: {
          start: {
            line: 26,
            column: 34
          },
          end: {
            line: 26,
            column: 45
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 26,
            column: 41
          },
          end: {
            line: 26,
            column: 45
          }
        }],
        line: 26
      },
      '4': {
        loc: {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 55,
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
            line: 55,
            column: 5
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 55,
            column: 5
          }
        }],
        line: 45
      },
      '5': {
        loc: {
          start: {
            line: 48,
            column: 8
          },
          end: {
            line: 52,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 48,
            column: 8
          },
          end: {
            line: 52,
            column: 9
          }
        }],
        line: 48
      },
      '6': {
        loc: {
          start: {
            line: 58,
            column: 18
          },
          end: {
            line: 58,
            column: 52
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 58,
            column: 50
          },
          end: {
            line: 58,
            column: 52
          }
        }],
        line: 58
      },
      '7': {
        loc: {
          start: {
            line: 58,
            column: 20
          },
          end: {
            line: 58,
            column: 32
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 58,
            column: 28
          },
          end: {
            line: 58,
            column: 32
          }
        }],
        line: 58
      },
      '8': {
        loc: {
          start: {
            line: 58,
            column: 34
          },
          end: {
            line: 58,
            column: 45
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 58,
            column: 41
          },
          end: {
            line: 58,
            column: 45
          }
        }],
        line: 58
      },
      '9': {
        loc: {
          start: {
            line: 60,
            column: 4
          },
          end: {
            line: 62,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 60,
            column: 4
          },
          end: {
            line: 62,
            column: 5
          }
        }, {
          start: {
            line: 60,
            column: 4
          },
          end: {
            line: 62,
            column: 5
          }
        }],
        line: 60
      },
      '10': {
        loc: {
          start: {
            line: 68,
            column: 4
          },
          end: {
            line: 70,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 68,
            column: 4
          },
          end: {
            line: 70,
            column: 5
          }
        }, {
          start: {
            line: 68,
            column: 4
          },
          end: {
            line: 70,
            column: 5
          }
        }],
        line: 68
      },
      '11': {
        loc: {
          start: {
            line: 75,
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
            line: 75,
            column: 4
          },
          end: {
            line: 77,
            column: 5
          }
        }, {
          start: {
            line: 75,
            column: 4
          },
          end: {
            line: 77,
            column: 5
          }
        }],
        line: 75
      },
      '12': {
        loc: {
          start: {
            line: 83,
            column: 4
          },
          end: {
            line: 104,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 83,
            column: 4
          },
          end: {
            line: 104,
            column: 5
          }
        }, {
          start: {
            line: 83,
            column: 4
          },
          end: {
            line: 104,
            column: 5
          }
        }],
        line: 83
      },
      '13': {
        loc: {
          start: {
            line: 87,
            column: 10
          },
          end: {
            line: 96,
            column: 11
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 87,
            column: 10
          },
          end: {
            line: 96,
            column: 11
          }
        }, {
          start: {
            line: 87,
            column: 10
          },
          end: {
            line: 96,
            column: 11
          }
        }],
        line: 87
      },
      '14': {
        loc: {
          start: {
            line: 89,
            column: 12
          },
          end: {
            line: 93,
            column: 13
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 89,
            column: 12
          },
          end: {
            line: 93,
            column: 13
          }
        }, {
          start: {
            line: 89,
            column: 12
          },
          end: {
            line: 93,
            column: 13
          }
        }],
        line: 89
      },
      '15': {
        loc: {
          start: {
            line: 89,
            column: 16
          },
          end: {
            line: 89,
            column: 80
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 89,
            column: 16
          },
          end: {
            line: 89,
            column: 42
          }
        }, {
          start: {
            line: 89,
            column: 46
          },
          end: {
            line: 89,
            column: 80
          }
        }],
        line: 89
      },
      '16': {
        loc: {
          start: {
            line: 95,
            column: 34
          },
          end: {
            line: 95,
            column: 68
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 95,
            column: 34
          },
          end: {
            line: 95,
            column: 62
          }
        }, {
          start: {
            line: 95,
            column: 66
          },
          end: {
            line: 95,
            column: 68
          }
        }],
        line: 95
      },
      '17': {
        loc: {
          start: {
            line: 107,
            column: 17
          },
          end: {
            line: 107,
            column: 103
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 107,
            column: 57
          },
          end: {
            line: 107,
            column: 62
          }
        }, {
          start: {
            line: 107,
            column: 65
          },
          end: {
            line: 107,
            column: 103
          }
        }],
        line: 107
      },
      '18': {
        loc: {
          start: {
            line: 134,
            column: 4
          },
          end: {
            line: 141,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 134,
            column: 4
          },
          end: {
            line: 141,
            column: 5
          }
        }, {
          start: {
            line: 134,
            column: 4
          },
          end: {
            line: 141,
            column: 5
          }
        }],
        line: 134
      },
      '19': {
        loc: {
          start: {
            line: 138,
            column: 6
          },
          end: {
            line: 140,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 138,
            column: 6
          },
          end: {
            line: 140,
            column: 7
          }
        }, {
          start: {
            line: 138,
            column: 6
          },
          end: {
            line: 140,
            column: 7
          }
        }],
        line: 138
      },
      '20': {
        loc: {
          start: {
            line: 151,
            column: 4
          },
          end: {
            line: 153,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 151,
            column: 4
          },
          end: {
            line: 153,
            column: 5
          }
        }],
        line: 151
      },
      '21': {
        loc: {
          start: {
            line: 170,
            column: 6
          },
          end: {
            line: 172,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 170,
            column: 6
          },
          end: {
            line: 172,
            column: 7
          }
        }, {
          start: {
            line: 170,
            column: 6
          },
          end: {
            line: 172,
            column: 7
          }
        }],
        line: 170
      },
      '22': {
        loc: {
          start: {
            line: 190,
            column: 19
          },
          end: {
            line: 190,
            column: 58
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 190,
            column: 39
          },
          end: {
            line: 190,
            column: 44
          }
        }, {
          start: {
            line: 190,
            column: 47
          },
          end: {
            line: 190,
            column: 58
          }
        }],
        line: 190
      },
      '23': {
        loc: {
          start: {
            line: 193,
            column: 17
          },
          end: {
            line: 193,
            column: 38
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 193,
            column: 17
          },
          end: {
            line: 193,
            column: 30
          }
        }, {
          start: {
            line: 193,
            column: 34
          },
          end: {
            line: 193,
            column: 38
          }
        }],
        line: 193
      },
      '24': {
        loc: {
          start: {
            line: 199,
            column: 32
          },
          end: {
            line: 199,
            column: 44
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 199,
            column: 42
          },
          end: {
            line: 199,
            column: 44
          }
        }],
        line: 199
      },
      '25': {
        loc: {
          start: {
            line: 199,
            column: 46
          },
          end: {
            line: 199,
            column: 57
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 199,
            column: 55
          },
          end: {
            line: 199,
            column: 57
          }
        }],
        line: 199
      },
      '26': {
        loc: {
          start: {
            line: 206,
            column: 6
          },
          end: {
            line: 208,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 206,
            column: 6
          },
          end: {
            line: 208,
            column: 7
          }
        }, {
          start: {
            line: 206,
            column: 6
          },
          end: {
            line: 208,
            column: 7
          }
        }],
        line: 206
      },
      '27': {
        loc: {
          start: {
            line: 214,
            column: 4
          },
          end: {
            line: 221,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 214,
            column: 4
          },
          end: {
            line: 221,
            column: 5
          }
        }, {
          start: {
            line: 214,
            column: 4
          },
          end: {
            line: 221,
            column: 5
          }
        }],
        line: 214
      },
      '28': {
        loc: {
          start: {
            line: 224,
            column: 11
          },
          end: {
            line: 224,
            column: 60
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 224,
            column: 42
          },
          end: {
            line: 224,
            column: 53
          }
        }, {
          start: {
            line: 224,
            column: 56
          },
          end: {
            line: 224,
            column: 60
          }
        }],
        line: 224
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
      '48': 0,
      '49': 0,
      '50': 0,
      '51': 0,
      '52': 0,
      '53': 0,
      '54': 0,
      '55': 0,
      '56': 0,
      '57': 0,
      '58': 0,
      '59': 0,
      '60': 0,
      '61': 0,
      '62': 0,
      '63': 0,
      '64': 0,
      '65': 0,
      '66': 0,
      '67': 0,
      '68': 0,
      '69': 0,
      '70': 0,
      '71': 0,
      '72': 0,
      '73': 0,
      '74': 0,
      '75': 0,
      '76': 0,
      '77': 0,
      '78': 0,
      '79': 0,
      '80': 0,
      '81': 0,
      '82': 0,
      '83': 0,
      '84': 0,
      '85': 0,
      '86': 0,
      '87': 0,
      '88': 0,
      '89': 0,
      '90': 0,
      '91': 0,
      '92': 0,
      '93': 0,
      '94': 0,
      '95': 0,
      '96': 0,
      '97': 0,
      '98': 0
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
    b: {
      '0': [0, 0],
      '1': [0],
      '2': [0],
      '3': [0],
      '4': [0, 0],
      '5': [0],
      '6': [0],
      '7': [0],
      '8': [0],
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
      '20': [0],
      '21': [0, 0],
      '22': [0, 0],
      '23': [0, 0],
      '24': [0],
      '25': [0],
      '26': [0, 0],
      '27': [0, 0],
      '28': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var debug$1 = (cov_2cn56rfobd.s[0]++, Debug('nuxt:generate'));

var _ref = (cov_2cn56rfobd.s[1]++, nuxt.Utils);
var isUrl = _ref.isUrl;
var promisifyRoute = _ref.promisifyRoute;
var waitFor = _ref.waitFor;
var flatRoutes = _ref.flatRoutes;

var Generator = function (_ref2) {
  inherits(Generator, _ref2);

  function Generator(nuxt$$1, builder) {
    classCallCheck(this, Generator);
    cov_2cn56rfobd.f[0]++;
    cov_2cn56rfobd.s[2]++;

    var _this = possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this));

    cov_2cn56rfobd.s[3]++;

    _this.nuxt = nuxt$$1;
    cov_2cn56rfobd.s[4]++;
    _this.options = nuxt$$1.options;
    cov_2cn56rfobd.s[5]++;
    _this.builder = builder;

    // Set variables
    cov_2cn56rfobd.s[6]++;
    _this.staticRoutes = path.resolve(_this.options.srcDir, 'static');
    cov_2cn56rfobd.s[7]++;
    _this.srcBuiltPath = path.resolve(_this.options.buildDir, 'dist');
    cov_2cn56rfobd.s[8]++;
    _this.distPath = path.resolve(_this.options.rootDir, _this.options.generate.dir);
    cov_2cn56rfobd.s[9]++;
    _this.distNuxtPath = path.join(_this.distPath, isUrl(_this.options.build.publicPath) ? (cov_2cn56rfobd.b[0][0]++, '') : (cov_2cn56rfobd.b[0][1]++, _this.options.build.publicPath));
    return _this;
  }

  createClass(Generator, [{
    key: 'generate',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (cov_2cn56rfobd.b[1][0]++, {}),
            _ref4$build = _ref4.build,
            build = _ref4$build === undefined ? (cov_2cn56rfobd.b[2][0]++, true) : _ref4$build,
            _ref4$init = _ref4.init,
            init = _ref4$init === undefined ? (cov_2cn56rfobd.b[3][0]++, true) : _ref4$init;

        var s, routes, errors, duration;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_2cn56rfobd.f[1]++;
                s = (cov_2cn56rfobd.s[10]++, Date.now());
                cov_2cn56rfobd.s[11]++;
                _context.next = 5;
                return this.initiate({ build: build, init: init });

              case 5:
                cov_2cn56rfobd.s[12]++;
                _context.next = 8;
                return this.initRoutes();

              case 8:
                routes = _context.sent;
                cov_2cn56rfobd.s[13]++;
                _context.next = 12;
                return this.generateRoutes(routes);

              case 12:
                errors = _context.sent;
                cov_2cn56rfobd.s[14]++;
                _context.next = 16;
                return this.postGenerate();

              case 16:
                duration = (cov_2cn56rfobd.s[15]++, Math.round((Date.now() - s) / 100) / 10);
                cov_2cn56rfobd.s[16]++;

                this.printReport(duration, errors);

                cov_2cn56rfobd.s[17]++;
                return _context.abrupt('return', { duration: duration, errors: errors });

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generate() {
        return _ref3.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: 'printReport',
    value: function printReport(duration, errors) {
      cov_2cn56rfobd.f[2]++;
      cov_2cn56rfobd.s[18]++;

      debug$1('HTML Files generated in ' + duration + 's');

      cov_2cn56rfobd.s[19]++;
      if (errors.length) {
        cov_2cn56rfobd.b[4][0]++;

        var report = (cov_2cn56rfobd.s[20]++, errors.map(function (_ref5) {
          var type = _ref5.type,
              route = _ref5.route,
              error = _ref5.error;
          cov_2cn56rfobd.f[3]++;
          cov_2cn56rfobd.s[21]++;

          /* istanbul ignore if */
          if (type === 'unhandled') {
            return 'Route: \'' + route + '\'\n' + error.stack;
          } else {
            cov_2cn56rfobd.b[5][0]++;
            cov_2cn56rfobd.s[22]++;

            return 'Route: \'' + route + '\' thrown an error: \n' + JSON.stringify(error);
          }
        }));
        cov_2cn56rfobd.s[23]++;
        console.error('==== Error report ==== \n' + report.join('\n\n')); // eslint-disable-line no-console
      } else {
        cov_2cn56rfobd.b[4][1]++;
      }
    }
  }, {
    key: 'initiate',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (cov_2cn56rfobd.b[6][0]++, {}),
            _ref7$build = _ref7.build,
            build = _ref7$build === undefined ? (cov_2cn56rfobd.b[7][0]++, true) : _ref7$build,
            _ref7$init = _ref7.init,
            init = _ref7$init === undefined ? (cov_2cn56rfobd.b[8][0]++, true) : _ref7$init;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_2cn56rfobd.f[4]++;
                cov_2cn56rfobd.s[24]++;

                // Add flag to set process.static
                if (build) {
                  cov_2cn56rfobd.b[9][0]++;
                  cov_2cn56rfobd.s[25]++;

                  this.builder.forGenerate();
                } else {
                  cov_2cn56rfobd.b[9][1]++;
                }

                // Wait for nuxt be ready
                cov_2cn56rfobd.s[26]++;
                _context2.next = 6;
                return this.nuxt.ready();

              case 6:
                cov_2cn56rfobd.s[27]++;

                if (!build) {
                  _context2.next = 14;
                  break;
                }

                cov_2cn56rfobd.b[10][0]++;
                cov_2cn56rfobd.s[28]++;
                _context2.next = 12;
                return this.builder.build();

              case 12:
                _context2.next = 15;
                break;

              case 14:
                cov_2cn56rfobd.b[10][1]++;

              case 15:
                cov_2cn56rfobd.s[29]++;
                _context2.next = 18;
                return this.nuxt.applyPluginsAsync('generator', this);

              case 18:
                cov_2cn56rfobd.s[30]++;

                if (!init) {
                  _context2.next = 26;
                  break;
                }

                cov_2cn56rfobd.b[11][0]++;
                cov_2cn56rfobd.s[31]++;
                _context2.next = 24;
                return this.initDist();

              case 24:
                _context2.next = 27;
                break;

              case 26:
                cov_2cn56rfobd.b[11][1]++;

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initiate() {
        return _ref6.apply(this, arguments);
      }

      return initiate;
    }()
  }, {
    key: 'initRoutes',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var _this2 = this;

        var generateRoutes, routes;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cov_2cn56rfobd.f[5]++;

                // Resolve config.generate.routes promises before generating the routes
                generateRoutes = (cov_2cn56rfobd.s[32]++, []);
                cov_2cn56rfobd.s[33]++;

                if (!(this.options.router.mode !== 'hash')) {
                  _context3.next = 26;
                  break;
                }

                cov_2cn56rfobd.b[12][0]++;
                cov_2cn56rfobd.s[34]++;
                _context3.prev = 6;
                cov_2cn56rfobd.s[35]++;
                _context3.next = 10;
                return promisifyRoute(function (callback) {
                  cov_2cn56rfobd.f[6]++;
                  cov_2cn56rfobd.s[36]++;

                  if (typeof _this2.options.generate.routes === 'function') {
                    cov_2cn56rfobd.b[13][0]++;

                    var promise = (cov_2cn56rfobd.s[37]++, _this2.options.generate.routes(callback, params));
                    cov_2cn56rfobd.s[38]++;
                    if ((cov_2cn56rfobd.b[15][0]++, promise instanceof Promise) && (cov_2cn56rfobd.b[15][1]++, typeof promise.then === 'function')) {
                      cov_2cn56rfobd.b[14][0]++;
                      cov_2cn56rfobd.s[39]++;

                      return promise.then(function (routes) {
                        cov_2cn56rfobd.f[7]++;
                        cov_2cn56rfobd.s[40]++;
                        callback(null, routes);
                      }).catch(function (e) {
                        cov_2cn56rfobd.f[8]++;
                        cov_2cn56rfobd.s[41]++;
                        callback(e);
                      });
                    } else {
                      cov_2cn56rfobd.b[14][1]++;
                      cov_2cn56rfobd.s[42]++;

                      return callback(null, promise);
                    }
                  } else {
                    cov_2cn56rfobd.b[13][1]++;
                    cov_2cn56rfobd.s[43]++;

                    return callback(null, (cov_2cn56rfobd.b[16][0]++, _this2.options.generate.routes) || (cov_2cn56rfobd.b[16][1]++, []));
                  }
                });

              case 10:
                generateRoutes = _context3.sent;
                cov_2cn56rfobd.s[44]++;
                _context3.next = 14;
                return this.applyPluginsAsync('generateRoutes', { generator: this, generateRoutes: generateRoutes });

              case 14:
                _context3.next = 24;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3['catch'](6);
                cov_2cn56rfobd.s[45]++;

                console.error('Could not resolve routes'); // eslint-disable-line no-console
                cov_2cn56rfobd.s[46]++;
                console.error(_context3.t0); // eslint-disable-line no-console
                cov_2cn56rfobd.s[47]++;
                throw _context3.t0;

              case 24:
                _context3.next = 27;
                break;

              case 26:
                cov_2cn56rfobd.b[12][1]++;

              case 27:

                // Generate only index.html for router.mode = 'hash'
                routes = (cov_2cn56rfobd.s[48]++, this.options.router.mode === 'hash' ? (cov_2cn56rfobd.b[17][0]++, ['/']) : (cov_2cn56rfobd.b[17][1]++, flatRoutes(this.options.router.routes)));
                cov_2cn56rfobd.s[49]++;

                routes = this.decorateWithPayloads(routes, generateRoutes);

                cov_2cn56rfobd.s[50]++;
                return _context3.abrupt('return', routes);

              case 32:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 16]]);
      }));

      function initRoutes(_x3) {
        return _ref8.apply(this, arguments);
      }

      return initRoutes;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(routes) {
        var _this3 = this;

        var errors, _loop;

        return regenerator.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cov_2cn56rfobd.f[9]++;
                errors = (cov_2cn56rfobd.s[51]++, []);
                cov_2cn56rfobd.s[52]++;
                _context6.next = 5;
                return this.applyPluginsAsync('generate', { generator: this, routes: routes });

              case 5:
                cov_2cn56rfobd.s[53]++;
                _loop = /*#__PURE__*/regenerator.mark(function _loop() {
                  var n;
                  return regenerator.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          n = (cov_2cn56rfobd.s[54]++, 0);
                          cov_2cn56rfobd.s[55]++;
                          _context5.next = 4;
                          return Promise.all(routes.splice(0, _this3.options.generate.concurrency).map(function () {
                            var _ref11 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref10) {
                              var route = _ref10.route,
                                  payload = _ref10.payload;
                              return regenerator.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      cov_2cn56rfobd.f[10]++;
                                      cov_2cn56rfobd.s[56]++;
                                      _context4.next = 4;
                                      return waitFor(n++ * _this3.options.generate.interval);

                                    case 4:
                                      cov_2cn56rfobd.s[57]++;
                                      _context4.next = 7;
                                      return _this3.generateRoute({ route: route, payload: payload, errors: errors });

                                    case 7:
                                    case 'end':
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4, _this3);
                            }));

                            return function (_x5) {
                              return _ref11.apply(this, arguments);
                            };
                          }()));

                        case 4:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _loop, _this3);
                });

              case 7:
                if (!routes.length) {
                  _context6.next = 11;
                  break;
                }

                return _context6.delegateYield(_loop(), 't0', 9);

              case 9:
                _context6.next = 7;
                break;

              case 11:
                cov_2cn56rfobd.s[58]++;
                _context6.next = 14;
                return this.applyPluginsAsync('generated', this);

              case 14:
                cov_2cn56rfobd.s[59]++;
                return _context6.abrupt('return', errors);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function generateRoutes(_x4) {
        return _ref9.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }, {
    key: 'postGenerate',
    value: function () {
      var _ref12 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var indexPath, _200Path;

        return regenerator.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                cov_2cn56rfobd.f[11]++;
                indexPath = (cov_2cn56rfobd.s[60]++, path.join(this.distPath, 'index.html'));
                cov_2cn56rfobd.s[61]++;

                if (!fsExtra.existsSync(indexPath)) {
                  _context7.next = 17;
                  break;
                }

                cov_2cn56rfobd.b[18][0]++;

                // Copy /index.html to /200.html for surge SPA
                // https://surge.sh/help/adding-a-200-page-for-client-side-routing
                _200Path = (cov_2cn56rfobd.s[62]++, path.join(this.distPath, '200.html'));
                cov_2cn56rfobd.s[63]++;

                if (fsExtra.existsSync(_200Path)) {
                  _context7.next = 14;
                  break;
                }

                cov_2cn56rfobd.b[19][0]++;
                cov_2cn56rfobd.s[64]++;
                _context7.next = 12;
                return fsExtra.copy(indexPath, _200Path);

              case 12:
                _context7.next = 15;
                break;

              case 14:
                cov_2cn56rfobd.b[19][1]++;

              case 15:
                _context7.next = 18;
                break;

              case 17:
                cov_2cn56rfobd.b[18][1]++;

              case 18:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function postGenerate() {
        return _ref12.apply(this, arguments);
      }

      return postGenerate;
    }()
  }, {
    key: 'initDist',
    value: function () {
      var _ref13 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var _this4 = this;

        var nojekyllPath, extraFiles;
        return regenerator.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                cov_2cn56rfobd.f[12]++;
                cov_2cn56rfobd.s[65]++;
                _context8.next = 4;
                return fsExtra.remove(this.distPath);

              case 4:
                cov_2cn56rfobd.s[66]++;

                debug$1('Destination folder cleaned');

                // Copy static and built files
                /* istanbul ignore if */
                cov_2cn56rfobd.s[67]++;

                if (!fsExtra.existsSync(this.staticRoutes)) {
                  _context8.next = 12;
                  break;
                }

                _context8.next = 10;
                return fsExtra.copy(this.staticRoutes, this.distPath);

              case 10:
                _context8.next = 13;
                break;

              case 12:
                cov_2cn56rfobd.b[20][0]++;

              case 13:
                cov_2cn56rfobd.s[68]++;
                _context8.next = 16;
                return fsExtra.copy(this.srcBuiltPath, this.distNuxtPath);

              case 16:

                // Add .nojekyll file to let Github Pages add the _nuxt/ folder
                // https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
                nojekyllPath = (cov_2cn56rfobd.s[69]++, path.resolve(this.distPath, '.nojekyll'));
                cov_2cn56rfobd.s[70]++;

                fsExtra.writeFile(nojekyllPath, '');

                // Cleanup SSR related files
                extraFiles = (cov_2cn56rfobd.s[71]++, ['index.spa.html', 'index.ssr.html', 'server-bundle.json', 'vue-ssr-client-manifest.json'].map(function (file) {
                  cov_2cn56rfobd.f[13]++;
                  cov_2cn56rfobd.s[72]++;
                  return path.resolve(_this4.distNuxtPath, file);
                }));
                cov_2cn56rfobd.s[73]++;


                extraFiles.forEach(function (file) {
                  cov_2cn56rfobd.f[14]++;
                  cov_2cn56rfobd.s[74]++;

                  if (fsExtra.existsSync(file)) {
                    cov_2cn56rfobd.b[21][0]++;
                    cov_2cn56rfobd.s[75]++;

                    fsExtra.removeSync(file);
                  } else {
                    cov_2cn56rfobd.b[21][1]++;
                  }
                });

                cov_2cn56rfobd.s[76]++;
                debug$1('Static & build files copied');

              case 24:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function initDist() {
        return _ref13.apply(this, arguments);
      }

      return initDist;
    }()
  }, {
    key: 'decorateWithPayloads',
    value: function decorateWithPayloads(routes, generateRoutes) {
      cov_2cn56rfobd.f[15]++;

      var routeMap = (cov_2cn56rfobd.s[77]++, {});
      // Fill routeMap for known routes
      cov_2cn56rfobd.s[78]++;
      routes.forEach(function (route) {
        cov_2cn56rfobd.f[16]++;
        cov_2cn56rfobd.s[79]++;

        routeMap[route] = {
          route: route,
          payload: null
        };
      });
      // Fill routeMap with given generate.routes
      cov_2cn56rfobd.s[80]++;
      generateRoutes.forEach(function (route) {
        cov_2cn56rfobd.f[17]++;

        // route is either a string or like {route : "/my_route/1"}
        var path$$1 = (cov_2cn56rfobd.s[81]++, ___default.isString(route) ? (cov_2cn56rfobd.b[22][0]++, route) : (cov_2cn56rfobd.b[22][1]++, route.route));
        cov_2cn56rfobd.s[82]++;
        routeMap[path$$1] = {
          route: path$$1,
          payload: (cov_2cn56rfobd.b[23][0]++, route.payload) || (cov_2cn56rfobd.b[23][1]++, null)
        };
      });
      cov_2cn56rfobd.s[83]++;
      return ___default.values(routeMap);
    }
  }, {
    key: 'generateRoute',
    value: function () {
      var _ref15 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(_ref14) {
        var route = _ref14.route,
            _ref14$payload = _ref14.payload,
            payload = _ref14$payload === undefined ? (cov_2cn56rfobd.b[24][0]++, {}) : _ref14$payload,
            _ref14$errors = _ref14.errors,
            errors = _ref14$errors === undefined ? (cov_2cn56rfobd.b[25][0]++, []) : _ref14$errors;
        var html, res, minifyErr, path$$1, fullPath;
        return regenerator.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                cov_2cn56rfobd.f[18]++;
                html = void 0;
                cov_2cn56rfobd.s[84]++;
                _context9.prev = 3;
                cov_2cn56rfobd.s[85]++;
                _context9.next = 7;
                return this.nuxt.renderer.renderRoute(route, { _generate: true, payload: payload });

              case 7:
                res = _context9.sent;
                cov_2cn56rfobd.s[86]++;


                html = res.html;
                cov_2cn56rfobd.s[87]++;
                if (res.error) {
                  cov_2cn56rfobd.b[26][0]++;
                  cov_2cn56rfobd.s[88]++;

                  errors.push({ type: 'handled', route: route, error: res.error });
                } else {
                  cov_2cn56rfobd.b[26][1]++;
                }
                _context9.next = 17;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9['catch'](3);
                return _context9.abrupt('return', errors.push({ type: 'unhandled', route: route, error: _context9.t0 }));

              case 17:
                cov_2cn56rfobd.s[89]++;


                if (this.options.generate.minify) {
                  cov_2cn56rfobd.b[27][0]++;
                  cov_2cn56rfobd.s[90]++;

                  try {
                    cov_2cn56rfobd.s[91]++;

                    html = htmlMinifier.minify(html, this.options.generate.minify);
                  } catch (err) /* istanbul ignore next */{
                    minifyErr = new Error('HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ' + html);

                    errors.push({ type: 'unhandled', route: route, error: minifyErr });
                  }
                } else {
                  cov_2cn56rfobd.b[27][1]++;
                }

                path$$1 = (cov_2cn56rfobd.s[92]++, path.join(route, path.sep, 'index.html')); // /about -> /about/index.html

                cov_2cn56rfobd.s[93]++;
                path$$1 = path$$1 === '/404/index.html' ? (cov_2cn56rfobd.b[28][0]++, '/404.html') : (cov_2cn56rfobd.b[28][1]++, path$$1); // /404 -> /404.html
                // debug('Generate file: ' + path)
                fullPath = (cov_2cn56rfobd.s[94]++, path.join(this.distPath, path$$1));

                // Make sure the sub folders are created

                cov_2cn56rfobd.s[95]++;
                _context9.next = 26;
                return fsExtra.mkdirp(path.dirname(fullPath));

              case 26:
                cov_2cn56rfobd.s[96]++;
                _context9.next = 29;
                return fsExtra.writeFile(fullPath, html, 'utf8');

              case 29:
                cov_2cn56rfobd.s[97]++;
                _context9.next = 32;
                return this.applyPluginsAsync('routeGenerated', { route: route, path: path$$1 });

              case 32:
                cov_2cn56rfobd.s[98]++;
                return _context9.abrupt('return', true);

              case 34:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this, [[3, 14]]);
      }));

      function generateRoute(_x6) {
        return _ref15.apply(this, arguments);
      }

      return generateRoute;
    }()
  }]);
  return Generator;
}((Tapable));

var cov_2m8511bb83 = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/builder/index.js',
      hash = 'bbbc67b469485cbf9ad3ac76b060e8321045294d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/builder/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();



var Builder$1 = Object.freeze({
	Generator: Generator
});

var cov_ux63eeeru = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/master.js',
      hash = 'dd6cb4133192f746e57eb7e13537715a2c5d276c',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/master.js',
    statementMap: {
      '0': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 11
        }
      },
      '1': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 26
        }
      },
      '2': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 34
        }
      },
      '3': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 37
        }
      },
      '4': {
        start: {
          line: 16,
          column: 17
        },
        end: {
          line: 16,
          column: 34
        }
      },
      '5': {
        start: {
          line: 17,
          column: 20
        },
        end: {
          line: 17,
          column: 37
        }
      },
      '6': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 49
        }
      },
      '7': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 118
        }
      },
      '8': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 116
        }
      },
      '9': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 20
        }
      },
      '10': {
        start: {
          line: 24,
          column: 4
        },
        end: {
          line: 24,
          column: 20
        }
      },
      '11': {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      '12': {
        start: {
          line: 29,
          column: 6
        },
        end: {
          line: 29,
          column: 24
        }
      },
      '13': {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 30,
          column: 65
        }
      },
      '14': {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 27
        }
      },
      '15': {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 35,
          column: 32
        }
      },
      '16': {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 29
        }
      },
      '17': {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 41,
          column: 29
        }
      },
      '18': {
        start: {
          line: 41,
          column: 16
        },
        end: {
          line: 41,
          column: 29
        }
      },
      '19': {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 42,
          column: 64
        }
      },
      '20': {
        start: {
          line: 46,
          column: 4
        },
        end: {
          line: 46,
          column: 29
        }
      },
      '21': {
        start: {
          line: 50,
          column: 4
        },
        end: {
          line: 59,
          column: 5
        }
      },
      '22': {
        start: {
          line: 51,
          column: 21
        },
        end: {
          line: 51,
          column: 60
        }
      },
      '23': {
        start: {
          line: 52,
          column: 6
        },
        end: {
          line: 56,
          column: 7
        }
      },
      '24': {
        start: {
          line: 54,
          column: 8
        },
        end: {
          line: 54,
          column: 55
        }
      },
      '25': {
        start: {
          line: 55,
          column: 8
        },
        end: {
          line: 55,
          column: 39
        }
      },
      '26': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 17
        }
      },
      '27': {
        start: {
          line: 60,
          column: 4
        },
        end: {
          line: 60,
          column: 16
        }
      },
      '28': {
        start: {
          line: 65,
          column: 28
        },
        end: {
          line: 65,
          column: 50
        }
      },
      '29': {
        start: {
          line: 66,
          column: 4
        },
        end: {
          line: 68,
          column: 5
        }
      },
      '30': {
        start: {
          line: 67,
          column: 6
        },
        end: {
          line: 67,
          column: 74
        }
      },
      '31': {
        start: {
          line: 70,
          column: 4
        },
        end: {
          line: 70,
          column: 28
        }
      },
      '32': {
        start: {
          line: 74,
          column: 22
        },
        end: {
          line: 74,
          column: 47
        }
      },
      '33': {
        start: {
          line: 75,
          column: 19
        },
        end: {
          line: 75,
          column: 51
        }
      },
      '34': {
        start: {
          line: 77,
          column: 4
        },
        end: {
          line: 77,
          column: 17
        }
      },
      '35': {
        start: {
          line: 81,
          column: 4
        },
        end: {
          line: 81,
          column: 39
        }
      },
      '36': {
        start: {
          line: 83,
          column: 19
        },
        end: {
          line: 83,
          column: 49
        }
      },
      '37': {
        start: {
          line: 84,
          column: 4
        },
        end: {
          line: 84,
          column: 71
        }
      },
      '38': {
        start: {
          line: 86,
          column: 4
        },
        end: {
          line: 86,
          column: 53
        }
      },
      '39': {
        start: {
          line: 88,
          column: 17
        },
        end: {
          line: 92,
          column: 5
        }
      },
      '40': {
        start: {
          line: 94,
          column: 4
        },
        end: {
          line: 96,
          column: 5
        }
      },
      '41': {
        start: {
          line: 95,
          column: 6
        },
        end: {
          line: 95,
          column: 48
        }
      },
      '42': {
        start: {
          line: 97,
          column: 4
        },
        end: {
          line: 99,
          column: 5
        }
      },
      '43': {
        start: {
          line: 98,
          column: 6
        },
        end: {
          line: 98,
          column: 66
        }
      },
      '44': {
        start: {
          line: 101,
          column: 4
        },
        end: {
          line: 101,
          column: 20
        }
      },
      '45': {
        start: {
          line: 105,
          column: 4
        },
        end: {
          line: 105,
          column: 61
        }
      },
      '46': {
        start: {
          line: 106,
          column: 4
        },
        end: {
          line: 106,
          column: 16
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 8,
            column: 3
          }
        },
        loc: {
          start: {
            line: 8,
            column: 60
          },
          end: {
            line: 25,
            column: 3
          }
        },
        line: 8
      },
      '1': {
        name: '(anonymous_1)',
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
            column: 37
          },
          end: {
            line: 38,
            column: 3
          }
        },
        line: 27
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 30,
            column: 56
          },
          end: {
            line: 30,
            column: 57
          }
        },
        loc: {
          start: {
            line: 30,
            column: 62
          },
          end: {
            line: 30,
            column: 64
          }
        },
        line: 30
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 40,
            column: 2
          },
          end: {
            line: 40,
            column: 3
          }
        },
        loc: {
          start: {
            line: 40,
            column: 25
          },
          end: {
            line: 43,
            column: 3
          }
        },
        line: 40
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 45,
            column: 2
          },
          end: {
            line: 45,
            column: 3
          }
        },
        loc: {
          start: {
            line: 45,
            column: 17
          },
          end: {
            line: 47,
            column: 3
          }
        },
        line: 45
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 49,
            column: 2
          },
          end: {
            line: 49,
            column: 3
          }
        },
        loc: {
          start: {
            line: 49,
            column: 27
          },
          end: {
            line: 61,
            column: 3
          }
        },
        line: 49
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 63,
            column: 2
          },
          end: {
            line: 63,
            column: 3
          }
        },
        loc: {
          start: {
            line: 63,
            column: 24
          },
          end: {
            line: 71,
            column: 3
          }
        },
        line: 63
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 73,
            column: 2
          },
          end: {
            line: 73,
            column: 3
          }
        },
        loc: {
          start: {
            line: 73,
            column: 20
          },
          end: {
            line: 78,
            column: 3
          }
        },
        line: 73
      },
      '8': {
        name: '(anonymous_8)',
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
            column: 30
          },
          end: {
            line: 102,
            column: 3
          }
        },
        line: 80
      },
      '9': {
        name: '(anonymous_9)',
        decl: {
          start: {
            line: 98,
            column: 57
          },
          end: {
            line: 98,
            column: 58
          }
        },
        loc: {
          start: {
            line: 98,
            column: 63
          },
          end: {
            line: 98,
            column: 65
          }
        },
        line: 98
      },
      '10': {
        name: '(anonymous_10)',
        decl: {
          start: {
            line: 104,
            column: 2
          },
          end: {
            line: 104,
            column: 3
          }
        },
        loc: {
          start: {
            line: 104,
            column: 24
          },
          end: {
            line: 107,
            column: 3
          }
        },
        line: 104
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 20,
            column: 23
          },
          end: {
            line: 20,
            column: 118
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 20,
            column: 23
          },
          end: {
            line: 20,
            column: 44
          }
        }, {
          start: {
            line: 20,
            column: 48
          },
          end: {
            line: 20,
            column: 87
          }
        }, {
          start: {
            line: 20,
            column: 91
          },
          end: {
            line: 20,
            column: 118
          }
        }],
        line: 20
      },
      '1': {
        loc: {
          start: {
            line: 21,
            column: 29
          },
          end: {
            line: 21,
            column: 116
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 21,
            column: 29
          },
          end: {
            line: 21,
            column: 56
          }
        }, {
          start: {
            line: 21,
            column: 60
          },
          end: {
            line: 21,
            column: 109
          }
        }, {
          start: {
            line: 21,
            column: 113
          },
          end: {
            line: 21,
            column: 116
          }
        }],
        line: 21
      },
      '2': {
        loc: {
          start: {
            line: 27,
            column: 13
          },
          end: {
            line: 27,
            column: 35
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 27,
            column: 33
          },
          end: {
            line: 27,
            column: 35
          }
        }],
        line: 27
      },
      '3': {
        loc: {
          start: {
            line: 28,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 28,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }, {
          start: {
            line: 28,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }],
        line: 28
      },
      '4': {
        loc: {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 41,
            column: 29
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 41,
            column: 29
          }
        }, {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 41,
            column: 29
          }
        }],
        line: 41
      },
      '5': {
        loc: {
          start: {
            line: 52,
            column: 6
          },
          end: {
            line: 56,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 52,
            column: 6
          },
          end: {
            line: 56,
            column: 7
          }
        }, {
          start: {
            line: 52,
            column: 6
          },
          end: {
            line: 56,
            column: 7
          }
        }],
        line: 52
      },
      '6': {
        loc: {
          start: {
            line: 66,
            column: 4
          },
          end: {
            line: 68,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 66,
            column: 4
          },
          end: {
            line: 68,
            column: 5
          }
        }, {
          start: {
            line: 66,
            column: 4
          },
          end: {
            line: 68,
            column: 5
          }
        }],
        line: 66
      },
      '7': {
        loc: {
          start: {
            line: 94,
            column: 4
          },
          end: {
            line: 96,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 94,
            column: 4
          },
          end: {
            line: 96,
            column: 5
          }
        }, {
          start: {
            line: 94,
            column: 4
          },
          end: {
            line: 96,
            column: 5
          }
        }],
        line: 94
      },
      '8': {
        loc: {
          start: {
            line: 94,
            column: 8
          },
          end: {
            line: 94,
            column: 85
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 94,
            column: 8
          },
          end: {
            line: 94,
            column: 29
          }
        }, {
          start: {
            line: 94,
            column: 33
          },
          end: {
            line: 94,
            column: 85
          }
        }],
        line: 94
      },
      '9': {
        loc: {
          start: {
            line: 97,
            column: 4
          },
          end: {
            line: 99,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 97,
            column: 4
          },
          end: {
            line: 99,
            column: 5
          }
        }, {
          start: {
            line: 97,
            column: 4
          },
          end: {
            line: 99,
            column: 5
          }
        }],
        line: 97
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
      '9': 0,
      '10': 0
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
      '8': [0, 0],
      '9': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var Master$2 = function (_ref) {
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
    _this.generator = new Generator(nuxt$$1, builder);

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
                return this.applyPluginsAsync('built', { params: params }, function () {
                  cov_ux63eeeru.f[2]++;
                });

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
                cov_ux63eeeru.f[3]++;
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
                cov_ux63eeeru.f[4]++;
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
                cov_ux63eeeru.f[5]++;
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
                  this.routes = _.uniq(this.routes);
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
      cov_ux63eeeru.f[6]++;

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
      cov_ux63eeeru.f[7]++;

      var batchSize = (cov_ux63eeeru.s[32]++, this.calculateBatchSize());
      var routes = (cov_ux63eeeru.s[33]++, this.routes.splice(0, batchSize));

      cov_ux63eeeru.s[34]++;
      return routes;
    }
  }, {
    key: 'finished',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(workerInfo) {
        var duration, info;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                cov_ux63eeeru.f[8]++;
                cov_ux63eeeru.s[35]++;
                _context5.next = 4;
                return this.generator.postGenerate();

              case 4:
                duration = (cov_ux63eeeru.s[36]++, process.hrtime(this.startTime));
                cov_ux63eeeru.s[37]++;

                duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10;

                cov_ux63eeeru.s[38]++;
                this.generator.printReport(duration, this.errors);

                info = (cov_ux63eeeru.s[39]++, {
                  duration: duration,
                  errors: this.errors,
                  workerInfo: workerInfo
                });
                cov_ux63eeeru.s[40]++;

                if (!((cov_ux63eeeru.b[8][0]++, this.options.generate) && (cov_ux63eeeru.b[8][1]++, typeof this.options.generate.finished === 'function'))) {
                  _context5.next = 18;
                  break;
                }

                cov_ux63eeeru.b[7][0]++;
                cov_ux63eeeru.s[41]++;
                _context5.next = 16;
                return this.options.generate.finished(info);

              case 16:
                _context5.next = 19;
                break;

              case 18:
                cov_ux63eeeru.b[7][1]++;

              case 19:
                cov_ux63eeeru.s[42]++;

                if (!this.hasPlugins('finished')) {
                  _context5.next = 27;
                  break;
                }

                cov_ux63eeeru.b[9][0]++;
                cov_ux63eeeru.s[43]++;
                _context5.next = 25;
                return this.applyPluginsAsync('finished', { info: info }, function () {
                  cov_ux63eeeru.f[9]++;
                });

              case 25:
                _context5.next = 28;
                break;

              case 27:
                cov_ux63eeeru.b[9][1]++;

              case 28:
                cov_ux63eeeru.s[44]++;


                this.errors = [];

              case 30:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function finished(_x4) {
        return _ref8.apply(this, arguments);
      }

      return finished;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cov_ux63eeeru.f[10]++;
                cov_ux63eeeru.s[45]++;

                console.error('Should be implemented by a derived class'); // eslint-disable-line no-console
                cov_ux63eeeru.s[46]++;
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
}((Tapable_1));

var cov_29ov6lgjyf = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/worker.js',
      hash = '4c481e2863a5352db60a0dd43ae3ebd440094c1e',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/generate/worker.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 11
        }
      },
      '1': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 26
        }
      },
      '2': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 22
        }
      },
      '3': {
        start: {
          line: 12,
          column: 17
        },
        end: {
          line: 12,
          column: 34
        }
      },
      '4': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 40
        }
      },
      '5': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 28
        }
      },
      '6': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 64
        }
      },
      '7': {
        start: {
          line: 25,
          column: 17
        },
        end: {
          line: 25,
          column: 19
        }
      },
      '8': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      '9': {
        start: {
          line: 28,
          column: 6
        },
        end: {
          line: 28,
          column: 58
        }
      },
      '10': {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 30,
          column: 88
        }
      },
      '11': {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 22
        }
      },
      '12': {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 13
        }
      },
      '13': {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 35,
          column: 17
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
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
            column: 24
          },
          end: {
            line: 14,
            column: 3
          }
        },
        line: 6
      },
      '1': {
        name: '(anonymous_1)',
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
            column: 25
          },
          end: {
            line: 18,
            column: 3
          }
        },
        line: 16
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
            column: 15
          },
          end: {
            line: 22,
            column: 3
          }
        },
        line: 20
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 24,
            column: 2
          },
          end: {
            line: 24,
            column: 3
          }
        },
        loc: {
          start: {
            line: 24,
            column: 32
          },
          end: {
            line: 36,
            column: 3
          }
        },
        line: 24
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
      '12': 0,
      '13': 0
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var Worker = function (_ref) {
  inherits(Worker, _ref);

  function Worker(options) {
    classCallCheck(this, Worker);
    cov_29ov6lgjyf.f[0]++;
    cov_29ov6lgjyf.s[0]++;

    var _this = possibleConstructorReturn(this, (Worker.__proto__ || Object.getPrototypeOf(Worker)).call(this));

    cov_29ov6lgjyf.s[1]++;


    _this.options = options;
    cov_29ov6lgjyf.s[2]++;
    _this.workerId = -1;

    var nuxt$$1 = (cov_29ov6lgjyf.s[3]++, new nuxt.Nuxt(options));
    cov_29ov6lgjyf.s[4]++;
    _this.generator = new Generator(nuxt$$1);
    return _this;
  }

  createClass(Worker, [{
    key: 'setWorkerId',
    value: function setWorkerId(workerId) {
      cov_29ov6lgjyf.f[1]++;
      cov_29ov6lgjyf.s[5]++;

      this.workerId = workerId;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_29ov6lgjyf.f[2]++;
                cov_29ov6lgjyf.s[6]++;
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
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(routes) {
        var errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_29ov6lgjyf.f[3]++;
                errors = (cov_29ov6lgjyf.s[7]++, []);
                cov_29ov6lgjyf.s[8]++;
                _context2.prev = 3;
                cov_29ov6lgjyf.s[9]++;
                _context2.next = 7;
                return this.generator.generateRoutes(routes);

              case 7:
                errors = _context2.sent;
                _context2.next = 18;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](3);
                cov_29ov6lgjyf.s[10]++;

                console.error('Worker ' + process.pid + ': Exception while generating routes, exiting'); // eslint-disable-line no-console
                cov_29ov6lgjyf.s[11]++;
                console.error(_context2.t0); // eslint-disable-line no-console
                cov_29ov6lgjyf.s[12]++;
                throw _context2.t0;

              case 18:
                cov_29ov6lgjyf.s[13]++;
                return _context2.abrupt('return', errors);

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function generateRoutes(_x) {
        return _ref3.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker;
}((Tapable_1));

var cov_19oiqgbd4i = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/generate/index.js',
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();



var Generate = Object.freeze({
	Commands: Commands,
	Watchdog: Watchdog,
	Master: Master$2,
	Worker: Worker
});

var cov_jqnx95x11 = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/messaging.js',
      hash = 'daf43e6404e77c3084843f905ad696074a872aa7',
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
          line: 9,
          column: 11
        },
        end: {
          line: 11,
          column: 5
        }
      },
      '3': {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 12
        }
      },
      '4': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 17,
          column: 5
        }
      },
      '5': {
        start: {
          line: 14,
          column: 6
        },
        end: {
          line: 14,
          column: 59
        }
      },
      '6': {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 59
        }
      },
      '7': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 29
        }
      },
      '8': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 24,
          column: 5
        }
      },
      '9': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 44
        }
      },
      '10': {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 56
        }
      },
      '11': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 36,
          column: 5
        }
      },
      '12': {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 30,
          column: 22
        }
      },
      '13': {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 22
        }
      },
      '14': {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 24
        }
      },
      '15': {
        start: {
          line: 33,
          column: 11
        },
        end: {
          line: 36,
          column: 5
        }
      },
      '16': {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 22
        }
      },
      '17': {
        start: {
          line: 35,
          column: 6
        },
        end: {
          line: 35,
          column: 24
        }
      },
      '18': {
        start: {
          line: 38,
          column: 16
        },
        end: {
          line: 38,
          column: 27
        }
      },
      '19': {
        start: {
          line: 39,
          column: 4
        },
        end: {
          line: 46,
          column: 5
        }
      },
      '20': {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 40,
          column: 52
        }
      },
      '21': {
        start: {
          line: 41,
          column: 11
        },
        end: {
          line: 46,
          column: 5
        }
      },
      '22': {
        start: {
          line: 42,
          column: 6
        },
        end: {
          line: 42,
          column: 63
        }
      },
      '23': {
        start: {
          line: 44,
          column: 19
        },
        end: {
          line: 44,
          column: 31
        }
      },
      '24': {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 45,
          column: 46
        }
      },
      '25': {
        start: {
          line: 50,
          column: 4
        },
        end: {
          line: 53,
          column: 5
        }
      },
      '26': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 51,
          column: 18
        }
      },
      '27': {
        start: {
          line: 52,
          column: 6
        },
        end: {
          line: 52,
          column: 24
        }
      },
      '28': {
        start: {
          line: 55,
          column: 4
        },
        end: {
          line: 58,
          column: 5
        }
      },
      '29': {
        start: {
          line: 56,
          column: 6
        },
        end: {
          line: 56,
          column: 60
        }
      },
      '30': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 12
        }
      },
      '31': {
        start: {
          line: 60,
          column: 20
        },
        end: {
          line: 60,
          column: 32
        }
      },
      '32': {
        start: {
          line: 61,
          column: 4
        },
        end: {
          line: 63,
          column: 5
        }
      },
      '33': {
        start: {
          line: 62,
          column: 6
        },
        end: {
          line: 62,
          column: 25
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
            column: 31
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
            column: 19
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
            column: 43
          },
          end: {
            line: 47,
            column: 3
          }
        },
        line: 28
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 49,
            column: 2
          },
          end: {
            line: 49,
            column: 3
          }
        },
        loc: {
          start: {
            line: 49,
            column: 34
          },
          end: {
            line: 70,
            column: 3
          }
        },
        line: 49
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
            line: 46,
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
            line: 46,
            column: 5
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 46,
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
            line: 46,
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
            line: 46,
            column: 5
          }
        }, {
          start: {
            line: 41,
            column: 11
          },
          end: {
            line: 46,
            column: 5
          }
        }],
        line: 41
      },
      '9': {
        loc: {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 53,
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
            line: 53,
            column: 5
          }
        }, {
          start: {
            line: 50,
            column: 4
          },
          end: {
            line: 53,
            column: 5
          }
        }],
        line: 50
      },
      '10': {
        loc: {
          start: {
            line: 55,
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
            line: 55,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }, {
          start: {
            line: 55,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }],
        line: 55
      },
      '11': {
        loc: {
          start: {
            line: 61,
            column: 4
          },
          end: {
            line: 63,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 61,
            column: 4
          },
          end: {
            line: 63,
            column: 5
          }
        }, {
          start: {
            line: 61,
            column: 4
          },
          end: {
            line: 63,
            column: 5
          }
        }],
        line: 61
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
      '0': [0],
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var messagingMixin = (function (Base) {
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
        /* istanbul ignore if */
        if (typeof this.__isListening === 'undefined') {
          this.__isListening = false;
        } else {
            cov_jqnx95x11.b[0][0]++;
            cov_jqnx95x11.s[2]++;
            if (this.__isListening) {
              cov_jqnx95x11.b[1][0]++;
              cov_jqnx95x11.s[3]++;

              return;
            } else {
              cov_jqnx95x11.b[1][1]++;
            }
          }cov_jqnx95x11.s[4]++;
        if (cluster.isMaster) {
          cov_jqnx95x11.b[2][0]++;
          cov_jqnx95x11.s[5]++;

          cluster.on('message', this.receiveCommand.bind(this));
        } else {
          cov_jqnx95x11.b[2][1]++;
          cov_jqnx95x11.s[6]++;

          process.on('message', this.receiveCommand.bind(this));
        }
        cov_jqnx95x11.s[7]++;
        this.__isListening = true;
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        cov_jqnx95x11.f[2]++;
        cov_jqnx95x11.s[8]++;

        if (typeof this._commandsArray === 'undefined') {
          cov_jqnx95x11.b[3][0]++;
          cov_jqnx95x11.s[9]++;

          this._commandsArray = _.values(Commands);
        } else {
          cov_jqnx95x11.b[3][1]++;
        }
        cov_jqnx95x11.s[10]++;
        return (cov_jqnx95x11.b[4][0]++, cmd) && (cov_jqnx95x11.b[4][1]++, _.indexOf(this._commandsArray, cmd) > -1);
      }
    }, {
      key: 'receiveCommand',
      value: function receiveCommand(worker, message, handle) {
        cov_jqnx95x11.f[3]++;
        cov_jqnx95x11.s[11]++;

        if (arguments.length === 2) {
          cov_jqnx95x11.b[5][0]++;
          cov_jqnx95x11.s[12]++;

          handle = message;
          cov_jqnx95x11.s[13]++;
          message = worker;
          cov_jqnx95x11.s[14]++;
          worker = undefined;
        } else {
            cov_jqnx95x11.b[5][1]++;
            cov_jqnx95x11.s[15]++;
            if (arguments.length === 1) {
              cov_jqnx95x11.b[6][0]++;
              cov_jqnx95x11.s[16]++;

              message = worker;
              cov_jqnx95x11.s[17]++;
              worker = undefined;
            } else {
              cov_jqnx95x11.b[6][1]++;
            }
          }var cmd = (cov_jqnx95x11.s[18]++, message.cmd);
        cov_jqnx95x11.s[19]++;
        if (!this.hasCommand(cmd)) {
          cov_jqnx95x11.b[7][0]++;
          cov_jqnx95x11.s[20]++;

          console.error('Received unknown command $cmd'); // eslint-disable-line no-console
        } else {
            cov_jqnx95x11.b[7][1]++;
            cov_jqnx95x11.s[21]++;
            if (!this.hasPlugins(cmd)) {
              cov_jqnx95x11.b[8][0]++;
              cov_jqnx95x11.s[22]++;

              console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
            } else {
              cov_jqnx95x11.b[8][1]++;

              var args = (cov_jqnx95x11.s[23]++, message.args);
              cov_jqnx95x11.s[24]++;
              this.applyPlugins(cmd, { worker: worker, args: args });
            }
          }
      }
    }, {
      key: 'sendCommand',
      value: function sendCommand(worker, cmd, args) {
        cov_jqnx95x11.f[4]++;
        cov_jqnx95x11.s[25]++;

        if (arguments.length === 1) {
          cov_jqnx95x11.b[9][0]++;
          cov_jqnx95x11.s[26]++;

          cmd = worker;
          cov_jqnx95x11.s[27]++;
          worker = undefined;
        } else {
          cov_jqnx95x11.b[9][1]++;
        }

        cov_jqnx95x11.s[28]++;
        if (!this.hasCommand(cmd)) {
          cov_jqnx95x11.b[10][0]++;
          cov_jqnx95x11.s[29]++;

          console.error('Trying to send unknown command ' + cmd); // eslint-disable-line no-console
          cov_jqnx95x11.s[30]++;
          return;
        } else {
          cov_jqnx95x11.b[10][1]++;
        }

        var message = (cov_jqnx95x11.s[31]++, { cmd: cmd });
        cov_jqnx95x11.s[32]++;
        if (args) {
          cov_jqnx95x11.b[11][0]++;
          cov_jqnx95x11.s[33]++;

          message.args = args;
        } else {
          cov_jqnx95x11.b[11][1]++;
        }

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
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/mixins/index.js',
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();



var index$1 = Object.freeze({
	messaging: messagingMixin
});

var cov_2246pxsqco = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/master.js',
      hash = '34278fa589a4233db143b2729b1f8a1e86578c51',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/master.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 14
        },
        end: {
          line: 6,
          column: 42
        }
      },
      '1': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 54
        }
      },
      '2': {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 14,
          column: 5
        }
      },
      '3': {
        start: {
          line: 13,
          column: 6
        },
        end: {
          line: 13,
          column: 32
        }
      },
      '4': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 46
        }
      },
      '5': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 46
        }
      },
      '6': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 64
        }
      },
      '7': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 64
        }
      },
      '8': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 24,
          column: 6
        }
      },
      '9': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 42
        }
      },
      '10': {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 33,
          column: 25
        }
      },
      '11': {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 30
        }
      },
      '12': {
        start: {
          line: 39,
          column: 20
        },
        end: {
          line: 39,
          column: 49
        }
      },
      '13': {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 43,
          column: 5
        }
      },
      '14': {
        start: {
          line: 42,
          column: 6
        },
        end: {
          line: 42,
          column: 72
        }
      },
      '15': {
        start: {
          line: 47,
          column: 19
        },
        end: {
          line: 47,
          column: 40
        }
      },
      '16': {
        start: {
          line: 49,
          column: 4
        },
        end: {
          line: 58,
          column: 5
        }
      },
      '17': {
        start: {
          line: 50,
          column: 6
        },
        end: {
          line: 50,
          column: 58
        }
      },
      '18': {
        start: {
          line: 52,
          column: 6
        },
        end: {
          line: 52,
          column: 25
        }
      },
      '19': {
        start: {
          line: 54,
          column: 6
        },
        end: {
          line: 54,
          column: 69
        }
      },
      '20': {
        start: {
          line: 56,
          column: 6
        },
        end: {
          line: 56,
          column: 66
        }
      },
      '21': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 59
        }
      },
      '22': {
        start: {
          line: 62,
          column: 4
        },
        end: {
          line: 65,
          column: 5
        }
      },
      '23': {
        start: {
          line: 63,
          column: 6
        },
        end: {
          line: 63,
          column: 51
        }
      },
      '24': {
        start: {
          line: 64,
          column: 6
        },
        end: {
          line: 64,
          column: 64
        }
      },
      '25': {
        start: {
          line: 69,
          column: 17
        },
        end: {
          line: 69,
          column: 41
        }
      },
      '26': {
        start: {
          line: 72,
          column: 4
        },
        end: {
          line: 80,
          column: 5
        }
      },
      '27': {
        start: {
          line: 73,
          column: 6
        },
        end: {
          line: 73,
          column: 27
        }
      },
      '28': {
        start: {
          line: 75,
          column: 22
        },
        end: {
          line: 75,
          column: 123
        }
      },
      '29': {
        start: {
          line: 76,
          column: 6
        },
        end: {
          line: 78,
          column: 7
        }
      },
      '30': {
        start: {
          line: 77,
          column: 8
        },
        end: {
          line: 77,
          column: 54
        }
      },
      '31': {
        start: {
          line: 79,
          column: 6
        },
        end: {
          line: 79,
          column: 22
        }
      },
      '32': {
        start: {
          line: 82,
          column: 4
        },
        end: {
          line: 82,
          column: 26
        }
      },
      '33': {
        start: {
          line: 86,
          column: 4
        },
        end: {
          line: 88,
          column: 5
        }
      },
      '34': {
        start: {
          line: 87,
          column: 6
        },
        end: {
          line: 87,
          column: 61
        }
      },
      '35': {
        start: {
          line: 92,
          column: 16
        },
        end: {
          line: 92,
          column: 34
        }
      },
      '36': {
        start: {
          line: 93,
          column: 4
        },
        end: {
          line: 93,
          column: 56
        }
      },
      '37': {
        start: {
          line: 95,
          column: 4
        },
        end: {
          line: 95,
          column: 47
        }
      },
      '38': {
        start: {
          line: 99,
          column: 21
        },
        end: {
          line: 99,
          column: 30
        }
      },
      '39': {
        start: {
          line: 101,
          column: 4
        },
        end: {
          line: 101,
          column: 56
        }
      },
      '40': {
        start: {
          line: 103,
          column: 18
        },
        end: {
          line: 103,
          column: 45
        }
      },
      '41': {
        start: {
          line: 105,
          column: 4
        },
        end: {
          line: 107,
          column: 5
        }
      },
      '42': {
        start: {
          line: 109,
          column: 4
        },
        end: {
          line: 111,
          column: 5
        }
      },
      '43': {
        start: {
          line: 112,
          column: 4
        },
        end: {
          line: 112,
          column: 18
        }
      },
      '44': {
        start: {
          line: 114,
          column: 20
        },
        end: {
          line: 114,
          column: 49
        }
      },
      '45': {
        start: {
          line: 115,
          column: 4
        },
        end: {
          line: 117,
          column: 5
        }
      },
      '46': {
        start: {
          line: 116,
          column: 6
        },
        end: {
          line: 116,
          column: 27
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
            column: 72
          },
          end: {
            line: 28,
            column: 3
          }
        },
        line: 9
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 21,
            column: 42
          },
          end: {
            line: 21,
            column: 43
          }
        },
        loc: {
          start: {
            line: 21,
            column: 64
          },
          end: {
            line: 24,
            column: 5
          }
        },
        line: 21
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 30,
            column: 2
          },
          end: {
            line: 30,
            column: 3
          }
        },
        loc: {
          start: {
            line: 30,
            column: 19
          },
          end: {
            line: 34,
            column: 3
          }
        },
        line: 30
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 36,
            column: 2
          },
          end: {
            line: 36,
            column: 3
          }
        },
        loc: {
          start: {
            line: 36,
            column: 27
          },
          end: {
            line: 44,
            column: 3
          }
        },
        line: 36
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 46,
            column: 2
          },
          end: {
            line: 46,
            column: 3
          }
        },
        loc: {
          start: {
            line: 46,
            column: 32
          },
          end: {
            line: 59,
            column: 3
          }
        },
        line: 46
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 61,
            column: 2
          },
          end: {
            line: 61,
            column: 3
          }
        },
        loc: {
          start: {
            line: 61,
            column: 38
          },
          end: {
            line: 66,
            column: 3
          }
        },
        line: 61
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 68,
            column: 2
          },
          end: {
            line: 68,
            column: 3
          }
        },
        loc: {
          start: {
            line: 68,
            column: 20
          },
          end: {
            line: 83,
            column: 3
          }
        },
        line: 68
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 85,
            column: 2
          },
          end: {
            line: 85,
            column: 3
          }
        },
        loc: {
          start: {
            line: 85,
            column: 24
          },
          end: {
            line: 89,
            column: 3
          }
        },
        line: 85
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 91,
            column: 2
          },
          end: {
            line: 91,
            column: 3
          }
        },
        loc: {
          start: {
            line: 91,
            column: 18
          },
          end: {
            line: 96,
            column: 3
          }
        },
        line: 91
      },
      '9': {
        name: '(anonymous_9)',
        decl: {
          start: {
            line: 98,
            column: 2
          },
          end: {
            line: 98,
            column: 3
          }
        },
        loc: {
          start: {
            line: 98,
            column: 38
          },
          end: {
            line: 118,
            column: 3
          }
        },
        line: 98
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 9,
            column: 24
          },
          end: {
            line: 9,
            column: 70
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 9,
            column: 68
          },
          end: {
            line: 9,
            column: 70
          }
        }],
        line: 9
      },
      '1': {
        loc: {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 14,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 14,
            column: 5
          }
        }, {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 14,
            column: 5
          }
        }],
        line: 12
      },
      '2': {
        loc: {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 43,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 43,
            column: 5
          }
        }, {
          start: {
            line: 41,
            column: 4
          },
          end: {
            line: 43,
            column: 5
          }
        }],
        line: 41
      },
      '3': {
        loc: {
          start: {
            line: 49,
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
            line: 49,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }, {
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 58,
            column: 5
          }
        }],
        line: 49
      },
      '4': {
        loc: {
          start: {
            line: 62,
            column: 4
          },
          end: {
            line: 65,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 62,
            column: 4
          },
          end: {
            line: 65,
            column: 5
          }
        }, {
          start: {
            line: 62,
            column: 4
          },
          end: {
            line: 65,
            column: 5
          }
        }],
        line: 62
      },
      '5': {
        loc: {
          start: {
            line: 62,
            column: 8
          },
          end: {
            line: 62,
            column: 50
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 62,
            column: 8
          },
          end: {
            line: 62,
            column: 35
          }
        }, {
          start: {
            line: 62,
            column: 39
          },
          end: {
            line: 62,
            column: 50
          }
        }],
        line: 62
      },
      '6': {
        loc: {
          start: {
            line: 72,
            column: 11
          },
          end: {
            line: 72,
            column: 49
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 72,
            column: 12
          },
          end: {
            line: 72,
            column: 32
          }
        }, {
          start: {
            line: 72,
            column: 37
          },
          end: {
            line: 72,
            column: 49
          }
        }],
        line: 72
      },
      '7': {
        loc: {
          start: {
            line: 76,
            column: 6
          },
          end: {
            line: 78,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 76,
            column: 6
          },
          end: {
            line: 78,
            column: 7
          }
        }, {
          start: {
            line: 76,
            column: 6
          },
          end: {
            line: 78,
            column: 7
          }
        }],
        line: 76
      },
      '8': {
        loc: {
          start: {
            line: 105,
            column: 4
          },
          end: {
            line: 107,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 105,
            column: 4
          },
          end: {
            line: 107,
            column: 5
          }
        }],
        line: 105
      },
      '9': {
        loc: {
          start: {
            line: 109,
            column: 4
          },
          end: {
            line: 111,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 109,
            column: 4
          },
          end: {
            line: 111,
            column: 5
          }
        }],
        line: 109
      },
      '10': {
        loc: {
          start: {
            line: 115,
            column: 4
          },
          end: {
            line: 117,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 115,
            column: 4
          },
          end: {
            line: 117,
            column: 5
          }
        }, {
          start: {
            line: 115,
            column: 4
          },
          end: {
            line: 117,
            column: 5
          }
        }],
        line: 115
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var debug = (cov_2246pxsqco.s[0]++, Debug('nuxt:cluster-master'));

var Master$$1 = function (_ref) {
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
    _this.plugin(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    cov_2246pxsqco.s[7]++;
    _this.plugin(Commands.sendErrors, _this.saveErrors.bind(_this));

    cov_2246pxsqco.s[8]++;
    _this.watchdog.plugin('isWorkerAlive', function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref3) {
        var worker = _ref3.worker;
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
        return _ref4.apply(this, arguments);
      };
    }());
    /* this.watchdog.plugin('isWorkerDead', async ({ worker }) => {
      return typeof cluster.workers[worker.id] === 'undefined' || cluster.workers[worker.id].isDead()
    }) */
    return _this;
  }

  createClass(Master$$1, [{
    key: 'run',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
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
        return _ref5.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
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
        return _ref6.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref7) {
        var worker = _ref7.worker;
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
        return _ref8.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(_ref9) {
        var worker = _ref9.worker,
            args = _ref9.args;
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

      function saveErrors(_x6) {
        return _ref10.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'finished',
    value: function () {
      var _ref11 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
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
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'finished', this).call(this);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function finished() {
        return _ref11.apply(this, arguments);
      }

      return finished;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref12 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
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
        return _ref12.apply(this, arguments);
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
      var _ref13 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker, code, signal) {
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
                return this.finished();

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

      function onExit(_x7, _x8, _x9) {
        return _ref13.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}((messagingMixin(Master$2)));

var cov_1o0lmw3tts = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/worker.js',
      hash = '11161701ea100b47674768e6f3c0fa95fe65f6c6',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/worker.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 14
        },
        end: {
          line: 6,
          column: 42
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
          line: 17,
          column: 4
        },
        end: {
          line: 19,
          column: 6
        }
      },
      '4': {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 18,
          column: 62
        }
      },
      '5': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 68
        }
      },
      '6': {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 21
        }
      },
      '7': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 36
        }
      },
      '8': {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 28,
          column: 41
        }
      },
      '9': {
        start: {
          line: 32,
          column: 19
        },
        end: {
          line: 32,
          column: 23
        }
      },
      '10': {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 33,
          column: 81
        }
      },
      '11': {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 43,
          column: 5
        }
      },
      '12': {
        start: {
          line: 37,
          column: 6
        },
        end: {
          line: 37,
          column: 49
        }
      },
      '13': {
        start: {
          line: 45,
          column: 4
        },
        end: {
          line: 57,
          column: 5
        }
      },
      '14': {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 54,
          column: 8
        }
      },
      '15': {
        start: {
          line: 47,
          column: 8
        },
        end: {
          line: 47,
          column: 38
        }
      },
      '16': {
        start: {
          line: 49,
          column: 8
        },
        end: {
          line: 52,
          column: 9
        }
      },
      '17': {
        start: {
          line: 51,
          column: 10
        },
        end: {
          line: 51,
          column: 57
        }
      },
      '18': {
        start: {
          line: 53,
          column: 8
        },
        end: {
          line: 53,
          column: 20
        }
      },
      '19': {
        start: {
          line: 56,
          column: 6
        },
        end: {
          line: 56,
          column: 62
        }
      },
      '20': {
        start: {
          line: 59,
          column: 4
        },
        end: {
          line: 59,
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
            column: 24
          },
          end: {
            line: 22,
            column: 3
          }
        },
        line: 9
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 17,
            column: 44
          },
          end: {
            line: 17,
            column: 45
          }
        },
        loc: {
          start: {
            line: 17,
            column: 65
          },
          end: {
            line: 19,
            column: 5
          }
        },
        line: 17
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 24,
            column: 2
          },
          end: {
            line: 24,
            column: 3
          }
        },
        loc: {
          start: {
            line: 24,
            column: 15
          },
          end: {
            line: 29,
            column: 3
          }
        },
        line: 24
      },
      '3': {
        name: '(anonymous_3)',
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
            column: 34
          },
          end: {
            line: 60,
            column: 3
          }
        },
        line: 31
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 46,
            column: 26
          },
          end: {
            line: 46,
            column: 27
          }
        },
        loc: {
          start: {
            line: 46,
            column: 37
          },
          end: {
            line: 54,
            column: 7
          }
        },
        line: 46
      }
    },
    branchMap: {
      '0': {
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
        }],
        line: 13
      },
      '1': {
        loc: {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 57,
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
            line: 57,
            column: 5
          }
        }, {
          start: {
            line: 45,
            column: 4
          },
          end: {
            line: 57,
            column: 5
          }
        }],
        line: 45
      },
      '2': {
        loc: {
          start: {
            line: 45,
            column: 8
          },
          end: {
            line: 45,
            column: 31
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 45,
            column: 8
          },
          end: {
            line: 45,
            column: 14
          }
        }, {
          start: {
            line: 45,
            column: 18
          },
          end: {
            line: 45,
            column: 31
          }
        }],
        line: 45
      },
      '3': {
        loc: {
          start: {
            line: 49,
            column: 8
          },
          end: {
            line: 52,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 49,
            column: 8
          },
          end: {
            line: 52,
            column: 9
          }
        }, {
          start: {
            line: 49,
            column: 8
          },
          end: {
            line: 52,
            column: 9
          }
        }],
        line: 49
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var debug$2 = (cov_1o0lmw3tts.s[0]++, Debug('nuxt:cluster-worker'));

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
      _this.setWorkerId(cluster.worker.id);
    } else {
      cov_1o0lmw3tts.b[0][0]++;
    }

    cov_1o0lmw3tts.s[3]++;
    _this.generator.plugin('routeGenerated', function (_ref2) {
      var route = _ref2.route,
          path$$1 = _ref2.path;
      cov_1o0lmw3tts.f[1]++;
      cov_1o0lmw3tts.s[4]++;

      debug$2('Worker ' + _this.workerId + ' generated file: ' + path$$1);
    });

    cov_1o0lmw3tts.s[5]++;
    _this.plugin(Commands.sendRoutes, _this.generateRoutes.bind(_this));
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
      var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref4) {
        var _this2 = this;

        var args = _ref4.args;
        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cov_1o0lmw3tts.f[3]++;
                routes = (cov_1o0lmw3tts.s[9]++, args);
                cov_1o0lmw3tts.s[10]++;

                debug$2('Worker ' + this.workerId + ' received ' + routes.length + ' routes from master');

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

                    error.workerId = _this2.workerId;

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
        return _ref5.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}((messagingMixin(Worker)));

var cov_1uiervxvsl = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/cluster/index.js',
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();



var Cluster = Object.freeze({
	Master: Master$$1,
	Worker: Worker$1,
	Mixins: index$1
});

var cov_2j34fbjas0 = function () {
  var path$$1 = '/var/www/projects.github/nuxt-generate-cluster/lib/index.js',
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

  if (coverage[path$$1] && coverage[path$$1].hash === hash) {
    return coverage[path$$1];
  }

  coverageData.hash = hash;
  return coverage[path$$1] = coverageData;
}();

var index = Object.assign({}, Builder$1, Cluster, { Generate: Generate });

module.exports = index;
//# sourceMappingURL=generator.js.map
