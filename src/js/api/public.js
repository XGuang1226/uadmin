import axios from 'axios'
axios.defaults.timeout = 20000
// axios.defaults.headers.post['content-type'] = 'application/x-www=form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default {
  fetchGet (url, params = {}) {
    if (url.indexOf('http') !== 0 && url.indexOf('..') !== 0) {
      url = 'http://' + url
    }
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch (url) {
    if (url.indexOf('http') !== 0 && url.indexOf('..') !== 0) {
      url = 'http://' + url
    }
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    if (url.indexOf('http') !== 0 && url.indexOf('..') !== 0) {
      url = 'http://' + url
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
