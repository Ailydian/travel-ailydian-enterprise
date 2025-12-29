/**
 * Browser-compatible Util Polyfill
 * Minimal util implementation for client-side
 */

module.exports = {
  // promisify - converts callback-based functions to Promise-based
  promisify: (fn) => {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };
  },

  // callbackify - converts Promise-based functions to callback-based
  callbackify: (fn) => {
    return (...args) => {
      const callback = args.pop();
      fn(...args)
        .then(result => callback(null, result))
        .catch(error => callback(error));
    };
  },

  // deprecate - marks a function as deprecated
  deprecate: (fn, message) => {
    let warned = false;
    return function deprecated(...args) {
      if (!warned) {
        console.warn(message);
        warned = true;
      }
      return fn.apply(this, args);
    };
  },

  // format - basic string formatting
  format: (format, ...args) => {
    let i = 0;
    return format.replace(/%[sdifjoO]/g, (match) => {
      if (i >= args.length) return match;
      const arg = args[i++];
      switch (match) {
        case '%s': return String(arg);
        case '%d': return Number(arg);
        case '%i': return parseInt(arg, 10);
        case '%f': return parseFloat(arg);
        case '%j': return JSON.stringify(arg);
        case '%o': return String(arg);
        case '%O': return JSON.stringify(arg, null, 2);
        default: return match;
      }
    });
  },

  // inspect - object inspection
  inspect: (obj, options = {}) => {
    const depth = options.depth || 2;
    const seen = new WeakSet();

    function inspect(value, currentDepth = 0) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (typeof value === 'string') return `'${value}'`;
      if (typeof value === 'number' || typeof value === 'boolean') return String(value);
      if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`;

      if (typeof value === 'object') {
        if (seen.has(value)) return '[Circular]';
        if (currentDepth >= depth) return '[Object]';

        seen.add(value);

        if (Array.isArray(value)) {
          const items = value.map(item => inspect(item, currentDepth + 1));
          return `[ ${items.join(', ')} ]`;
        }

        const entries = Object.entries(value).map(
          ([key, val]) => `${key}: ${inspect(val, currentDepth + 1)}`
        );
        return `{ ${entries.join(', ')} }`;
      }

      return String(value);
    }

    return inspect(obj);
  },

  // inherits - basic inheritance helper
  inherits: (constructor, superConstructor) => {
    constructor.super_ = superConstructor;
    constructor.prototype = Object.create(superConstructor.prototype, {
      constructor: {
        value: constructor,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
  },

  // types helpers
  types: {
    isAsyncFunction: (fn) => fn && fn.constructor && fn.constructor.name === 'AsyncFunction',
    isGeneratorFunction: (fn) => fn && fn.constructor && fn.constructor.name === 'GeneratorFunction',
    isPromise: (obj) => obj instanceof Promise,
    isRegExp: (obj) => obj instanceof RegExp,
    isDate: (obj) => obj instanceof Date,
  },

  // TextEncoder/TextDecoder (use native if available)
  TextEncoder: typeof TextEncoder !== 'undefined' ? TextEncoder : class {
    encode(str) {
      return new Uint8Array(Array.from(str).map(char => char.charCodeAt(0)));
    }
  },

  TextDecoder: typeof TextDecoder !== 'undefined' ? TextDecoder : class {
    decode(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }
  },
};
