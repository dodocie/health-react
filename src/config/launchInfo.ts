import {
  KeyMap,
  RequestData,
} from 'src/utils/interface'
import {
  getQueryString,
  parseLocalData,
  wrapPromise,
  getValByKey
}                               from 'src/utils/share'
import { vendorConfig }         from 'src/config/vendorConfig'
import { getPartnerConfig, PartnerConfig }     from 'src/config/partnerConfig'
import {request}                from 'src/APIs/fetch'
import {Pepath}                 from 'src/hooks/survey/defineSurveyResult'
import { Config, Source, UrlParams, UrlSrc } from './definePartnerParams'

const { host, hash, href } = window.location
export const isTestServer = host.split('.')[0] === 'pe-t'
localStorage.setItem('url', JSON.stringify(href))
if(isTestServer){
  const head = document.getElementsByTagName('head')?.[0]
  if(head){
    const script = document.createElement('script')
    script.src = '/public/js/vconsole.min.js'
    head.appendChild(script)
  }
}

const urlsrc = getQueryString('urlsrc') as UrlSrc
const authFailedCount: string | undefined = getQueryString('authFailedCount')

const localUserData: UrlParams | null = parseLocalData('userData')
console.log('userData:', localUserData)

if (/detail/.test(hash) && localUserData) {
  window.location.replace(`${window.location.href.split(hash)[0]}`)
}

export const getUserData = getUserDataViaSrc(urlsrc)

function getUserDataViaSrc(urlsrc: UrlSrc){
  let fetchFunc: () => Promise<UrlParams>
  switch(urlsrc){
    case Source.LAUNCH:
    case Source.LOGIN:
    case Source.REDEEM:
    case Source.BRANCH:
    case Source.BRIEF:
    case Source.RESULT:
    case Source.ORDERS:
    case Source.REPORT:
      fetchFunc = getInfoFromServer
      break
    case Source.PAY:
      fetchFunc = getParamsFromLocal
      break
    case Source.SMS:
      fetchFunc = getSvidFromSms
      break
    case Source.TEST:
      fetchFunc = getDataFromQS
      break
    default:
      fetchFunc = getInfoFromServer 
  }

  return fetchFunc
}

function getParamsFromLocal(): Promise<UrlParams> {
  const urlParams = localUserData as UrlParams
  urlParams.serviceid = getQueryString('serviceid')
  return Promise.resolve(urlParams)
}

function getSvidFromSms(): Promise<UrlParams> {
  const serviceid = getQueryString('svid')
  return serviceid!==undefined ? Promise.resolve({ serviceid, pepath: 'pehraplus' }) : Promise.reject('未获取serviceid')
}

function getDataFromQS(): Promise<UrlParams> {
  const partner = getQueryString('partner')
  const auto = getQueryString('auto')
  const partner_openid = getQueryString('partner_openid')
  localStorage.setItem('queryData', JSON.stringify({partner, auto, partner_openid}))
  return Promise.resolve({partner, partner_openid, pepath: 'pehraplus'})
}

