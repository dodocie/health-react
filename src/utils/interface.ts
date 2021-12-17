export type Func2<T> = (args: T) => void;
export type RestFunc<T> = (...args: T[]) => boolean;
export type RestFunc2<T> = T extends unknown[] ? (...args: T) => void : never

export interface FunWithVal<T, U>{
  (...arg: T[]): U
}

export interface Func {
  (args?: unknown): void;
}

export interface RequestData {
  [k: string]: unknown
}

export type KeyMap = {
  [k: string]: string
}

export type InitConfig = {
  [k: string]: string | boolean | number | string[] | Record<string, unknown>
} & {
  surveyIds?: {[k: string]: string}
}

export interface UserInfo {
  nickname: string,
  headImgUrl: string,
  openid?: string,
  partnerid?: string
}

export type Link = {
  val: string
  previous: string
  next?: Link
}
export interface BoolFunc {
  <T>(arg: T): boolean
}

//提取T中值为V类型的所有key的联合类型， -？取消可选
export type KeyOfType<T, V> = {
  [P in keyof T]-?: T[P] extends V ? P : never
}[keyof T]

export type Values<T> = {
  [K in keyof T]: T[K]
}[keyof T]


export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Obj = Record<string, any>

export type OptionsFlags<T, V> = {
  [k in keyof Partial<T>]: V
}

export type MapVal<T extends Obj, U extends OptionsFlags<T, string>> = {
  [p in keyof T as U[p]]: T[p]
}
