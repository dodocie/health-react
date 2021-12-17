import { atom } from 'jotai'
import { atomWithStore } from 'jotai/redux'
import { createStore, combineReducers } from 'redux'
import { userReducer } from './user'
import { verifyReducer } from './verify'

const countNum = atom(0)
const computedNum = atom(get => get(countNum) * 2)

const reducer = combineReducers({user: userReducer, verify: verifyReducer})
export const store = createStore(reducer)
export const store2 = createStore(userReducer)
export const storeHook = atomWithStore(store)

export {
  countNum,
  computedNum
}