import axios from 'axios'
import { logOut } from '@/composable/auth'

const axiosBackend = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URI,
  headers: {
  'Content-Type': 'application/json',
    'Client-Id': process.env.VUE_APP_CLIENT_ID,
  }
});

const axiosHelix = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    'Content-Type': 'application/json',
  }
});

[axiosHelix, axiosBackend].forEach(
  instance => instance.interceptors.response.use(
    (response) => response,
    (error) => {

      // if (error.response.status === 401) logOut()
    
      return Promise.reject(error)
    
    }
  )
);

export {
  axiosBackend,
  axiosHelix,
}