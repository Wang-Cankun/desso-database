import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8889/api/desso`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getMotifs() {
    return apiClient.get('/matrix')
  },
  getMotif(id) {
    return apiClient.get('/matrix/' + id)
  }
}
