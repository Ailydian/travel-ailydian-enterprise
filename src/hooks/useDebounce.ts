import { useState, useEffect } from 'react';

/**
 * Debounce hook - değer belirli bir süre sonra günceller
 * Arama gibi işlemler için performansı artırır
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Belirtilen gecikme süresi kadar bekle
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Temizleme: eğer değer tekrar değişirse önceki timeout'u iptal et
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;