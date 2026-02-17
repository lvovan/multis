/**
 * One-time storage key migration from `turbotiply_*` to `multis_*`.
 *
 * Called synchronously from `main.tsx` before React mounts.
 * Idempotent and silent on errors.
 */

/** Old → new key mappings. */
const LOCAL_STORAGE_KEYS: ReadonlyArray<[oldKey: string, newKey: string]> = [
  ['turbotiply_players', 'multis_players'],
  ['turbotiply_lang', 'multis_lang'],
];

const SESSION_STORAGE_KEYS: ReadonlyArray<[oldKey: string, newKey: string]> = [
  ['turbotiply_session', 'multis_session'],
];

/**
 * Migrate a single key from `oldKey` to `newKey` within the given storage.
 * If `newKey` already exists the old value is discarded (new-key-takes-precedence).
 */
function migrateKey(storage: Storage, oldKey: string, newKey: string): void {
  const oldValue = storage.getItem(oldKey);
  if (oldValue === null) return;

  if (storage.getItem(newKey) === null) {
    storage.setItem(newKey, oldValue);
  }
  storage.removeItem(oldKey);
}

/**
 * Migrate all known browser storage keys from the old `turbotiply_` prefix to
 * the new `multis_` prefix. Safe to call multiple times — idempotent and
 * silent on errors.
 */
export function migrateStorageKeys(): void {
  try {
    for (const [oldKey, newKey] of LOCAL_STORAGE_KEYS) {
      migrateKey(localStorage, oldKey, newKey);
    }
    for (const [oldKey, newKey] of SESSION_STORAGE_KEYS) {
      migrateKey(sessionStorage, oldKey, newKey);
    }
  } catch {
    // Storage unavailable (e.g. Safari private mode) — skip silently.
  }
}
