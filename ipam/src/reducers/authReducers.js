import { LOG_IN } from '../actions/authentication'

const initialAuth = false

export function authenticationReducer(state = initialAuth, { type, isAuthenticated }) {
  Object.freeze(state)
  switch (type) {
    case LOG_IN:
      return isAuthenticated
    default:
      return state
  }
}


