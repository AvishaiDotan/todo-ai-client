import Axios from 'axios'


export const axios = Axios.create()
const baseURL = 'http://localhost:5065/api'

export const httpService = {
  get<T>(endpoint: string, data = null) {
    return ajax<T>(endpoint, 'GET', data)
  },
  post<T>(endpoint: string, data: any) {
    return ajax<T>(endpoint, 'POST', data)
  },
  put<T>(endpoint: string, data: any) {
    return ajax<T>(endpoint, 'PUT', data)
  },
  delete(endpoint: string, data = null) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax<T>(endpoint: string, method = 'GET', data = null) {
  try {
    const res = await axios<T>({
      url: `${baseURL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })

    return res.data
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    )
    console.dir(err)
    throw err
  }
}
