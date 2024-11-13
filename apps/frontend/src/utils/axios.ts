import axios from 'axios'
// import { loadFromLocalStorage } from './localStorage';
// import { LOCALSTORAGE_AUTH_TYPE } from '../constants/localStorage';

export const baseURL = 'http://localhost:4000/'

export const axiosJSON = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  withCredentials: false,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// axiosJSON.interceptors.request.use(
//   (config) => {
//     if (loadFromLocalStorage(LOCALSTORAGE_AUTH_TYPE.AUTH_TOKEN)){
//       config.headers['Authorization'] = `Bearer ${loadFromLocalStorage(LOCALSTORAGE_AUTH_TYPE.AUTH_TOKEN)}`
//       return config
//     } else {
//       return config
//     }
//   },
//   (error) => Promise.reject(error),
// )
