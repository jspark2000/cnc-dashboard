import axios from 'axios'
import config from '../config'

export const fetcher = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 100000,
  withCredentials: false,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

export const preprocessingFetcher = axios.create({
  baseURL: config.PREPROCESSING_API_BASE_URL,
  timeout: 100000,
  withCredentials: false,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }
})
