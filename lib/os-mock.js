/**
 * Browser-compatible OS Polyfill
 * Enhanced mock implementation for Node.js 'os' module in browser
 * Provides realistic values and proper type signatures
 */

// Detect actual browser environment details
const getBrowserPlatform = () => {
  if (typeof navigator === 'undefined') return 'browser';
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('win')) return 'win32';
  if (userAgent.includes('mac')) return 'darwin';
  if (userAgent.includes('linux')) return 'linux';
  return 'browser';
};

const getBrowserArch = () => {
  if (typeof navigator === 'undefined') return 'x64';
  // Try to detect architecture from platform
  const platform = navigator.platform?.toLowerCase() || '';
  if (platform.includes('arm')) return 'arm64';
  if (platform.includes('64')) return 'x64';
  return 'x64';
};

module.exports = {
  // Platform detection
  platform: () => getBrowserPlatform(),

  // OS type
  type: () => 'Browser',

  // OS release (browser version if available)
  release: () => {
    if (typeof navigator === 'undefined') return '';
    const match = navigator.userAgent.match(/Chrome\/(\d+)/);
    return match ? match[1] : '';
  },

  // CPU architecture
  arch: () => getBrowserArch(),

  // Temporary directory
  tmpdir: () => '/tmp',

  // Home directory
  homedir: () => {
    if (typeof process !== 'undefined' && process.env?.HOME) {
      return process.env.HOME;
    }
    return '/home';
  },

  // Hostname
  hostname: () => {
    if (typeof window !== 'undefined') {
      return window.location?.hostname || 'localhost';
    }
    return 'localhost';
  },

  // CPU endianness
  endianness: () => {
    // Detect endianness using TypedArray
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256 ? 'LE' : 'BE';
  },

  // CPU information (mock)
  cpus: () => {
    const cores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency
      : 4;

    return Array(cores).fill({
      model: 'Browser CPU',
      speed: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0,
      },
    });
  },

  // Network interfaces (mock)
  networkInterfaces: () => ({}),

  // End of line marker
  EOL: '\n',

  // OS constants
  constants: {
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGTERM: 15,
    },
    errno: {},
  },

  // Total memory (use performance API if available)
  totalmem: () => {
    if (typeof performance !== 'undefined' && performance.memory) {
      return performance.memory.jsHeapSizeLimit || 0;
    }
    return 0;
  },

  // Free memory (use performance API if available)
  freemem: () => {
    if (typeof performance !== 'undefined' && performance.memory) {
      return (performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize) || 0;
    }
    return 0;
  },

  // Load average (always [0, 0, 0] in browser)
  loadavg: () => [0, 0, 0],

  // System uptime (use performance.now() as approximation)
  uptime: () => {
    if (typeof performance !== 'undefined') {
      return Math.floor(performance.now() / 1000);
    }
    return 0;
  },

  // User information
  userInfo: (options = {}) => {
    const username = typeof process !== 'undefined' && process.env?.USER
      ? process.env.USER
      : 'user';

    const homedir = typeof process !== 'undefined' && process.env?.HOME
      ? process.env.HOME
      : '/home';

    return {
      username,
      uid: -1,
      gid: -1,
      shell: null,
      homedir,
    };
  },

  // Priority constants (for compatibility)
  getPriority: () => 0,
  setPriority: () => {},

  // Additional Node.js 18+ methods (for forward compatibility)
  version: () => 'browser',
  machine: () => 'x86_64',
  devNull: '/dev/null',

  // Deprecated but may be used by old packages
  tmpDir: () => '/tmp', // Alias for tmpdir()
};
