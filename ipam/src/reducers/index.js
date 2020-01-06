import { combineReducers } from 'redux'
import { authenticationReducer, subnetReducer } from './reducers'

export default combineReducers({ authenticationReducer, subnetReducer })