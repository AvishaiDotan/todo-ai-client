import { store } from '@/Store'

function isLoggedIn() {
  return store.getState().account.loggedUser !== null
}

function deepClone<T = any>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}

export const utilService = {
  isLoggedIn,
  deepClone,
}
