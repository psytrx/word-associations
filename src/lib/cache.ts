export function createKeyValueCache<TValue>() {
  const cache: Record<string, TValue> = {};

  return {
    set(key: string, value: TValue) {
      cache[key] = value;
    },

    get(key: string) {
      return cache[key] || null;
    }
  };
}
