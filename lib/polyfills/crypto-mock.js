/**
 * Browser-compatible Crypto Polyfill
 * Provides basic crypto functionality using Web Crypto API
 * For use in client-side bundles only
 */

module.exports = {
  // Use browser's Web Crypto API for random bytes
  randomBytes: (size) => {
    if (typeof window !== 'undefined' && window.crypto) {
      const buffer = new Uint8Array(size);
      window.crypto.getRandomValues(buffer);
      return {
        toString: (encoding) => {
          if (encoding === 'hex') {
            return Array.from(buffer)
              .map(b => b.toString(16).padStart(2, '0'))
              .join('');
          }
          if (encoding === 'base64') {
            return btoa(String.fromCharCode.apply(null, buffer));
          }
          return buffer;
        },
      };
    }
    // Fallback for non-browser environments
    return {
      toString: () => Math.random().toString(36).substring(2, 15),
    };
  },

  // Simple hash using SubtleCrypto (async)
  createHash: (algorithm) => {
    const data = [];
    return {
      update: (chunk) => {
        data.push(chunk);
        return this;
      },
      digest: async (encoding) => {
        if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
          const buffer = new TextEncoder().encode(data.join(''));
          const hashBuffer = await window.crypto.subtle.digest(
            algorithm === 'sha256' ? 'SHA-256' : 'SHA-1',
            buffer
          );
          const hashArray = Array.from(new Uint8Array(hashBuffer));

          if (encoding === 'hex') {
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          }
          if (encoding === 'base64') {
            return btoa(String.fromCharCode.apply(null, hashArray));
          }
          return hashArray;
        }
        // Fallback: simple hash
        const str = data.join('');
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return encoding === 'hex'
          ? Math.abs(hash).toString(16)
          : btoa(Math.abs(hash).toString());
      },
    };
  },

  // Timing-safe comparison (basic implementation)
  timingSafeEqual: (a, b) => {
    if (!(a instanceof Buffer) || !(b instanceof Buffer)) {
      throw new TypeError('Arguments must be Buffer instances');
    }
    if (a.length !== b.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a[i] ^ b[i];
    }
    return result === 0;
  },

  // Random UUID generation
  randomUUID: () => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    // Fallback UUID v4 generation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // Constants
  constants: {
    RSA_PKCS1_PADDING: 1,
    RSA_PKCS1_OAEP_PADDING: 4,
  },
};
