'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = require('fs');
var fs__default = _interopDefault(fs);
var esModuleLexer = require('es-module-lexer');
var semver = _interopDefault(require('semver'));
var recast = require('recast');
var MagicString = _interopDefault(require('magic-string'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

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
  exports.wrap = wrap;

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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
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
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
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
        context.arg = undefined$1;
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

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

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

  exports.keys = function(object) {
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

  function values(iterable) {
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

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
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
          context.arg = undefined$1;
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
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var FEAT_SUFFIX = '?monaco-features';
var isWrappedId = function isWrappedId(id, suffix) {
  return id.endsWith(suffix);
};
var wrapId = function wrapId(id, suffix) {
  return "\0" + id + suffix;
};

/**
 * Copy from https://github.com/sindresorhus/slash/blob/master/index.js
 * with MIT license
 */
var slash = function slash(path) {
  var isExtendedLengthPath = /^\\\\\?\\/.test(path);
  var hasNonAscii = /[^\u0000-\u0080]+/.test(path);

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
};

var reservedWords = /*#__PURE__*/'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'.split(' ');
var builtins = /*#__PURE__*/'Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'.split(' ');
var blacklisted = /*#__PURE__*/new Set( /*#__PURE__*/reservedWords.concat(builtins));
var illegalCharacters = /[^$_a-zA-Z0-9]/g;

var startsWithDigit = function startsWithDigit(str) {
  return /\d/.test(str[0]);
};

function makeLegal(str) {
  str = str.replace(/-(\w)/g, function (_, letter) {
    return letter.toUpperCase();
  }).replace(illegalCharacters, '_');
  if (startsWithDigit(str) || blacklisted.has(str)) str = "_" + str;
  return str || '_';
}

var REPLACE_IMPORT_REG = /\s*(['"])(.*)\1\s*$/m;
function transformImports(_x, _x2) {
  return _transformImports.apply(this, arguments);
}

function _transformImports() {
  _transformImports = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(code, cb) {
    var imports, _parse, _iterator, _step, imp, spec, importSpecifierMatch, replaced;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            imports = [];

            try {
              _parse = esModuleLexer.parse(code);
              imports = _parse[0];
            } catch (e) {// no-catch
            }

            imports = imports.filter(function (imp) {
              // import.meta.url skip
              if (imp.d === -2) {
                return false;
              }

              if (imp.d > -1) {
                return !!code.substring(imp.s, imp.e).match(REPLACE_IMPORT_REG);
              }

              return true;
            }).reverse();

            for (_iterator = _createForOfIteratorHelperLoose(imports); !(_step = _iterator()).done;) {
              imp = _step.value;
              spec = code.substring(imp.s, imp.e);

              if (imp.d > -1) {
                importSpecifierMatch = spec.match(REPLACE_IMPORT_REG);
                spec = importSpecifierMatch[2];
              }

              replaced = cb(spec);

              if (replaced !== spec) {
                if (imp.d > -1) {
                  replaced = JSON.stringify(replaced);
                }

                code = code.slice(0, imp.s) + replaced + code.slice(imp.e);
              }
            }

            return _context.abrupt("return", code);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _transformImports.apply(this, arguments);
}

var builders = recast.types.builders;
var featuresArr = [];
var languagesArr = [];
initMonaco();
/**
 * initialize monaco
 */

function initMonaco() {
  var monacoEditorPackageJsonPath = require.resolve("monaco-editor/package.json");

  try {
    initMonacoByMetadata({
      monacoEditorPackageJsonPath: monacoEditorPackageJsonPath
    });
  } catch (_unused) {
    initMonacoLegacy({
      monacoEditorPackageJsonPath: monacoEditorPackageJsonPath
    });
  }
}

function initMonacoByMetadata(_ref) {
  var monacoEditorPackageJsonPath = _ref.monacoEditorPackageJsonPath;
  var metadataFilepath = path.join(path.dirname(monacoEditorPackageJsonPath), 'esm/metadata.js');

  var metadata = require(metadataFilepath);

  if (!metadata.features || !metadata.languages) {
    throw new Error('features or languages not found in metadata');
  }

  featuresArr = metadata.features;
  languagesArr = metadata.languages;
}
/**
 * initialize monaco-editor < 0.31.0
 */


function initMonacoLegacy(_ref2) {
  var monacoEditorPackageJsonPath = _ref2.monacoEditorPackageJsonPath;

  var _JSON$parse = JSON.parse(fs__default.readFileSync(monacoEditorPackageJsonPath, 'utf-8')),
      monacoEditorVersion = _JSON$parse.version;

  var _require = require('../plugin/versionMapping'),
      versionMapping = _require.versionMapping;

  var monacoEditorVersionMappingEntries = Object.entries(versionMapping);
  var resolvedMonacoEditorVersion = null;

  for (var _i = 0, _monacoEditorVersionM = monacoEditorVersionMappingEntries; _i < _monacoEditorVersionM.length; _i++) {
    var _monacoEditorVersionM2 = _monacoEditorVersionM[_i],
        editorVersion = _monacoEditorVersionM2[0],
        monacoEditorVersionRanges = _monacoEditorVersionM2[1];

    if (monacoEditorVersionRanges.some(function (range) {
      return semver.satisfies(monacoEditorVersion, range);
    })) {
      resolvedMonacoEditorVersion = editorVersion;
      break;
    }
  }

  if (!resolvedMonacoEditorVersion) {
    throw new Error("[rollup-plugin-monaco-editor] current monaco-editor version(" + monacoEditorVersion + ") are not supported, please file a issue at\nhttps://github.com/chengcyber/rollup-plugin-monaco-editor/issues");
  }

  var editorInfoVersionFolder = "../plugin/out/" + resolvedMonacoEditorVersion.replace(/\*/g, '_x_');

  var featureJS = require(editorInfoVersionFolder + "/features.js");

  featuresArr = featureJS.featuresArr;

  var languagesJS = require(editorInfoVersionFolder + "/languages.js");

  languagesArr = languagesJS.languagesArr;
}

var featuresById = /*#__PURE__*/featuresArr.reduce(function (featuresById, feature) {
  featuresById[feature.label] = feature;
  return featuresById;
}, {});
var languagesById = /*#__PURE__*/languagesArr.reduce(function (languagesById, language) {
  languagesById[language.label] = language;
  return languagesById;
}, {});
var MONACO_ENTRY_RE = /monaco-editor[/\\]esm[/\\]vs[/\\]editor[/\\]editor.(api|main)/; // const MONACO_LANG_RE = /monaco-editor[/\\]esm[/\\]vs[/\\]language[/\\]/;
var EDITOR_MODULE = {
  label: 'editorWorkerService',
  entry: undefined,
  worker: {
    id: 'vs/editor/editor',
    entry: 'vs/editor/editor.worker'
  }
};
/**
 * Return a resolved path for a given Monaco file.
 */

function resolveMonacoPath(filePath) {
  return require.resolve(getMonacoRelativePath(filePath));
}

function getMonacoRelativePath(filePath) {
  return path.join('monaco-editor/esm', filePath + ".js");
}

function coalesce(array) {
  return array.filter(Boolean);
}

function flatArr(items) {
  return items.reduce(function (acc, item) {
    if (Array.isArray(item)) {
      return [].concat(acc).concat(item);
    }

    return [].concat(acc).concat([item]);
  }, []);
}

function getFeaturesIds(userFeatures) {
  function notContainedIn(arr) {
    return function (element) {
      return arr.indexOf(element) === -1;
    };
  }

  var featuresIds = [];

  if (userFeatures.length) {
    var excludedFeatures = userFeatures.filter(function (f) {
      return f[0] === '!';
    }).map(function (f) {
      return f.slice(1);
    });

    if (excludedFeatures.length) {
      featuresIds = Object.keys(featuresById).filter(notContainedIn(excludedFeatures));
    } else {
      featuresIds = userFeatures;
    }
  } else {
    featuresIds = Object.keys(featuresById);
  }

  return featuresIds;
}

function monaco(options) {
  if (options === void 0) {
    options = {};
  }

  var languages = options.languages || Object.keys(languagesById);
  var features = getFeaturesIds(options.features || []);
  var isESM = false;

  if ('esm' in options) {
    isESM = !!options.esm;
  }

  var languageConfigs = coalesce(languages.map(function (id) {
    return languagesById[id];
  }));
  var featureConfigs = coalesce(features.map(function (id) {
    return featuresById[id];
  }));
  var modules = [EDITOR_MODULE].concat(languageConfigs).concat(featureConfigs);
  var workers = [];
  modules.forEach(function (module) {
    if ('worker' in module && module.worker) {
      workers.push({
        label: module.label,
        id: module.worker.id,
        entry: module.worker.entry
      });
    }
  });
  var languagePaths = flatArr(coalesce(languageConfigs.map(function (language) {
    return language.entry;
  })));
  var featurePaths = flatArr(coalesce(featureConfigs.map(function (feature) {
    return feature.entry;
  })));
  var workerPaths = {};

  for (var _i2 = 0, _workers = workers; _i2 < _workers.length; _i2++) {
    var _workers$_i = _workers[_i2],
        label = _workers$_i.label,
        entry = _workers$_i.entry;
    workerPaths[label] = getMonacoRelativePath(entry);
  }

  var workerChunksEmited = false;

  function emitWorkerChunks(emitFile) {
    if (workerChunksEmited) {
      return;
    }

    workerChunksEmited = true;

    for (var _i3 = 0, _Object$entries = Object.entries(workerPaths); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = _Object$entries[_i3],
          relativePath = _Object$entries$_i[1];
      emitFile({
        type: 'chunk',
        id: require.resolve(relativePath),
        fileName: relativePath
      });
    }
  }

  var hasMonacoEntry = false;
  var shouldGenerateSourcemap = options.sourcemap !== false;

  function getMapFromCode(code) {
    if (shouldGenerateSourcemap) {
      return new MagicString(code).generateMap({
        hires: true
      });
    }

    return null;
  }

  return {
    name: 'monaco',
    options: function options(inputOptions) {
      var ret = _extends({}, inputOptions);

      var mc = inputOptions.moduleContext;

      if ('function' === typeof mc) {
        // func
        ret.moduleContext = function (id) {
          if (slash(id).indexOf('node_modules/monaco-editor') >= 0) {
            return 'self';
          }

          return mc(id);
        };
      } else if (mc && 'object' === typeof mc) {
        // { id: string }
        ret.moduleContext = function (id) {
          if (slash(id).indexOf('node_modules/monaco-editor') >= 0) {
            return 'self';
          }

          return mc[id];
        };
      } else {
        // nullish
        ret.moduleContext = function (id) {
          if (slash(id).indexOf('node_modules/monaco-editor') >= 0) {
            return 'self';
          }

          return undefined;
        };
      }

      return ret;
    },
    buildStart: function buildStart() {
      return _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return esModuleLexer.init;

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    renderChunk: function renderChunk(code, chunk, outputOptions) {
      if (!hasMonacoEntry) {
        return null;
      }

      var modifiedCode = null;
      var containsMonacoEntryModule = Array.from(this.getModuleIds()).some(function (id) {
        return MONACO_ENTRY_RE.test(id);
      });
      var isWorkerChunk = Object.values(workerPaths).includes(chunk.fileName);
      var format = outputOptions.format;

      if (containsMonacoEntryModule && !isWorkerChunk) {
        if (format === 'es' || isESM) {
          /**
           * use new Worker(xxx, { type: 'module' }) when esm
           * Case 1: new Worker(globals.MonacoEnvironment.getWorkerUrl(workerId, label));
           * Case 2: new Worker(workerUrl, { name: label });
           */
          modifiedCode = code.replace(/(?<!\/\/.*)new Worker\((.*)\);/g, function ($0, $1) {
            var ast = recast.parse($0);
            var expressionStatement = ast.program.body[0];
            var args = expressionStatement.expression.arguments;

            if (args.length === 1) {
              args.push(builders.objectExpression([builders.property('init', builders.identifier('type'), builders.literal('module'))]));
            } else if (args.length === 2) {
              var secondArg = args[1];

              if (secondArg.type === 'ObjectExpression') {
                secondArg.properties.push(builders.property('init', builders.identifier('type'), builders.literal('module')));
              }
            }

            var modifiedCode = recast.print(ast).code;
            return modifiedCode;
          });
        }

        if (chunk.isEntry) {
          // inject globals
          var pathPrefix = options.pathPrefix;

          if (!pathPrefix) {
            var dir = outputOptions.dir;

            if (!dir) {
              this.warn('rollup outputOptions.dir is missing');
            } else {
              pathPrefix = dir;

              if (!pathPrefix.startsWith('/')) {
                pathPrefix = "/" + pathPrefix;
              }
            }
          }

          if (!pathPrefix) {
            pathPrefix = '';
          }

          var globals = {
            MonacoEnvironment: "(function (paths) {\n            function stripTrailingSlash(str) {\n              return str.replace(/\\/$/, '');\n            }\n            return {\n              getWorkerUrl: function (moduleId, label) {\n                var pathPrefix = " + JSON.stringify(pathPrefix) + ";\n                var result = (pathPrefix ? stripTrailingSlash(pathPrefix) + '/' : '') + paths[label];\n                if (/^((http:)|(https:)|(file:)|(\\/\\/))/.test(result)) {\n                  var currentUrl = String(window.location);\n                  var currentOrigin = currentUrl.substr(0, currentUrl.length - window.location.hash.length - window.location.search.length - window.location.pathname.length);\n                  if (result.substring(0, currentOrigin.length) !== currentOrigin) {\n                    var js = '/*' + label + '*/importScripts(\"' + result + '\");';\n                    var blob = new Blob([js], { type: 'application/javascript' });\n                    return URL.createObjectURL(blob);\n                  }\n                }\n                return result;\n              }\n            };\n          })(" + JSON.stringify(workerPaths, null, 2) + ")"
          };
          var arr = [].concat(globals ? Object.keys(globals).map(function (key) {
            return "self[" + JSON.stringify(key) + "] = " + globals[key] + ";";
          }) : [], [modifiedCode || code]);
          modifiedCode = arr.join('\n');
        }
      }

      if (modifiedCode) {
        var map = getMapFromCode(modifiedCode);
        return {
          code: modifiedCode,
          map: map
        };
      }

      return null;
    },
    resolveId: function resolveId(importee, _importer) {
      var isFeatureProxy = isWrappedId(importee, FEAT_SUFFIX);

      if (isFeatureProxy) {
        return importee;
      }

      return null;
    },
    load: function load(id) {
      if (isWrappedId(id, FEAT_SUFFIX)) {
        var featureImportIds = featurePaths.map(function (importPath) {
          return resolveMonacoPath(importPath);
        });
        var featureImports = featureImportIds.map(function (id) {
          return "import " + JSON.stringify(id) + ";";
        }).join('\n');
        return "" + featureImports;
      }

      return null;
    },
    transform: function transform(code, id) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
        var arr, languageImportIds, hasImportRegisterLanguage, languageCodes, basicContribPath, basicContribCode, transformedCode, map;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!id.startsWith('\0')) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", null);

              case 2:
                if (path.isAbsolute(id)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", null);

              case 4:
                if (!MONACO_ENTRY_RE.test(id)) {
                  _context3.next = 30;
                  break;
                }

                hasMonacoEntry = true; // emit workers

                emitWorkerChunks(_this.emitFile);
                arr = ["import " + JSON.stringify(wrapId(id, FEAT_SUFFIX)) + ";", code]; // append languages code to editor.api

                languageImportIds = languagePaths.map(function (importPath) {
                  return resolveMonacoPath(importPath);
                });
                hasImportRegisterLanguage = false;
                _context3.next = 12;
                return Promise.all(languageImportIds.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(importId) {
                    var c;
                    return runtime_1.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return fs.promises.readFile(importId);

                          case 2:
                            c = _context2.sent.toString();
                            // 1. rename getMode to getXXXMode
                            c = c.replace(/getMode\(\)/g, function () {
                              var languageFilename = slash(importId).split('/').slice(-3, -1).join('_');
                              var langName = makeLegal(languageFilename);
                              return "get" + langName + "Mode()";
                            }); // 2. dedup import { registerLanguage } from '../_.contribution.js';

                            // 2. dedup import { registerLanguage } from '../_.contribution.js';
                            c = c.replace(/import\s+{\s+registerLanguage\s+}\s+from\s+['"]\.\.\/_\.contribution\.js['"];?/, function () {
                              hasImportRegisterLanguage = true;
                              return '';
                            }); // 3. import('./foo') -> import('$relative/foo');

                            _context2.next = 7;
                            return transformImports(c, function (spec) {
                              if (spec[0] === '.') {
                                var _spec = slash(path.relative(path.dirname(id), path.resolve(path.dirname(importId), spec)));

                                return _spec;
                              }

                              return spec;
                            });

                          case 7:
                            c = _context2.sent;
                            return _context2.abrupt("return", c);

                          case 9:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 12:
                languageCodes = _context3.sent;
                // mock the dist code src/fillers/monaco-editor-core.ts
                arr.push('var monaco_editor_core_exports = api;');

                if (!hasImportRegisterLanguage) {
                  _context3.next = 20;
                  break;
                }

                basicContribPath = resolveMonacoPath('vs/basic-languages/_.contribution');
                _context3.next = 18;
                return fs.promises.readFile(basicContribPath, 'utf-8');

              case 18:
                basicContribCode = _context3.sent;
                arr = arr.concat(basicContribCode);

              case 20:
                arr = arr.concat(languageCodes);
                transformedCode = arr.join('\n');
                /**
                 * Fix circular dependencies to transformed code
                 * FIXME: use this.parse to handle this
                 */
                // 1. dedup editor.api.js
                //   import "../../editor/editor.api.js";
                //   import "../editor/editor.api.js";
                //   import "editor/editor.api.js";

                transformedCode = transformedCode.replace(/import\s['"](?:(?:\.\.\/)+editor\/)?editor\.api\.js['"];?/g, ''); // 2. fillers/monaco-editor-core is same with editor.api, remove it
                //  import { Emitter, languages } from '../language/json/fillers/monaco-editor-core.js';
                //  import from './fillers/monaco-editor.core.js'

                transformedCode = transformedCode.replace(/import\s+.*from ['"](?:.*)\/fillers\/monaco-editor-core\.js['"];?/g, '');
                /**
                 * // 2.2 monaco_editor_core_star
                 * // src/fillers/monaco-editor-core.ts
                 * var monaco_editor_core_exports = {};
                 * __markAsModule(monaco_editor_core_exports);
                 * __reExport(monaco_editor_core_exports, monaco_editor_core_star);
                 * import * as monaco_editor_core_star from "../editor/editor.api.js";
                 * import * as monaco_editor_core_star from "../../editor/editor.api.js";
                 * import * as monaco_editor_core_star from "editor.api.js";
                 */

                transformedCode = transformedCode.replace(/var monaco_editor_core_exports = {};/g, '');
                transformedCode = transformedCode.replace(/__markAsModule\(monaco_editor_core_exports\);/g, '');
                transformedCode = transformedCode.replace(/__reExport\(monaco_editor_core_exports, monaco_editor_core_star\);/g, '');
                transformedCode = transformedCode.replace(/import\s+\*\s+as\s+monaco_editor_core_star\s+from\s+["'](?:(?:\.\.\/)+editor\/)?editor\.api\.js["'];?/g, '');
                map = getMapFromCode(transformedCode);
                return _context3.abrupt("return", {
                  code: transformedCode,
                  map: map
                });

              case 30:
                return _context3.abrupt("return", null);

              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
}

exports.default = monaco;
//# sourceMappingURL=rollup-plugin-monaco-editor.cjs.development.js.map
