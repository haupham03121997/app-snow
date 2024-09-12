import axios from 'axios'

import { API_URL } from '@constants/config'
import { getLocalStorage } from '@utils'

const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

fetcher.interceptors.request.use((config) => {
  const token = getLocalStorage('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default fetcher
