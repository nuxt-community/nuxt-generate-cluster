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

var Watchdog = function (_Tapable) {
  inherits(Watchdog, _Tapable);

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
                return this.applyPluginsWaterfall('isWorkerAlive', { worker: worker.value });

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

                // let isDead = await this.applyPluginsWaterfall('isWorkerDead', { worker: worker.value })
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
}(Tapable_1);

var waitFor = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(ms) {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve$$1) {
              setTimeout(resolve$$1, ms || 0);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function waitFor(_x) {
    return _ref.apply(this, arguments);
  };
}();



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
    return new Promise(function (resolve$$1, reject) {
      fn(function (err, routeParams) {
        if (err) {
          reject(err);
        }
        resolve$$1(routeParams);
      });
    });
  }
  var promise = fn();
  if (!promise || !(promise instanceof Promise) && typeof promise.then !== 'function') {
    promise = Promise.resolve(promise);
  }
  return promise;
}









var isWindows = /^win/.test(process.platform);





var sysSep = ___default.escapeRegExp(path.sep);




function flatRoutes(router) {
  var path$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var routes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  router.forEach(function (r) {
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

var debug$1 = Debug('nuxt:generate');

var Generator = function (_Tapable) {
  inherits(Generator, _Tapable);

  function Generator(nuxt$$1, builder) {
    classCallCheck(this, Generator);

    var _this = possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this));

    _this.nuxt = nuxt$$1;
    _this.options = nuxt$$1.options;
    _this.builder = builder;

    // Set variables
    _this.staticRoutes = path.resolve(_this.options.srcDir, 'static');
    _this.srcBuiltPath = path.resolve(_this.options.buildDir, 'dist');
    _this.distPath = path.resolve(_this.options.rootDir, _this.options.generate.dir);
    _this.distNuxtPath = path.join(_this.distPath, isUrl(_this.options.build.publicPath) ? '' : _this.options.build.publicPath);
    return _this;
  }

  createClass(Generator, [{
    key: 'generate',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$build = _ref2.build,
            build = _ref2$build === undefined ? true : _ref2$build,
            _ref2$init = _ref2.init,
            init = _ref2$init === undefined ? true : _ref2$init;

        var s, routes, errors, duration;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                s = Date.now();
                _context.next = 3;
                return this.initiate({ build: build, init: init });

              case 3:
                _context.next = 5;
                return this.initRoutes();

              case 5:
                routes = _context.sent;
                _context.next = 8;
                return this.generateRoutes(routes);

              case 8:
                errors = _context.sent;
                _context.next = 11;
                return this.postGenerate();

              case 11:
                duration = Math.round((Date.now() - s) / 100) / 10;

                this.printReport(duration, errors);

                return _context.abrupt('return', { duration: duration, errors: errors });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generate() {
        return _ref.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: 'printReport',
    value: function printReport(duration, errors) {
      debug$1('HTML Files generated in ' + duration + 's');

      if (errors.length) {
        var report = errors.map(function (_ref3) {
          var type = _ref3.type,
              route = _ref3.route,
              error = _ref3.error;

          /* istanbul ignore if */
          if (type === 'unhandled') {
            return 'Route: \'' + route + '\'\n' + error.stack;
          } else {
            return 'Route: \'' + route + '\' thrown an error: \n' + JSON.stringify(error);
          }
        });
        console.error('==== Error report ==== \n' + report.join('\n\n')); // eslint-disable-line no-console
      }
    }
  }, {
    key: 'initiate',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref5$build = _ref5.build,
            build = _ref5$build === undefined ? true : _ref5$build,
            _ref5$init = _ref5.init,
            init = _ref5$init === undefined ? true : _ref5$init;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Add flag to set process.static
                if (build) {
                  this.builder.forGenerate();
                }

                // Wait for nuxt be ready
                _context2.next = 3;
                return this.nuxt.ready();

              case 3:
                if (!build) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return this.builder.build();

              case 6:
                _context2.next = 8;
                return this.nuxt.applyPluginsAsync('generator', this);

              case 8:
                if (!init) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return this.initDist();

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initiate() {
        return _ref4.apply(this, arguments);
      }

      return initiate;
    }()
  }, {
    key: 'initRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(params) {
        var _this2 = this;

        var generateRoutes, routes;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Resolve config.generate.routes promises before generating the routes
                generateRoutes = [];

                if (!(this.options.router.mode !== 'hash')) {
                  _context3.next = 15;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return promisifyRoute(function (callback) {
                  if (typeof _this2.options.generate.routes === 'function') {
                    var promise = _this2.options.generate.routes(callback, params);
                    if (promise instanceof Promise && typeof promise.then === 'function') {
                      return promise.then(function (routes) {
                        callback(null, routes);
                      }).catch(function (e) {
                        callback(e);
                      });
                    } else {
                      return callback(null, promise);
                    }
                  } else {
                    return callback(null, _this2.options.generate.routes || []);
                  }
                });

              case 5:
                generateRoutes = _context3.sent;
                _context3.next = 8;
                return this.applyPluginsAsync('generateRoutes', { generator: this, generateRoutes: generateRoutes });

              case 8:
                _context3.next = 15;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](2);

                console.error('Could not resolve routes'); // eslint-disable-line no-console
                console.error(_context3.t0); // eslint-disable-line no-console
                throw _context3.t0;

              case 15:

                // Generate only index.html for router.mode = 'hash'
                routes = this.options.router.mode === 'hash' ? ['/'] : flatRoutes(this.options.router.routes);

                routes = this.decorateWithPayloads(routes, generateRoutes);

                return _context3.abrupt('return', routes);

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function initRoutes(_x3) {
        return _ref6.apply(this, arguments);
      }

      return initRoutes;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(routes) {
        var _this3 = this;

        var errors, _loop;

        return regenerator.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                errors = [];
                _context6.next = 3;
                return this.applyPluginsAsync('generate', { generator: this, routes: routes });

              case 3:
                _loop = /*#__PURE__*/regenerator.mark(function _loop() {
                  var n;
                  return regenerator.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          n = 0;
                          _context5.next = 3;
                          return Promise.all(routes.splice(0, _this3.options.generate.concurrency).map(function () {
                            var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref8) {
                              var route = _ref8.route,
                                  payload = _ref8.payload;
                              return regenerator.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      _context4.next = 2;
                                      return waitFor(n++ * _this3.options.generate.interval);

                                    case 2:
                                      _context4.next = 4;
                                      return _this3.generateRoute({ route: route, payload: payload, errors: errors });

                                    case 4:
                                    case 'end':
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4, _this3);
                            }));

                            return function (_x5) {
                              return _ref9.apply(this, arguments);
                            };
                          }()));

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _loop, _this3);
                });

              case 4:
                if (!routes.length) {
                  _context6.next = 8;
                  break;
                }

                return _context6.delegateYield(_loop(), 't0', 6);

              case 6:
                _context6.next = 4;
                break;

              case 8:
                _context6.next = 10;
                return this.applyPluginsAsync('generated', this);

              case 10:
                return _context6.abrupt('return', errors);

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function generateRoutes(_x4) {
        return _ref7.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }, {
    key: 'postGenerate',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var indexPath, _200Path;

        return regenerator.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                indexPath = path.join(this.distPath, 'index.html');

                if (!fsExtra.existsSync(indexPath)) {
                  _context7.next = 6;
                  break;
                }

                // Copy /index.html to /200.html for surge SPA
                // https://surge.sh/help/adding-a-200-page-for-client-side-routing
                _200Path = path.join(this.distPath, '200.html');

                if (fsExtra.existsSync(_200Path)) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 6;
                return fsExtra.copy(indexPath, _200Path);

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function postGenerate() {
        return _ref10.apply(this, arguments);
      }

      return postGenerate;
    }()
  }, {
    key: 'initDist',
    value: function () {
      var _ref11 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        var _this4 = this;

        var nojekyllPath, extraFiles;
        return regenerator.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return fsExtra.remove(this.distPath);

              case 2:
                debug$1('Destination folder cleaned');

                // Copy static and built files
                /* istanbul ignore if */

                if (!fsExtra.existsSync(this.staticRoutes)) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 6;
                return fsExtra.copy(this.staticRoutes, this.distPath);

              case 6:
                _context8.next = 8;
                return fsExtra.copy(this.srcBuiltPath, this.distNuxtPath);

              case 8:

                // Add .nojekyll file to let Github Pages add the _nuxt/ folder
                // https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
                nojekyllPath = path.resolve(this.distPath, '.nojekyll');

                fsExtra.writeFile(nojekyllPath, '');

                // Cleanup SSR related files
                extraFiles = ['index.spa.html', 'index.ssr.html', 'server-bundle.json', 'vue-ssr-client-manifest.json'].map(function (file) {
                  return path.resolve(_this4.distNuxtPath, file);
                });


                extraFiles.forEach(function (file) {
                  if (fsExtra.existsSync(file)) {
                    fsExtra.removeSync(file);
                  }
                });

                debug$1('Static & build files copied');

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function initDist() {
        return _ref11.apply(this, arguments);
      }

      return initDist;
    }()
  }, {
    key: 'decorateWithPayloads',
    value: function decorateWithPayloads(routes, generateRoutes) {
      var routeMap = {};
      // Fill routeMap for known routes
      routes.forEach(function (route) {
        routeMap[route] = {
          route: route,
          payload: null
        };
      });
      // Fill routeMap with given generate.routes
      generateRoutes.forEach(function (route) {
        // route is either a string or like {route : "/my_route/1"}
        var path$$1 = ___default.isString(route) ? route : route.route;
        routeMap[path$$1] = {
          route: path$$1,
          payload: route.payload || null
        };
      });
      return ___default.values(routeMap);
    }
  }, {
    key: 'generateRoute',
    value: function () {
      var _ref13 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(_ref12) {
        var route = _ref12.route,
            _ref12$payload = _ref12.payload,
            payload = _ref12$payload === undefined ? {} : _ref12$payload,
            _ref12$errors = _ref12.errors,
            errors = _ref12$errors === undefined ? [] : _ref12$errors;
        var html, res, minifyErr, path$$1, fullPath;
        return regenerator.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                html = void 0;
                _context9.prev = 1;
                _context9.next = 4;
                return this.nuxt.renderer.renderRoute(route, { _generate: true, payload: payload });

              case 4:
                res = _context9.sent;


                html = res.html;
                if (res.error) {
                  errors.push({ type: 'handled', route: route, error: res.error });
                }
                _context9.next = 12;
                break;

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9['catch'](1);
                return _context9.abrupt('return', errors.push({ type: 'unhandled', route: route, error: _context9.t0 }));

              case 12:

                if (this.options.generate.minify) {
                  try {
                    html = htmlMinifier.minify(html, this.options.generate.minify);
                  } catch (err) /* istanbul ignore next */{
                    minifyErr = new Error('HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ' + html);

                    errors.push({ type: 'unhandled', route: route, error: minifyErr });
                  }
                }

                path$$1 = path.join(route, path.sep, 'index.html'); // /about -> /about/index.html

                path$$1 = path$$1 === '/404/index.html' ? '/404.html' : path$$1; // /404 -> /404.html
                // debug('Generate file: ' + path)
                fullPath = path.join(this.distPath, path$$1);

                // Make sure the sub folders are created

                _context9.next = 18;
                return fsExtra.mkdirp(path.dirname(fullPath));

              case 18:
                _context9.next = 20;
                return fsExtra.writeFile(fullPath, html, 'utf8');

              case 20:
                _context9.next = 22;
                return this.applyPluginsAsync('routeGenerated', { route: route, path: path$$1 });

              case 22:
                return _context9.abrupt('return', true);

              case 23:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this, [[1, 9]]);
      }));

      function generateRoute(_x6) {
        return _ref13.apply(this, arguments);
      }

      return generateRoute;
    }()
  }]);
  return Generator;
}(Tapable);



