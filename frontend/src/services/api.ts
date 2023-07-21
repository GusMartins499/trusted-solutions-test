import axios from 'axios'

const readyOnlyAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

const baseAPI = axios.create({
  baseURL: 'http://localhost:3333'
})

export { readyOnlyAPI, baseAPI }