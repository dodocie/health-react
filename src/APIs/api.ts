type Props = {
  [k: string]: string
}

export type Method = 'get' | 'post'
export type RequestItem = {
  url: string
  method: Method
  requestType?: string
  arrayFormat?: string
}

function getServer(): string {
  const location = document.location
  const hostname = location.host.split('.')[0]
  const pro      = location.protocol
  
  const hosts: Props = {
    'pe-t': `${pro}//pe-t.ihaola.com.cn`,
    'pe'  : `${pro}//pe.ihaola.com.cn`
  }
  return hosts[hostname]
}

export const baseURL = getServer()

export const URIS = {
  userInfo        : {url: '/userlaunchinginfo', method: 'post'},
  pay             : {url: '/createorder', method: 'post'},
  onPay           : {url: '/pay', method: 'post'},
  create          : {url: '/reservation', method: 'post'},
  createQijian    : {url: '/submitreservation', method: 'post'},
  modify          : {url: '/reservation/modify', method: 'post'},
  removeOrder     : {url: '/reservation/remove', method: 'post'},
  query           : {url: '/result', method: 'get'},
  hlcheckitems    : {url: '/hlcheckitems', method: 'get'},
  extraItems      : {url: '/ui/availableitems', method: 'post'},
  address         : {url: '/address', method: 'post'},
  addressSch      : {url: '/addressschedule', method: 'post'},
  reservation     : {url: '/reservation', method: 'get'},
  reservations    : {url: '/reservations', method: 'get'},
  surveyresult    : {url: '/surveyresult', method: 'get'},
  organ           : {url: '/proposal', method: 'get'},
  report          : {url: '/reporttoken', method: 'get'},
  mobileCode      : {url: '/mobilecode', method: 'post'},
  invoice         : {url: '/invoice', method: 'get'},
  modifyEmail     : {url: '/invoice/modify', method: 'post'},
  sendEmail       : {url: '/invoice/send', method: 'post'},
  contacts        : {url: '/contacts', method: 'get'},
  removeContact   : {url: '/contacts/remove', method: 'post'},
  login           : {url: '/login', method: 'post'},
  drawCoupon      : {url: '/drawcoupon', method: 'post'},
  drawVoucher     : {url: '/signvoucher', method: 'post'},
  customerBonus   : {url: '/customerwelfare', method: 'get'},
  cautions        : {url: '/cautions', method: 'post'},
  feedback        : {url: '/ui/feedback', method: 'post'},
  updateContact   : {url: '/contacts/update', method: 'post'},
  isPaid          : {url: '/ui/ispaid', method: 'post'},
  cmbLogin        : {url: '/cmb/login/auto', method: 'get'},
  riskEvaluation  : {url: '/riskevaluation', method: 'post'},
  avgRisk         : {url: '/survey/risks', method: 'post'},
  logOff          : {url: '/logoff', method: 'post'},
  getCart         : {url: '/cart/getall', method: 'get'},
  saveCart        : {url: '/cart/save', method: 'post'},
  proposal        : {url: '/personalrecommends', method: 'post'},
  bonusDetail     : {url: '/customerwelfaredetail', method: 'post'},
  revokeOrder     : {url: '/reservation/revoke', method: 'post'},
  userMobile      : {url: '/ui/mobile', method: 'get'},
  emptyCart       : {url: '/cart/clear', method: 'get'},
  briefPackages   : {url: '/ui/customizedpacks', method: 'get'},
  getEntirePack   : {url: '/ui/availablepacks', method: 'get'},
  getUserPromotion: {url: '/ui/queryuserinformation', method: 'post'},
  setUserInfo     : {url: '/ui/setuserinformation', method: 'post'},
  getBonusStock   : {url: '/accounting/welfarestatisticbyid', method: 'get'},
  getUserDbData   : {url: '/UI/queryStorage', method: 'post'},
  updateUserDb    : {url: '/UI/updateStorage', method: 'post'},
  redeem          : {url: '/UI/activity/receiveusercard', method: 'post'},
  robotMsg        : {url: '/UI/diagnostic/errorreport', method: 'post'}
} as const

export type Api = keyof typeof URIS
