/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint' // json-bigint 第三方插件
import store from '@/store'
import router from '@/router'
import { Notify } from 'vant'

// axios.create 方法：创建一个 axios 对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn/'
  // baseURL: process.env.NODE_ENV === 'production'
  //   ? 'http://api-toutiao-web.itheima.net'
  //   : 'http://ttapi.research.itcast.cn/'
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 拿出用户 token
    const user = store.state.user
    if (user) {
      // 添加在请求头上
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    // 响应状态码为 401
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user

      if (!user || !user.refresh_token) {
        // router.push('/login') 去往登录页
        redirectLogin()
        return
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        // 如果获取成功，则把新的 token 更新到容器中
        store.commit('setUser', {
          ...user,
          token: res.data.data.token // 最新获取的可用 token
        })

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷新 token 失败', err)
        // router.push('/login')
        redirectLogin()
      }
    } else if (error.response.status === 500) {
      Notify('服务端异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)

// 去往登录页
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
