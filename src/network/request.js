import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://127.0.0.1:8888/api/private/v1/'
  baseURL: 'http://47.106.196.122:8888/api/private/v1/'
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    // 在请求头提供token
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    // NProgress.start()
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截
// request.interceptors.response.use(
//   (result) => {
//     NProgress.done()
//     return result.data
//   },
//   (err) => Promise.reject(err)
// )

export default request