var Builder$1 = Object.freeze({
	Generator: Generator
});

var Master$2 = function (_Tapable) {
  inherits(Master, _Tapable);

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
    _this.generator = new Generator(nuxt$$1, builder);

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
                return this.applyPluginsAsync('built', { params: params }, function () {});

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
                  this.routes = _.uniq(this.routes);
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
    key: 'finished',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(workerInfo) {
        var duration, info;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.generator.postGenerate();

              case 2:
                duration = process.hrtime(this.startTime);

                duration = Math.round((duration[0] * 1E9 + duration[1]) / 1E8) / 10;

                this.generator.printReport(duration, this.errors);

                info = {
                  duration: duration,
                  errors: this.errors,
                  workerInfo: workerInfo
                };

                if (!(this.options.generate && typeof this.options.generate.finished === 'function')) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 9;
                return this.options.generate.finished(info);

              case 9:
                if (!this.hasPlugins('finished')) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 12;
                return this.applyPluginsAsync('finished', { info: info }, function () {});

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function finished(_x4) {
        return _ref7.apply(this, arguments);
      }

      return finished;
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
}(Tapable_1);

var Worker = function (_Tapable) {
  inherits(Worker, _Tapable);

  function Worker(options) {
    classCallCheck(this, Worker);

    var _this = possibleConstructorReturn(this, (Worker.__proto__ || Object.getPrototypeOf(Worker)).call(this));

    _this.options = options;
    _this.workerId = -1;

    var nuxt$$1 = new nuxt.Nuxt(options);
    _this.generator = new Generator(nuxt$$1);
    return _this;
  }

  createClass(Worker, [{
    key: 'setWorkerId',
    value: function setWorkerId(workerId) {
      this.workerId = workerId;
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
}(Tapable_1);



var Generate = Object.freeze({
	Commands: Commands,
	Watchdog: Watchdog,
	Master: Master$2,
	Worker: Worker
});

var messagingMixin = (function (Base) {
  return function (_Base) {
    inherits(_class, _Base);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
      key: 'startListeningForMessages',
      value: function startListeningForMessages() {
        /* istanbul ignore if */
        if (cluster.isMaster) {
          cluster.on('message', this.receiveCommand.bind(this));
        } else {
          process.on('message', this.receiveCommand.bind(this));
        }
      }
    }, {
      key: 'hasCommand',
      value: function hasCommand(cmd) {
        if (typeof this._commandsArray === 'undefined') {
          this._commandsArray = _.values(Commands);
        }
        return cmd && _.indexOf(this._commandsArray, cmd) > -1;
      }
    }, {
      key: 'receiveCommand',
      value: function receiveCommand(worker, message, handle) {
        if (arguments.length === 2) {
          handle = message;
          message = worker;
          worker = undefined;
        } else if (arguments.length === 1) {
          message = worker;
          worker = undefined;
        }

        var cmd = message.cmd;
        if (!this.hasCommand(cmd)) {
          console.error('Received unknown command $cmd'); // eslint-disable-line no-console
        } else if (!this.hasPlugins(cmd)) {
          console.error('No handler registered for command ' + cmd); // eslint-disable-line no-console
        } else {
          var args = message.args;
          this.applyPlugins(cmd, { worker: worker, args: args });
        }
      }
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

        var message = { cmd: cmd };
        if (args) {
          message.args = args;
        }

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
	messaging: messagingMixin
});

var debug = Debug('nuxt:cluster-master');

var Master$$1 = function (_messagingMixin) {
  inherits(Master$$1, _messagingMixin);

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

    _this.plugin(Commands.sendRoutes, _this.sendRoutes.bind(_this));
    _this.plugin(Commands.sendErrors, _this.saveErrors.bind(_this));

    _this.watchdog.plugin('isWorkerAlive', function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref2) {
        var worker = _ref2.worker;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', cluster.workers[worker.id] !== 'undefined' && cluster.workers[worker.id].isConnected());

              case 1:
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
    /* this.watchdog.plugin('isWorkerDead', async ({ worker }) => {
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
        return _ref5.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'sendRoutes',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref6) {
        var worker = _ref6.worker;
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
        return _ref7.apply(this, arguments);
      }

      return sendRoutes;
    }()
  }, {
    key: 'saveErrors',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(_ref8) {
        var worker = _ref8.worker,
            args = _ref8.args;
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

      function saveErrors(_x6) {
        return _ref9.apply(this, arguments);
      }

      return saveErrors;
    }()
  }, {
    key: 'finished',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
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
                return get(Master$$1.prototype.__proto__ || Object.getPrototypeOf(Master$$1.prototype), 'finished', this).call(this);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function finished() {
        return _ref10.apply(this, arguments);
      }

      return finished;
    }()
  }, {
    key: 'startWorkers',
    value: function () {
      var _ref11 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
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
        return _ref11.apply(this, arguments);
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
      var _ref12 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(worker, code, signal) {
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
                return this.finished();

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onExit(_x7, _x8, _x9) {
        return _ref12.apply(this, arguments);
      }

      return onExit;
    }()
  }]);
  return Master$$1;
}(messagingMixin(Master$2));

var debug$2 = Debug('nuxt:cluster-worker');

var Worker$1 = function (_messagingMixin) {
  inherits(Worker$$1, _messagingMixin);

  function Worker$$1(options) {
    classCallCheck(this, Worker$$1);

    /* istanbul ignore if */
    var _this = possibleConstructorReturn(this, (Worker$$1.__proto__ || Object.getPrototypeOf(Worker$$1)).call(this, options));

    if (cluster.isWorker) {
      _this.setWorkerId(cluster.worker.id);
    }

    _this.generator.plugin('routeGenerated', function (_ref) {
      var route = _ref.route,
          path$$1 = _ref.path;

      debug$2('Worker ' + _this.workerId + ' generated file: ' + path$$1);
    });

    _this.plugin(Commands.sendRoutes, _this.generateRoutes.bind(_this));
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
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref3) {
        var _this2 = this;

        var args = _ref3.args;
        var routes, errors;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                routes = args;

                debug$2('Worker ' + this.workerId + ' received ' + routes.length + ' routes from master');

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

                /* istanbul ignore if */
                if (cluster.isWorker) {
                  process.exit(1);
                }

              case 12:

                if (errors && errors.length) {
                  errors = errors.map(function (error) {
                    error.workerId = _this2.workerId;

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
        return _ref4.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }]);
  return Worker$$1;
}(messagingMixin(Worker));



var Cluster = Object.freeze({
	Master: Master$$1,
	Worker: Worker$1,
	Mixins: index$1
});

var index = Object.assign({}, Builder$1, Cluster, { Generate: Generate });

module.exports = index;
//# sourceMappingURL=generator.js.map
