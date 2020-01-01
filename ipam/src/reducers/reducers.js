import { TEST_TEST } from '../actions/testAction'
import { LOG_IN } from '../actions/authentication'



var preloadedState = "Start"

export function testReducer(state = preloadedState, {type, message}) {
  Object.freeze(state)
  switch(type){
    case TEST_TEST:
      preloadedState = message
      return preloadedState
    default:
      return state
  }
}


const initialAuth = false

export function authenticationReducer(state = initialAuth, {type, isAuthenticated}) {
  Object.freeze(state)
  switch(type){
    case LOG_IN:
      return isAuthenticated
    default:
      return state
  }
}