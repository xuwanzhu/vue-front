import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8222', // api的base_url ,网关路由
  timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    //第三步
    //判断传入cookie的token值 是否为空；如果不为空，则将token数据传入到 头信息中（如果存在将每个页面header都添加token），方便后续用户登录信息可以直接从页面的request中的headers中获取
    if (cookie.get('guli_token')) {
      config.headers['token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      console.log("response.data.resultCode是28004")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //debugger
      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });



export default service