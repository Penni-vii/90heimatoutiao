import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 给axios设置一个基地址。

// 请求拦截 config是请求的各项参数配置
axios.interceptors.request.use(function (config) {
  // 请求成功时
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorition = `Bearer ${token}`
  return config
}, function () {
  // 请求失败时
})
