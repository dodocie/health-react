import {AxiosRequestConfig}        from 'axios';
import {URIS, Api}    from './api'
import {Func, KeyMap, RequestData} from 'src/utils/interface'
import {keyExists}                 from 'src/utils/share'

const Qs = require('qs')

export interface RequestArgs {
  requestData?: RequestData
  msg?: KeyMap
  retry?: number
  retryDelay?: number
  arrayFormat?:string
  pathname?: string
  failedFn?: Func
  showToast?: (arg:string)=>void
  url?: '',
  method?: 'get'
}

export interface Options {
  args: AxiosRequestConfig
  url: string
}

export const defArgs: RequestArgs = {}

export type FactoryArg = {
  serviceName: Api | ''
  serviceArgs: RequestArgs
}

export function factory({serviceName, serviceArgs = defArgs}: FactoryArg) :Options{
  const {method='get', url=''} = keyExists(URIS, serviceName) ? URIS[serviceName] : serviceArgs
  const {requestData, arrayFormat='indices', pathname, retry, retryDelay } = serviceArgs
  
  const d= {
    method,
    url: pathname ? `${url}/${pathname}` : url,
    retry,
    retryDelay
  }
  const params = requestData
  
  const methodProps = {
    get: {
      params,
      paramsSerializer: function() {
        return Qs.stringify(params, {arrayFormat: arrayFormat})
      }
    },
    post: {
      data: params
    }
  }
  const args = {...d, ...methodProps[method]}
  return { args, url}
}
