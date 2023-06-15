function saveToStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T = string>(key: string): T | null {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T) : null
}

function removeFromStorage(key: string): void {
  localStorage.removeItem(key)
}

export const storageService = {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
}
