import axios from 'axios'
import { logOut } from '@/composable/auth'


const a = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
    'Client-Id': process.env.VUE_APP_CLIENT_ID,
  }
})

a.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response.status === 401) logOut()

    return Promise.reject(error)

  }
)

export default a