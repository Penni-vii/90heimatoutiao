import axios from 'axios'
import router from '../router' // 要用router实例，所以先引入
import { Message } from 'element-ui'
import JSONBig from 'json-bigint' // 引入第三方包，处理数据的失真问题
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 给axios设置一个基地址。

// 请求拦截 config是请求的各项参数配置
axios.interceptors.request.use(function (config) {
  // 请求成功时
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {
  // 请求失败时
})

// 处理id过长时js处理数据时数据失真的问题
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {} // 处理数据失真的问题
}]

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 响应成功时
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  // 响应失败时，处理各种失败时要响应的状态码
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示信息
  return Promise.reject(error) // 这里要注意处理，不然会一直走到then中，不往catch中走
})

export default axios // 记得最后一定要导出！！！
