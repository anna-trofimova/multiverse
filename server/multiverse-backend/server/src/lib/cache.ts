// This class reduce API time calls
// Stores values with an expiration time.

export class Cache<V> {
    private store = new Map<string, {value: V; expires: number}>();

    constructor (private defaultTtlMs: number) {}


  /**
   * Retrieves a cached value if it exists and hasn't expired.
   * Returns undefined otherwise.
   */

    get(key: string): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    const expired = Date.now() > entry.expires;
    if (expired) {
      this.store.delete(key); 
      return undefined;
    }
    return entry.value;
  }

    set(key: string, value: V, ttlMs?: number) {
        this.store.set(key, { value, expires: Date.now() + (ttlMs ?? this.defaultTtlMs) });
    }

    // Clears all entries 
    clear() { this.store.clear(); }

}