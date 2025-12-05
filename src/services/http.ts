import axios from 'axios'

export const httpService = axios.create({
  baseURL: 'http://localhost:8080/api'
})

httpService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)
