/**
 * Browser-compatible Buffer Polyfill
 * Full Buffer API implementation compatible with Node.js buffer package
 */

// Use native buffer package if available (from webpack ProvidePlugin)
if (typeof globalThis.Buffer !== 'undefined') {
  module.exports = globalThis.Buffer;
  module.exports.Buffer = globalThis.Buffer;
} else {
  // Fallback implementation
  class BufferMock extends Uint8Array {
    constructor(data, encodingOrOffset, length) {
      if (typeof data === 'number') {
        // Buffer.alloc(size)
        super(data);
      } else if (typeof data === 'string') {
        // Buffer.from(string, encoding)
        const bytes = new TextEncoder().encode(data);
        super(bytes);
      } else if (data instanceof ArrayBuffer) {
        super(data, encodingOrOffset, length);
      } else if (ArrayBuffer.isView(data)) {
        super(data.buffer, data.byteOffset, data.byteLength);
      } else if (Array.isArray(data)) {
        super(data);
      } else {
        super(0);
      }
    }

    toString(encoding = 'utf8') {
      if (encoding === 'hex') {
        return Array.from(this)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      }
      if (encoding === 'base64') {
        const str = String.fromCharCode.apply(null, Array.from(this));
        return typeof btoa !== 'undefined' ? btoa(str) : str;
      }
      // utf8/utf-8/ascii default
      return new TextDecoder().decode(this);
    }

    toJSON() {
      return {
        type: 'Buffer',
        data: Array.from(this)
      };
    }

    equals(other) {
      if (!BufferMock.isBuffer(other)) return false;
      if (this.length !== other.length) return false;
      for (let i = 0; i < this.length; i++) {
        if (this[i] !== other[i]) return false;
      }
      return true;
    }

    compare(other) {
      if (!BufferMock.isBuffer(other)) {
        throw new TypeError('Argument must be a Buffer');
      }
      const len = Math.min(this.length, other.length);
      for (let i = 0; i < len; i++) {
        if (this[i] !== other[i]) {
          return this[i] < other[i] ? -1 : 1;
        }
      }
      return this.length - other.length;
    }

    copy(target, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
      const len = Math.min(sourceEnd - sourceStart, target.length - targetStart);
      for (let i = 0; i < len; i++) {
        target[targetStart + i] = this[sourceStart + i];
      }
      return len;
    }

    slice(start, end) {
      const result = super.slice(start, end);
      Object.setPrototypeOf(result, BufferMock.prototype);
      return result;
    }

    // Static methods
    static from(data, encodingOrOffset, length) {
      return new BufferMock(data, encodingOrOffset, length);
    }

    static alloc(size, fill, encoding) {
      const buf = new BufferMock(size);
      if (fill !== undefined) {
        if (typeof fill === 'string') {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      }
      return buf;
    }

    static allocUnsafe(size) {
      return new BufferMock(size);
    }

    static allocUnsafeSlow(size) {
      return new BufferMock(size);
    }

    static isBuffer(obj) {
      return obj instanceof BufferMock || obj instanceof Uint8Array;
    }

    static isEncoding(encoding) {
      return ['utf8', 'utf-8', 'hex', 'base64', 'ascii', 'binary', 'ucs2', 'utf16le'].includes(encoding);
    }

    static byteLength(string, encoding = 'utf8') {
      if (typeof string !== 'string') return string.length;
      return new TextEncoder().encode(string).length;
    }

    static concat(list, totalLength) {
      if (!Array.isArray(list)) {
        throw new TypeError('list argument must be an Array');
      }

      if (list.length === 0) {
        return new BufferMock(0);
      }

      let length = 0;
      for (const buf of list) {
        length += buf.length;
      }

      const result = new BufferMock(totalLength !== undefined ? totalLength : length);
      let pos = 0;
      for (const buf of list) {
        buf.copy(result, pos);
        pos += buf.length;
      }

      return result;
    }

    static compare(a, b) {
      if (!BufferMock.isBuffer(a) || !BufferMock.isBuffer(b)) {
        throw new TypeError('Arguments must be Buffers');
      }
      return a.compare(b);
    }
  }

  // Export as both default and named export
  module.exports = BufferMock;
  module.exports.Buffer = BufferMock;
}
