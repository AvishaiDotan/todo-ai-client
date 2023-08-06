import { storageService } from './storage.service'
import { store } from '@/Store'

const ID_GENERATOR_KEY = 'lastIdGenerator'
let idGenerator = storageService.loadFromStorage<number>(ID_GENERATOR_KEY) || 1

function isLoggedIn() {
  return store.getState().account.loggedUser !== null
}

function deepClone<T = any>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}

function generateId() {
  idGenerator++
  storageService.saveToStorage(ID_GENERATOR_KEY, idGenerator)
  return idGenerator
}

export const utilService = {
  isLoggedIn,
  deepClone,
  generateId,
}
