import Axios, { AxiosRequestConfig } from 'axios'
export const axios = Axios.create()
const baseURL = import.meta.env.DEV
  ? 'http://localhost:5065/api' // Development URL
  : 'http://161.35.66.28/api'   // Production URL

export const httpService = {
  get<T>(endpoint: string, data = null, options?: AxiosRequestConfig) {
    return ajax<T>(endpoint, 'GET', data, options)
  },
  post<T>(endpoint: string, data: any, options?: AxiosRequestConfig) {
    return ajax<T>(endpoint, 'POST', data, options)
  },
  put<T>(endpoint: string, data: any, options?: AxiosRequestConfig) {
    return ajax<T>(endpoint, 'PUT', data, options)
  },
  delete(endpoint: string, data = null, options?: AxiosRequestConfig) {
    return ajax(endpoint, 'DELETE', data, options)
  },
}

async function ajax<T>(
  endpoint: string,
  method = 'GET',
  data = null,
  options?: AxiosRequestConfig
) {
  try {
    const res = await axios<T>({
      url: `${baseURL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
      ...options,
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
