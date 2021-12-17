import { Config, Source, UrlSrc } from 'src/config/definePartnerParams'
import { Values } from 'src/utils/interface'
import { UserState } from '.'
import { store } from '..'

export type LoginAction = 'home' | 'brief' | 'orders' | 'reports' | 'account' | 'result' | 'contacts' | 'survey' | 'cart' | 'redeem'

export function commitLoginAction(action: LoginAction): void {
  store.dispatch({type: UserState.LOGIN_FORM, payload: {action}})
}
function showDialog(size: 'large' | 'middle' | 'middleAuth', action: LoginAction='home'): void {
  store.dispatch({type: UserState.LOGIN_FORM, payload: {action, size, visible: true}})
}

export async function queryOnUrlEntry(config: Config): Promise<void> {
  const {partnerConfig: {singleCity, isSingleHosp, isSingleCity}} = config
  // dispatchRisk(config)
  
}

interface Login {
  onLogin(): void
}

interface PageEntry {
  onEntry(): void
}

abstract class EntryWithLogin implements PageEntry, Login {
  public config
  
  protected constructor(config: Config) {
    this.config = config
  }
  
  abstract success(): void
  
  abstract failed(): void
  
  onEntry() {
    this.autoLoginCb()
    queryOnUrlEntry(this.config)
    // getHLItems()
  }
  
  async onLogin() {
    const {additional_data, authFailedCount} = this.config.urlParams
    if (additional_data?.app === 'CMB') {
      if (authFailedCount !== undefined && authFailedCount > 0) {
        showDialog('middleAuth')
        return
      }
      //cmb自动登录见autoLoginOnEntry
    }
    // await autoLoginOnEntry(this.config)
  }
  
  autoLoginCb() {
    this.onLogin().then(() => {
      const {isLogin} = store.getState().verify
      
      const status    = isLogin ? 'success' : 'failed'
      this[status]()
    })
  }
}

class SMS implements PageEntry {
  onEntry() {
    // fn4SMSEntry()
  }
}

class TEST implements PageEntry {
  onEntry() {
    // fn4TestEntry()
  }
}

class Redeem extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }

  success() {
    // fetchUserDataOnLogin()
    // fn4RedeemEntry()
  }

  failed() {
    // const {name} = router.currentRoute.value
    // name==='index' && showDialog('large', 'redeem')
  }
}

class Launch extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    // fetchUserDataOnLogin()
    // go('home', 'replace')
  }
  
  failed() {
    const {additional_data} = this.config.urlParams
    if(additional_data?.app === 'CMB'){
      showDialog('middle')
      return
    }
    // go('cover', 'replace')
    // markCode4Btn('未登录浏览')
  }
}


class LoginLaunch extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    // fetchUserDataOnLogin()
    // go('home', 'replace')
  }
  
  failed() {
    showDialog('large')
  }
}

class Branch extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    // fetchUserDataOnLogin()
    // go('home', 'replace')
    // usePicker(true, {pickerPage: 'city', pickerUsage: 'research'})
  }
  
  failed() {
    const {additional_data} = this.config.urlParams
    if(additional_data?.app === 'CMB'){
      showDialog('middle')
      return
    }
    // go('cover', 'replace')
    // markCode4Btn('未登录浏览')
    // usePicker(true, {pickerPage: 'city', pickerUsage: 'research'})
  }
}

class Result extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  async success() {
    // fetchUserDataOnLogin()
    // fn4ResultEntry()
  }
  
  failed() {
    showDialog('large', 'result')
  }
}

class Brief extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    // fetchUserDataOnLogin()
    // fn4BriefEntry()
  }
  
  failed() {
    // fn4BriefEntry()
  }
}

class Pay extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    // fetchUserDataOnLogin(['bonus', 'cart', 'contacts'])
    // fn4OrderEntry()
  }
  
  failed() {
    showDialog('large', 'orders')
  }
}

class Orders extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    commitLoginAction('orders')
    // fn4OrdersEntry()
  }
  
  failed() {
    showDialog('large', 'orders')
  }
}

class Report extends EntryWithLogin {
  constructor(config: Config) {
    super(config)
  }
  
  success() {
    commitLoginAction('reports')
    // fn4OrdersEntry()
  }
  
  failed() {
    showDialog('large', 'reports')
  }
}

const EntryFnMap         = {
  [Source.LAUNCH]   : Launch,
  [Source.LOGIN]    : LoginLaunch,
  [Source.RESULT]   : Result,
  [Source.PAY]      : Pay,
  [Source.BRIEF]    : Brief,
  [Source.REDEEM]   : Redeem,
  [Source.SMS]      : SMS,
  [Source.ORDERS]   : Orders,
  [Source.REPORT]   : Report,
  [Source.BRANCH]   : Branch,
  [Source.TEST]     : TEST,
}
export const useEntrySrc = (urlsrc: UrlSrc): Values<typeof EntryFnMap> => {
  return EntryFnMap[urlsrc]
}
