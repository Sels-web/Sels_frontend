import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response) => {
      return response
    },

    (error) => {
      return Promise.reject(error)
    },
)

export default instance
