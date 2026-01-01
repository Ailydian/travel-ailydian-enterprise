/**
 * Browser-compatible FS Polyfill (Empty Mock)
 * Provides no-op implementations for Node.js 'fs' module in browser
 * Prevents runtime errors when libraries accidentally import fs on client side
 */

const noop = () => {};
const noopSync = () => undefined;
const noopAsync = (callback) => {
  if (typeof callback === 'function') {
    setTimeout(() => callback(new Error('fs operations not supported in browser')), 0);
  }
};

// File system mock that returns false/undefined for all checks
module.exports = {
  // Synchronous methods - return safe defaults
  existsSync: () => false,
  readFileSync: () => {
    throw new Error('fs.readFileSync is not available in browser');
  },
  writeFileSync: () => {
    throw new Error('fs.writeFileSync is not available in browser');
  },
  mkdirSync: noop,
  readdirSync: () => [],
  statSync: () => ({
    isFile: () => false,
    isDirectory: () => false,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
    size: 0,
    mode: 0,
  }),
  unlinkSync: noop,
  rmdirSync: noop,
  renameSync: noop,
  copyFileSync: noop,
  chmodSync: noop,
  chownSync: noop,
  lstatSync: () => ({
    isFile: () => false,
    isDirectory: () => false,
    isSymbolicLink: () => false,
  }),
  realpathSync: (path) => path,
  accessSync: noop,

  // Async methods - call callback with error
  exists: (path, callback) => {
    if (typeof callback === 'function') {
      setTimeout(() => callback(false), 0);
    }
  },
  readFile: noopAsync,
  writeFile: noopAsync,
  mkdir: noopAsync,
  readdir: (path, callback) => {
    if (typeof callback === 'function') {
      setTimeout(() => callback(null, []), 0);
    }
  },
  stat: noopAsync,
  unlink: noopAsync,
  rmdir: noopAsync,
  rename: noopAsync,
  copyFile: noopAsync,
  chmod: noopAsync,
  chown: noopAsync,
  lstat: noopAsync,
  realpath: (path, callback) => {
    if (typeof callback === 'function') {
      setTimeout(() => callback(null, path), 0);
    }
  },
  access: noopAsync,

  // Promise-based API (fs.promises)
  promises: {
    readFile: () => Promise.reject(new Error('fs.promises.readFile not available in browser')),
    writeFile: () => Promise.reject(new Error('fs.promises.writeFile not available in browser')),
    mkdir: () => Promise.resolve(),
    readdir: () => Promise.resolve([]),
    stat: () => Promise.reject(new Error('fs.promises.stat not available in browser')),
    unlink: () => Promise.resolve(),
    rmdir: () => Promise.resolve(),
    rename: () => Promise.resolve(),
    copyFile: () => Promise.resolve(),
    chmod: () => Promise.resolve(),
    chown: () => Promise.resolve(),
    lstat: () => Promise.reject(new Error('fs.promises.lstat not available in browser')),
    realpath: (path) => Promise.resolve(path),
    access: () => Promise.resolve(),
  },

  // Constants
  constants: {
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    O_CREAT: 64,
    O_EXCL: 128,
    O_NOCTTY: 256,
    O_TRUNC: 512,
    O_APPEND: 1024,
    O_DIRECTORY: 65536,
    O_NOATIME: 262144,
    O_NOFOLLOW: 131072,
    O_SYNC: 1052672,
    O_DSYNC: 4096,
    O_DIRECT: 16384,
    O_NONBLOCK: 2048,
  },

  // File descriptors (mock - not functional in browser)
  open: noopAsync,
  close: noopAsync,
  read: noopAsync,
  write: noopAsync,
  fstat: noopAsync,
  openSync: () => -1,
  closeSync: noop,
  readSync: () => 0,
  writeSync: () => 0,
  fstatSync: () => ({
    isFile: () => false,
    isDirectory: () => false,
  }),

  // Streams (mock - return minimal objects)
  createReadStream: () => ({
    pipe: () => ({}),
    on: noop,
    once: noop,
    emit: noop,
    pause: noop,
    resume: noop,
    destroy: noop,
  }),
  createWriteStream: () => ({
    write: noop,
    end: noop,
    on: noop,
    once: noop,
    emit: noop,
    destroy: noop,
  }),

  // Watch (mock)
  watch: () => ({
    on: noop,
    close: noop,
  }),
  watchFile: noop,
  unwatchFile: noop,

  // Default export for CommonJS/ESM interop
  default: module.exports,
};
