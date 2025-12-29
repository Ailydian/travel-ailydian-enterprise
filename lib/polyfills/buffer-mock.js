/**
 * Browser-compatible Buffer Polyfill
 * Minimal Buffer implementation for client-side
 */

class BufferMock {
  constructor(data, encoding = 'utf8') {
    if (typeof data === 'number') {
      this.data = new Uint8Array(data);
    } else if (typeof data === 'string') {
      this.data = new TextEncoder().encode(data);
    } else if (data instanceof Uint8Array || Array.isArray(data)) {
      this.data = new Uint8Array(data);
    } else {
      this.data = new Uint8Array(0);
    }
    this.length = this.data.length;
  }

  toString(encoding = 'utf8') {
    if (encoding === 'hex') {
      return Array.from(this.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    if (encoding === 'base64') {
      return btoa(String.fromCharCode.apply(null, this.data));
    }
    // utf8 default
    return new TextDecoder().decode(this.data);
  }

  static from(data, encoding = 'utf8') {
    return new BufferMock(data, encoding);
  }

  static alloc(size) {
    return new BufferMock(size);
  }

  static isBuffer(obj) {
    return obj instanceof BufferMock;
  }
}

module.exports = {
  Buffer: BufferMock,
};
