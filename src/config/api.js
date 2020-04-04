import axios from 'axios'

export default axios.create({
  baseURL: 'http://corona-virus-status.herokuapp.com/',
  timeout: 60000,
})