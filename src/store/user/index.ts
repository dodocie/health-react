import { atom } from 'jotai'
import { getUserData, userDataHandler } from 'src/config/launchInfo'
import { LoginAction } from './loginUtils'

export const userConfig = atom(async ()=>{
  const urlParams = await getUserData()
  return userDataHandler(urlParams)
})

export enum UserState {
  LOGIN_FORM='loginForm',
  USER_INFO = 'userInfo'
}

export const initialState = {
  [UserState.LOGIN_FORM]: {},
  [UserState.USER_INFO]: {}
}

type UserAction = {
  type: UserState.LOGIN_FORM,
  payload: {
    size?: 'large' | 'middle' | 'middleAuth'
    action?: LoginAction
    visible?: boolean
  }
} | {
  type: UserState.USER_INFO,
  payload: {
    nickname: string
  }
}


export const userReducer = (state = initialState, action: UserAction) => {
  const {type, payload} = action
  switch(type){
    case UserState.LOGIN_FORM: 
      return {
        ...state,
        [UserState.LOGIN_FORM]: {
          ...state.loginForm,
          ...payload
        }
      }
    case UserState.USER_INFO: 
      return {
        ...state,
        [UserState.USER_INFO]: payload
      }  
    default:
      return state
  }
}
