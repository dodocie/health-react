/* eslint-disable prefer-const */
import { instance }             from './axios'
import { factory, RequestArgs } from './factory'
import { AxiosResponse }        from 'axios'
import { popToast } from 'src/utils/share'
import {Api}                    from 'src/APIs/api'

interface CodeProps {
  [k: string]: (res: AxiosResponse<unknown>) => void
}

export type CustomRes<T> = {
  data: {
          code?: number
          message?: string
        } & T
}

export const request = <T> (serviceName: Api | '', defArgs={}): Promise<CustomRes<T>> => {
  const { pathname, requestData, retry, retryDelay = 1000, arrayFormat = 'indices', failedFn, msg = {}, method, url: specialUrl } = defArgs as RequestArgs
  const serviceArgs = { requestData, arrayFormat, pathname, retry, retryDelay, method, url: specialUrl }
  const { args, url } = factory({ serviceName, serviceArgs })
  return new Promise((resolve, reject) => {
    function success(res: AxiosResponse) {
      resolve(res)
    }
    
    function failed(res: AxiosResponse) {
      const { data } = res
      const {code, message} = data
      let notShow
      if (url.indexOf('result') > -1) {
        notShow = code === -1022 || code === -1023
      }

      if (!notShow) {
        popToast(msg[code.toString()] || message, 'warn')
      }
      failedFn?.(data)
      reject(res)
    }
    function sessionExpired(res: AxiosResponse) {
      if (failedFn) {
        failedFn()
        resolve(res)
        return
      }
      resolve(res)
    }
    
    const obj: CodeProps = {
            '0'        : success,
            '1'        : sessionExpired,
            'undefined': success
          },
          def            = failed
    
    instance(args)
      .then(res => {
        const data = res?.data;
        if(!data){
          success(res)
          return
        }
        (obj[`${data.code}`] || def)(res)
      })
      .catch(err => {
        console.log('err caught-- ', err)
      })
  })
}
