import { combineReducers } from 'redux'
import { testReducer, authenticationReducer } from './reducers'

export default combineReducers({ testReducer, authenticationReducer })