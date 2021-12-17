import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import {baseURL}  from './api'
import {sleep} from 'src/utils/share'

const instance = axios.create({
  baseURL,
  timeout: 5000,
  // headers: {'Content-Type': 'application/json; charset=utf-8'}
})
declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number
    __retryCount?: number
    retryDelay?: number
  }
}
const stopRepeatRequest = function (reqList: string[], url: string, cancel: Canceler, errorMessage: string) {
  const errorMsg = errorMessage || ''
  if (reqList.indexOf(url) > -1 && !['/result', '/addressschedule'].includes(url)) {
    cancel(errorMsg)
    return
  }
  reqList.push(url)
}
const reqList: string[]           = []

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  let cancel: Canceler = ()=> ({})
  const {url=''}        = config
  config.cancelToken = new axios.CancelToken(function (c:Canceler) {
    cancel = c
  })
  stopRepeatRequest(reqList, url, cancel, `${url} 请求被中断 ${Date.now()}`)
  return config
}, (error: AxiosError) => console.log('request err', error))

const allowRequest = function (url: string) {
  for (let i = 0; i < reqList.length; i++) {
    if (url.indexOf(reqList[i]) > -1) {
      reqList.splice(i, 1)
      break
    }
  }
}

instance.interceptors.response.use(async (res:AxiosResponse) => {
  const config         = res.config
  const { url='', retryDelay }     = config
  const {code, result} = res.data
  
  setTimeout(() => {
    allowRequest(url)
  }, 1000)
  
  const c1 = ![0, -1023, -1201, -1, -1306, -1018].includes(code) && url.indexOf('/result') > -1
  const c2 = code === 0 && url.indexOf('ui/ispaid') > -1 && !result
  if (c1 || c2 ) {
    if (!config || !config.retry) return res

    config.__retryCount = config.__retryCount || 0

    if (config.__retryCount >= config.retry) return res

    config.__retryCount += 1
    console.log('retry...', url)

    await sleep(retryDelay||1000)
    return instance(config)
  }

  return res
}, (err: AxiosError) => {
  if (axios.isCancel(err)) {
    console.log(err)
  } else {
    const { url='' }     = err.config
    setTimeout(() => {
      allowRequest(url)
    }, 1000)
  }
})

export {instance}
