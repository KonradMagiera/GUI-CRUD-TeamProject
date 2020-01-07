import { combineReducers } from 'redux'
import { authenticationReducer, subnetReducer, allSubnetsReducer, vlanReducer, allVlansReducer } from './reducers'

export default combineReducers({ authenticationReducer, subnetReducer, allSubnetsReducer, vlanReducer, allVlansReducer })