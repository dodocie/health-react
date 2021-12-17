export enum VerifyState {
  IS_LOGIN='isLogin'
}

const initialState = {
  [VerifyState.IS_LOGIN]: false
}

type VerifyAction = {
  type: VerifyState.IS_LOGIN,
  payload: {
    isLogin: boolean
  }
}

export const verifyReducer = (state = initialState, action: VerifyAction) => {
  const {type, payload} = action
  switch(type){
    case VerifyState.IS_LOGIN: 
      return {
        ...state,
        [VerifyState.IS_LOGIN]: payload
      }  
    default:
      return state
  }
}