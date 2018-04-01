import axios from 'axios'
import store from './store/index'
import * as types from './store/mutation-types'
import router from './router'

// axios 配置
axios.defaults.timeout = 6000
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.getters.getToken) {
      config.timeout = 6000
      if (config.method === 'get') {
        // config.headers = {'Content-Type': 'application/json'}
      } else if (config.method === 'post') {
        config.headers = {'Content-Type': 'application/json'}
        config.auth = {
          username: `${store.getters.getToken}`, password: ``
        }
      }
      // config.headers.Authorization = `${store.getters.getToken}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
response => {
  return response
  },
  error => {
    // if (error.response) {
    //   switch (error.response.status) {
    //     // case 401:
    //     //   // 401 清除token信息并跳转到登录页面
    //     //   store.commit(types.LOGOUT)
    //     //   router.replace({
    //     //     path: 'login',
    //     //     query: {redirect: router.currentRoute.fullPath}
    //     //   })
    //   }
    // }
    // console.log('XXXXXXXXXXXXX', JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject()
  })

export default axios
