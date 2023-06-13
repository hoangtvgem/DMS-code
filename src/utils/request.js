import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || "http://localhost:5555/", 
  timeout: 5000 
})

service.interceptors.request.use(
  config => {
    config.headers['ngrok-skip-browser-warning'] = 'any'

    if (store.getters.token || getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {

    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response

    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Cookies.remove('_token')
    if (error == 'Error: Request failed with status code 401') {
      window.location.href = '/login'
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
