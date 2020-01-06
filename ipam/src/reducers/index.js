import { combineReducers } from 'redux'
import { authenticationReducer, subnetReducer, allSubnetsReducer } from './reducers'

export default combineReducers({ authenticationReducer, subnetReducer, allSubnetsReducer })