const storageKey = "kelime-evreni-progress";

export function loadProgress() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveProgress(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function clearProgress() {
  localStorage.removeItem(storageKey);
}

