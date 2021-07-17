import axios from 'axios'
import store from '@/store'
import { logOut } from '@/composable/auth'


const a = axios.create({
  baseURL: "https://api.twitch.tv",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': store.getters['auth/token'],
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