import { KeyMap } from 'src/utils/interface'
import { PartnerConfig } from './partnerConfig'
import { VendorConfig } from './vendorConfig'

export type UrlParams = KeyMap & {
  authFailedCount?: number,
  mobile?: string,
  auto?: number
} & {
  additional_data?: Record<string, unknown>
  location?: Record<string, string>
} & {
  pepath: Pepath
}

export enum Source {
  LAUNCH='launch',
  LOGIN='login',
  RESULT='result',
  BRIEF='brief',
  SMS='sms',
  PAY='pay',
  ORDERS='orders',
  REPORT='report',
  REDEEM='redeem',
  BRANCH='branch',
  TEST='test',
}

export type UrlSrc = Source

export interface Config {
  urlsrc: UrlSrc
  urlParams: UrlParams
  userInfo: UserInfo
  vendorConfig: VendorConfig
  partnerConfig: PartnerConfig
  additionData?: {[k: string]: unknown}
}

export type UserInfo = {
  nickname: string,
  headImgUrl: string,
  openid?: string,
  partnerid?: string
}

export type Pepath = 'phexam3' | 'phexamlite' | 'hracancer' | 'hraplus' | 'hraplus2' | 'pehraplus' | 'hraplus2ruizai' | 'elder3' | 'elder2' | 'hraflex'