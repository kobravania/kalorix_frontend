import axios from 'axios'
import { API_BASE_URL } from '../utils/env'

let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authToken = null
    }
    return Promise.reject(error)
  },
)

