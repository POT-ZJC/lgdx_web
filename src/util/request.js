import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'



let requestCount = 0,
  loadingInstance = null;

function addGlobalLoading(config) {
  if (!config || config.globalLoading === false) {
    return
  }
  requestCount++
  loadingInstance = Loading.service({
    background: 'rgba(0,0,0,0.4)'
  })
}

function closeGlobalLoading(config) {
  if (!config || config.globalLoading === false) {
    return
  }
  if (--requestCount < 1) {
    loadingInstance.close()
  }
}

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  

    try {
      let data = config.data
      if ((typeof data === 'object')) { 
        const formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key])
        }
        config.data = formData
      }

    } catch (err) {
      console.log(err)
    } 
    config.timeout = 90 * 1000
    config.headers['scope'] = 'web'
    addGlobalLoading(config)
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const {
      config,
      data: res
    } = response
    closeGlobalLoading(config)

    // if the custom code is not 0, it is judged as an error.
    if (res.resultCode !== '200') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //     // to re-login
      //     MessageBox.confirm('会话已过期，请重新登录', {
      //         confirmButtonText: '重新登录',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //     }).then(() => {
      //         store.dispatch('user/resetToken').then(() => {
      //             location.reload()
      //         })
      //     })
      // }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    closeGlobalLoading(error)
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
