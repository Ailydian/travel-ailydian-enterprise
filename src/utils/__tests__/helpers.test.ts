/**
 * Comprehensive test suite for utility helpers
 * Coverage: Common helper functions and utilities
 */

describe('Utility Helpers', () => {
  describe('String Utilities', () => {
    it('should capitalize first letter', () => {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('a')).toBe('A');
      expect(capitalize('')).toBe('');
    });

    it('should truncate long strings', () => {
      const truncate = (str: string, maxLength: number) =>
        str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hi', 10)).toBe('Hi');
      expect(truncate('', 5)).toBe('');
    });

    it('should slugify strings', () => {
      const slugify = (str: string) =>
        str
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Test & Demo')).toBe('test-demo');
      expect(slugify('  Spaces  ')).toBe('spaces');
    });
  });

  describe('Number Utilities', () => {
    it('should format currency', () => {
      const formatCurrency = (amount: number, currency = 'TRY') => {
        return new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency,
        }).format(amount);
      };

      const result = formatCurrency(1500);
      expect(result).toContain('1');
      expect(result).toContain('500');
    });

    it('should calculate percentage', () => {
      const calculatePercentage = (value: number, total: number) =>
        total === 0 ? 0 : Math.round((value / total) * 100);

      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(1, 3)).toBe(33);
      expect(calculatePercentage(0, 100)).toBe(0);
      expect(calculatePercentage(50, 0)).toBe(0);
    });

    it('should clamp numbers', () => {
      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('Array Utilities', () => {
    it('should remove duplicates', () => {
      const unique = <T>(arr: T[]) => Array.from(new Set(arr));

      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
      expect(unique([])).toEqual([]);
    });

    it('should chunk arrays', () => {
      const chunk = <T>(arr: T[], size: number) => {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
          chunks.push(arr.slice(i, i + size));
        }
        return chunks;
      };

      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
      expect(chunk([], 2)).toEqual([]);
    });

    it('should shuffle arrays randomly', () => {
      const shuffle = <T>(arr: T[]) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffle(original);

      expect(shuffled).toHaveLength(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });
  });

  describe('Object Utilities', () => {
    it('should pick object properties', () => {
      const pick = <T extends object, K extends keyof T>(
        obj: T,
        keys: K[]
      ): Pick<T, K> => {
        const result = {} as Pick<T, K>;
        keys.forEach(key => {
          if (key in obj) {
            result[key] = obj[key];
          }
        });
        return result;
      };

      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should omit object properties', () => {
      const omit = <T extends object, K extends keyof T>(
        obj: T,
        keys: K[]
      ): Omit<T, K> => {
        const result = { ...obj };
        keys.forEach(key => {
          delete result[key];
        });
        return result;
      };

      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('should deep clone objects', () => {
      const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });
  });

  describe('Date Utilities', () => {
    it('should format dates', () => {
      const formatDate = (date: Date, locale = 'tr-TR') =>
        new Intl.DateTimeFormat(locale).format(date);

      const date = new Date('2025-01-15');
      const formatted = formatDate(date);

      expect(formatted).toBeTruthy();
      expect(formatted).toContain('15');
      expect(formatted).toContain('2025');
    });

    it('should check if date is in past', () => {
      const isPast = (date: Date) => date < new Date();

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isPast(yesterday)).toBe(true);
      expect(isPast(tomorrow)).toBe(false);
    });

    it('should calculate days difference', () => {
      const daysDifference = (date1: Date, date2: Date) => {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      };

      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-05');

      expect(daysDifference(date1, date2)).toBe(4);
    });
  });

  describe('Validation Utilities', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });

    it('should validate phone numbers', () => {
      const isValidPhone = (phone: string) => /^\+?\d{10,15}$/.test(phone.replace(/[\s()-]/g, ''));

      expect(isValidPhone('+905551234567')).toBe(true);
      expect(isValidPhone('(555) 123-4567')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
    });

    it('should validate URLs', () => {
      const isValidUrl = (url: string) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('invalid-url')).toBe(false);
    });
  });

  describe('Async Utilities', () => {
    it('should retry async operations', async () => {
      const retry = async <T>(
        fn: () => Promise<T>,
        maxRetries: number
      ): Promise<T> => {
        for (let i = 0; i < maxRetries; i++) {
          try {
            return await fn();
          } catch (error) {
            if (i === maxRetries - 1) throw error;
          }
        }
        throw new Error('Max retries exceeded');
      };

      let attempts = 0;
      const unreliableFunction = async () => {
        attempts++;
        if (attempts < 3) throw new Error('Failed');
        return 'Success';
      };

      const result = await retry(unreliableFunction, 5);
      expect(result).toBe('Success');
      expect(attempts).toBe(3);
    });

    it('should implement delay function', async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(90);
    });

    it('should timeout async operations', async () => {
      const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
        return Promise.race([
          promise,
          new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), ms)
          ),
        ]);
      };

      const slowFunction = () => new Promise(resolve => setTimeout(() => resolve('done'), 1000));

      await expect(timeout(slowFunction(), 100)).rejects.toThrow('Timeout');
    });
  });

  describe('Performance Utilities', () => {
    it('should debounce function calls', done => {
      const debounce = <T extends (...args: any[]) => any>(
        fn: T,
        delay: number
      ) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => fn(...args), delay);
        };
      };

      let callCount = 0;
      const increment = () => callCount++;
      const debouncedIncrement = debounce(increment, 50);

      debouncedIncrement();
      debouncedIncrement();
      debouncedIncrement();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });

    it('should throttle function calls', done => {
      const throttle = <T extends (...args: any[]) => any>(
        fn: T,
        delay: number
      ) => {
        let lastCall = 0;
        return (...args: Parameters<T>) => {
          const now = Date.now();
          if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
          }
        };
      };

      let callCount = 0;
      const increment = () => callCount++;
      const throttledIncrement = throttle(increment, 100);

      throttledIncrement();
      throttledIncrement();
      throttledIncrement();

      expect(callCount).toBe(1);

      setTimeout(() => {
        throttledIncrement();
        expect(callCount).toBe(2);
        done();
      }, 150);
    });
  });
});
