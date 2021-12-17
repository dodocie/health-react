import { Toast } from 'react-vant'
import { ToastIcon } from 'src/components/pops/Loading'
import {
  MapVal, Obj, OptionsFlags
}                   from './interface'

export const DO_NOTHING = (): unknown => ({})

export function popToast(msg: string, className: 'warn' | 'success', duration?: number): void {
  const typeMap = {
    warn: () => ToastIcon('warn'),
    success: () => ToastIcon('success')
  } as const
  Toast({
    message: msg,
    icon: typeMap[className](),
    duration
  })
}

export function wrapPromise<T>(promise: Promise<T>): Promise<(T | null)[]> {
  return promise
      .then(res => [null, res])
      .catch(err => [err, null])
}

export function sleep(delay: number, sleepReason?: string): Promise<unknown> {
  return new Promise(resolve => setTimeout(()=>resolve(sleepReason), delay))
}

export function keyExists<T extends Obj | Element>(obj: T, k: string): k is keyof T & string{
  return k in obj
}

//从Obj复制keyMap指定的key，赋值给新对象，新对象的键为keyMap中key的值。
export function shallowCopyWithKeyMap<T extends Obj, U extends OptionsFlags<T, string>>(obj: T, keyMap: U): MapVal<T, U> {
  const result = {} as MapVal<T, U>
  for (const key in keyMap) {
    if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
      const val         = obj[key]
      const resultKey   = keyMap[key];
      val && ((result[resultKey] as unknown) = val)
    }
  }
  return result
}

export function getValByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

export function getQueryString(name: string): string {
  const params = new URL(document.location.href).searchParams
  return params.get(name) || ''
}

export function parseLocalData<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || 'null')
}