async function getInfoFromServer(): Promise<UrlParams> {
  const infoid = getQueryString('id')
  const oldId = parseLocalData('id')
  if (localUserData && oldId && oldId === infoid) {
    return Promise.resolve(localUserData)
  }

  const requestData = getRequestData()
  const [err, res] = await wrapPromise(request<{data: UrlParams}>('userInfo', { requestData }))
  if (res === null || err) {
    return Promise.reject(new Error('未获取到用户信息'))
  }
  
  const data = res.data
  const userData = data.data
  if (!userData?.openid) {
    userData.openid = userData.partner_openid
  }
  
  console.table(userData)
  const props: KeyMap = {
    partner_id     : 'partnerid',
    partner_openid : 'partner_openid',
    openid         : 'openid',
    user_name      : 'userName',
    head_img       : 'headimgurl',
    survey_id      : 'sid',
    svid           : 'serviceid', //serviceid from sms
    partner_name   : 'partnerName',
    partner        : 'partner',
    couponid       : 'couponid',
    voucherid      : 'voucherid',
    drawSrc        : 'drawSrc',
    app            : 'app',
    additional_data: 'additional_data',
    pepath         : 'pepath',
    mobile         : 'mobile',
    auto           : 'auto',
    welfareid      : 'welfareid',
    ruleid         : 'ruleid',
    location       : 'location',
    userAgent      : 'userAgent',
    channel        : 'channel',
    agentCode      : 'agentCode',
    agentName      : 'agentName',
    agentMobile    : 'agentMobile',
    userInfoToken  : 'userInfoToken',
    adminToken     : 'adminToken',
    gender         : 'gender'
  }
  const keys = Object.keys(userData)
  
  const urlParams = keys.reduce((obj, key) => {
    const k = getValByKey(props, key)
    obj[k] = userData[key]
    return obj
  }, {} as UrlParams)
  
  authFailedCount && (urlParams.authFailedCount = Number(authFailedCount))
  infoid && (urlParams.infoid = infoid)
  urlParams.urlsrc = urlsrc
  
  if (!urlParams.pepath) {
    const map: Record<string, Partial<Pepath>> = {
      xinchenglife: 'phexamlite',
      xcemarketing: 'phexamlite'
    }
    urlParams.pepath = map[urlParams.partnerName] || 'pehraplus'
  }

  if(!urlParams.additional_data) urlParams.additional_data = {}
  const query = ['openid', 'backBtn', 'partner']
  query.forEach(attr=>setAdditonalDataFromQS(urlParams, attr))
  const urlQuery = ['auto', 'userInfoToken']
  urlQuery.forEach(attr=>setAdditonalDataFromUserInfo(urlParams, attr))
  
  localStorage.setItem('userData', JSON.stringify(urlParams))
  return Promise.resolve(urlParams)
}

function setAdditonalDataFromUserInfo(urlParams: UrlParams, attr: string){
  const val = urlParams[attr]
  val && (urlParams.additional_data![attr] = val)
}

function setAdditonalDataFromQS(urlParams: UrlParams, attr: string){
  const val = getQueryString(attr)
  val && (urlParams.additional_data![attr] = val)
}

function getRequestData(): RequestData {
  let requestData: RequestData
  const isAuto = getQueryString('auto')
  const partner = getQueryString('partner')

  if (isAuto && partner) {
    const partner_openid   = getQueryString('partner_openid')
    const auth_code        = getQueryString('auth_code')
    const oldAuthCode      = parseLocalData('auth_code')
    // const oldPartnerOpenId = parseLocalData('partner_openid')
    const localOpenId      = localUserData?.partner_openid
    const useLocalOpenId   = auth_code && auth_code === oldAuthCode

    requestData = {
      autoLogin: {
        partner,
        requestData: useLocalOpenId ? {partner_openid: localOpenId} : partner_openid ? {
          partner_openid
        } : {auth_code}
      }
    }
    auth_code && oldAuthCode!==auth_code && localStorage.setItem('auth_code', JSON.stringify(auth_code))
    // partner_openid && oldPartnerOpenId!==partner_openid && localStorage.setItem('partner_openid', JSON.stringify(partner_openid))
  } else {
    const infoid = getQueryString('id')
    requestData = { infoid }
    localStorage.setItem('id', JSON.stringify(infoid))
  }
  return requestData
}


export const userDataHandler = (urlParams: UrlParams): Config|null => {
  if (!urlParams) return null
  const {
          additional_data,
          sid,
          partnerid,
          partnerName,
          openid,
          headimgurl,
          userName,
        } = urlParams

  localStorage.removeItem(`${sid}addition`)
  additional_data && localStorage.setItem(`${sid}addition`, JSON.stringify({ additional_data }))//插码的addition_data是嵌套的
  
  const name = userName?.length > 8 ? `${userName.substring(0, 8)}...` : userName
  const partnerConfig = getPartnerConfig(partnerName) as PartnerConfig
  
  return {
    urlsrc,
    urlParams,
    userInfo    : {
      nickname  : name,
      headImgUrl: headimgurl,
      openid,
      partnerid
    },
    vendorConfig,
    partnerConfig,
    additionData: additional_data
  }
}
