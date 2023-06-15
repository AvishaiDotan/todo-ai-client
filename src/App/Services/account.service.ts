import { storageService } from './storage.service'
import { httpService, axios } from './http.service'

// Attach Authorization header with token
axios.interceptors.request.use((req) => {
  req.headers.Authorization = 'Bearer ' + loadAuthToken()
  return req
})

const STORAGE_KEY = 'authToken'
const LOGGEDOUT_TIMEOUT = 1000

function getLoggedInUser(): Promise<IUser> {
  return httpService.get<IUser>('/account')
}

function registerUser(userData: IRegisterPayload): Promise<ILoginResult> {
  return httpService.post<ILoginResult>('/account/signup', userData)
}

function loginUser(credentials: ILoginCredentials): Promise<ILoginResult> {
  return httpService.post<ILoginResult>('/account/login', credentials)
}

function logoutUser(): Promise<any> {
  // return httpService.post('/account/logout', {})
  return new Promise((resolve) => setTimeout(resolve, LOGGEDOUT_TIMEOUT))
}

function saveAuthToken(token: string): void {
  storageService.saveToStorage(STORAGE_KEY, token)
}

function loadAuthToken(): string | null {
  return storageService.loadFromStorage<string>(STORAGE_KEY)
}

function clearAuthToken(): void {
  storageService.removeFromStorage(STORAGE_KEY)
}

export const accountService = {
  getLoggedInUser,
  registerUser,
  loginUser,
  logoutUser,
  saveAuthToken,
  loadAuthToken,
  clearAuthToken,
}
