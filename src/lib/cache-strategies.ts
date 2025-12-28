import NodeCache from 'node-cache';

// Cache konfigürasyonları
import { logger } from '../lib/logger/winston';
const cacheConfig = {
  // Destinasyon verileri için - 30 dakika
  destinations: new NodeCache({ 
    stdTTL: 1800, 
    checkperiod: 300,
    useClones: false 
  }),
  
  // Kullanıcı verileri için - 15 dakika
  users: new NodeCache({ 
    stdTTL: 900, 
    checkperiod: 180,
    useClones: false 
  }),
  
  // API çağrıları için - 5 dakika
  api: new NodeCache({ 
    stdTTL: 300, 
    checkperiod: 60,
    useClones: false 
  }),
  
  // Statik içerik için - 1 saat
  static: new NodeCache({ 
    stdTTL: 3600, 
    checkperiod: 600,
    useClones: false 
  }),

  // AI önerileri için - 10 dakika
  ai: new NodeCache({ 
    stdTTL: 600, 
    checkperiod: 120,
    useClones: false 
  })
};

// Cache yardımcı fonksiyonlar
export class CacheManager {
  static get<T>(cacheType: keyof typeof cacheConfig, key: string): T | undefined {
    return cacheConfig[cacheType].get<T>(key);
  }

  static set<T>(cacheType: keyof typeof cacheConfig, key: string, value: T, ttl?: number): boolean {
    if (ttl !== undefined) {
      return cacheConfig[cacheType].set(key, value, ttl);
    } else {
      return cacheConfig[cacheType].set(key, value);
    }
  }

  static del(cacheType: keyof typeof cacheConfig, key: string): number {
    return cacheConfig[cacheType].del(key);
  }

  static flush(cacheType: keyof typeof cacheConfig): void {
    cacheConfig[cacheType].flushAll();
  }

  static getStats(cacheType: keyof typeof cacheConfig) {
    return cacheConfig[cacheType].getStats();
  }

  // Advanced cache operations
  static async getOrSet<T>(
    cacheType: keyof typeof cacheConfig,
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(cacheType, key);
    if (cached !== undefined) {
      return cached;
    }

    const data = await fetcher();
    this.set(cacheType, key, data, ttl);
    return data;
  }

  // Cache warming
  static async warmCache<T>(
    cacheType: keyof typeof cacheConfig,
    entries: Array<{ key: string; fetcher: () => Promise<T>; ttl?: number }>
  ): Promise<void> {
    const promises = entries.map(async ({ key, fetcher, ttl }) => {
      try {
        const data = await fetcher();
        this.set(cacheType, key, data, ttl);
      } catch (error) {
        logger.error(`Cache warming failed for key: ${key}`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  // Cache invalidation patterns
  static invalidatePattern(cacheType: keyof typeof cacheConfig, pattern: string): number {
    const cache = cacheConfig[cacheType];
    const keys = cache.keys().filter(key => key.includes(pattern));
    return cache.del(keys);
  }

  // Performance monitoring
  static getCacheHealth() {
    const health = {} as Record<string, any>;
    
    Object.entries(cacheConfig).forEach(([type, cache]) => {
      const stats = cache.getStats();
      health[type] = {
        ...stats,
        hitRate: stats.hits / (stats.hits + stats.misses) || 0,
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 // MB
      };
    });

    return health;
  }
}

// Browser cache utilities
export class BrowserCache {
  // LocalStorage with expiration
  static set(key: string, data: any, expirationMinutes: number): void {
    const expirationTime = new Date().getTime() + (expirationMinutes * 60 * 1000);
    const item = {
      data,
      expiration: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiration) {
        localStorage.removeItem(key);
        return null;
      }
      return item.data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  // SessionStorage utilities
  static setSession(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static getSession<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      sessionStorage.removeItem(key);
      return null;
    }
  }

  // IndexedDB for large data
  static async setIndexedDB(storeName: string, key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('LyDianCache', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.put({ id: key, data, timestamp: Date.now() });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      };
    });
  }
}

export default CacheManager;