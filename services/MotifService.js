import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8889/api/desso`,
  // baseURL: `http://bmi-bmbl-vp01.bmi.osumc.edu:9001/api/desso`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getMotifs() {
    return apiClient.get('/info')
  },
  getMotif(id) {
    return apiClient.get('/info/' + id)
  },
  getDatasetAnnotation(id) {
    return apiClient.get('/info/' + id + '/annotation')
  },
  getMatrix(id) {
    return apiClient.get('/matrix/' + id)
  },
  getTfbs(id) {
    return apiClient.get('/sites/' + id)
  }
}
