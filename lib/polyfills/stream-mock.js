/**
 * Browser-compatible Stream Polyfill
 * Minimal stream implementation for client-side
 */

class StreamMock {
  constructor() {
    this.readable = false;
    this.writable = false;
  }

  pipe(destination) {
    return destination;
  }

  on(event, handler) {
    return this;
  }

  once(event, handler) {
    return this;
  }

  emit(event, ...args) {
    return false;
  }

  destroy() {
    return this;
  }
}

class ReadableMock extends StreamMock {
  constructor() {
    super();
    this.readable = true;
  }
}

class WritableMock extends StreamMock {
  constructor() {
    super();
    this.writable = true;
  }

  write(chunk, encoding, callback) {
    if (callback) callback();
    return true;
  }

  end(chunk, encoding, callback) {
    if (callback) callback();
    return this;
  }
}

class DuplexMock extends StreamMock {
  constructor() {
    super();
    this.readable = true;
    this.writable = true;
  }

  write(chunk, encoding, callback) {
    if (callback) callback();
    return true;
  }

  end(chunk, encoding, callback) {
    if (callback) callback();
    return this;
  }
}

class TransformMock extends DuplexMock {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk);
  }
}

class PassThroughMock extends TransformMock {}

module.exports = {
  Stream: StreamMock,
  Readable: ReadableMock,
  Writable: WritableMock,
  Duplex: DuplexMock,
  Transform: TransformMock,
  PassThrough: PassThroughMock,
  pipeline: (...args) => {
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
      callback();
    }
  },
};
