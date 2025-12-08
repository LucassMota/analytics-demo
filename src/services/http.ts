import axios from 'axios'

const httpExternalService = axios.create({
  baseURL: 'http://localhost:8000/api'
  // baseURL: 'https://text2sql-api-347547741450.southamerica-east1.run.app/api'
})

httpExternalService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export { httpExternalService }

const httpNextService = axios.create({
  baseURL: 'http://localhost:3000/api'
})

httpExternalService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export { httpNextService }
