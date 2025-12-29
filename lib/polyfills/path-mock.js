/**
 * Browser-compatible Path Polyfill
 * Full implementation of Node.js 'path' module for browser
 * Supports both POSIX and Windows path operations
 */

const POSIX_SEPARATOR = '/';
const WIN32_SEPARATOR = '\\';

// Detect if running in browser
const isBrowser = typeof window !== 'undefined';

/**
 * Normalize path - remove redundant separators and resolve '..' and '.'
 */
function normalizePath(path, win32 = false) {
  const sep = win32 ? WIN32_SEPARATOR : POSIX_SEPARATOR;
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }

  if (path.length === 0) return '.';

  const isAbsolute = win32
    ? /^([a-zA-Z]:)?[\\\/]/.test(path)
    : path.charCodeAt(0) === 47; // '/'

  const trailingSeparator = path.charCodeAt(path.length - 1) === (win32 ? 92 : 47);

  // Normalize separators
  path = path.replace(win32 ? /\//g : /\\/g, sep);

  const segments = path.split(sep).filter(Boolean);
  const result = [];

  for (const segment of segments) {
    if (segment === '.') continue;
    if (segment === '..') {
      if (result.length > 0 && result[result.length - 1] !== '..') {
        result.pop();
      } else if (!isAbsolute) {
        result.push('..');
      }
    } else {
      result.push(segment);
    }
  }

  let normalized = (isAbsolute ? sep : '') + result.join(sep);
  if (trailingSeparator && normalized.length > 1) {
    normalized += sep;
  }

  return normalized || '.';
}

/**
 * Join path segments
 */
function join(...segments) {
  if (segments.length === 0) return '.';

  // Filter out empty segments and join
  const joined = segments
    .filter(segment => segment != null && segment !== '')
    .join(POSIX_SEPARATOR);

  return normalizePath(joined, false);
}

/**
 * Resolve absolute path
 */
function resolve(...segments) {
  let resolvedPath = '';
  let resolvedAbsolute = false;

  for (let i = segments.length - 1; i >= 0 && !resolvedAbsolute; i--) {
    const path = segments[i];
    if (typeof path !== 'string' || path.length === 0) continue;

    resolvedPath = path + POSIX_SEPARATOR + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === 47; // '/'
  }

  if (!resolvedAbsolute) {
    resolvedPath = POSIX_SEPARATOR + resolvedPath;
  }

  return normalizePath(resolvedPath, false);
}

/**
 * Get directory name
 */
function dirname(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  if (path.length === 0) return '.';

  const lastSlash = path.lastIndexOf(POSIX_SEPARATOR);
  if (lastSlash === -1) return '.';
  if (lastSlash === 0) return POSIX_SEPARATOR;

  return path.slice(0, lastSlash);
}

/**
 * Get base name
 */
function basename(path, ext) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }

  let base = path.split(POSIX_SEPARATOR).pop() || '';

  if (ext && base.endsWith(ext)) {
    base = base.slice(0, -ext.length);
  }

  return base;
}

/**
 * Get file extension
 */
function extname(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }

  const base = basename(path);
  const lastDot = base.lastIndexOf('.');

  if (lastDot === -1 || lastDot === 0) return '';

  return base.slice(lastDot);
}

/**
 * Check if path is absolute
 */
function isAbsolute(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  return path.length > 0 && path.charCodeAt(0) === 47; // '/'
}

/**
 * Get relative path from 'from' to 'to'
 */
function relative(from, to) {
  if (typeof from !== 'string' || typeof to !== 'string') {
    throw new TypeError('Paths must be strings');
  }

  if (from === to) return '';

  from = resolve(from);
  to = resolve(to);

  if (from === to) return '';

  const fromParts = from.split(POSIX_SEPARATOR).filter(Boolean);
  const toParts = to.split(POSIX_SEPARATOR).filter(Boolean);

  let commonLength = 0;
  const minLength = Math.min(fromParts.length, toParts.length);

  for (let i = 0; i < minLength; i++) {
    if (fromParts[i] !== toParts[i]) break;
    commonLength++;
  }

  const upCount = fromParts.length - commonLength;
  const remainingToParts = toParts.slice(commonLength);

  const parts = Array(upCount).fill('..').concat(remainingToParts);
  return parts.join(POSIX_SEPARATOR) || '.';
}

/**
 * Parse path into components
 */
function parse(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }

  const ret = {
    root: '',
    dir: '',
    base: '',
    ext: '',
    name: ''
  };

  if (path.length === 0) return ret;

  const isAbsolutePath = path.charCodeAt(0) === 47;

  if (isAbsolutePath) {
    ret.root = POSIX_SEPARATOR;
  }

  ret.base = basename(path);
  ret.ext = extname(path);
  ret.name = ret.base.slice(0, ret.base.length - ret.ext.length);
  ret.dir = dirname(path);

  return ret;
}

/**
 * Format path object into string
 */
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== 'object') {
    throw new TypeError('pathObject must be an object');
  }

  const dir = pathObject.dir || pathObject.root || '';
  const base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');

  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;

  return dir + POSIX_SEPARATOR + base;
}

// POSIX implementation
const posix = {
  sep: POSIX_SEPARATOR,
  delimiter: ':',
  normalize: (path) => normalizePath(path, false),
  join,
  resolve,
  isAbsolute,
  relative,
  dirname,
  basename,
  extname,
  parse,
  format,
};

// Win32 implementation (simplified for browser)
const win32 = {
  sep: WIN32_SEPARATOR,
  delimiter: ';',
  normalize: (path) => normalizePath(path, true),
  join: (...segments) => {
    const joined = segments.filter(s => s != null && s !== '').join(WIN32_SEPARATOR);
    return normalizePath(joined, true);
  },
  resolve,
  isAbsolute: (path) => /^([a-zA-Z]:)?[\\\/]/.test(path),
  relative,
  dirname,
  basename,
  extname,
  parse,
  format,
};

// Export main interface (defaults to POSIX in browser)
module.exports = {
  sep: POSIX_SEPARATOR,
  delimiter: ':',
  normalize: posix.normalize,
  join,
  resolve,
  isAbsolute,
  relative,
  dirname,
  basename,
  extname,
  parse,
  format,
  posix,
  win32,

  // Browser-specific helpers
  _isBrowser: isBrowser,
  _makeLong: (path) => path, // No-op in browser
  toNamespacedPath: (path) => path, // No-op in browser
};
