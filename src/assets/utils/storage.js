const STORAGE_KEYS = Object.freeze({
  THEME: "devjobs-theme",
  ADMIN_AUTH: "devjobs-admin-auth",
  ADMIN_JOBS: "devjobs-admin-jobs",
  SAVED_JOBS: "devjobs-saved-jobs",
});

/**
 * Safely read and parse a value from localStorage.
 */
export function getStorageItem(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Safely save a JSON-serializable value.
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove a value from localStorage.
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read a plain string without JSON parsing.
 * Useful for theme and simple authentication values.
 */
export function getStorageString(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Save a plain string.
 */
export function setStorageString(key, value) {
  try {
    localStorage.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

export { STORAGE_KEYS };
