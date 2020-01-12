import { combineReducers } from 'redux'
import { authenticationReducer } from './authReducers'
import { vlanReducer, allVlansReducer } from './vlanReducers'
import { subnetReducer, allSubnetsReducer } from './subnetReducers'
import { locationReducer, allLocationsReducer } from './locationReducers'

export default combineReducers({ authenticationReducer, subnetReducer, allSubnetsReducer, 
    vlanReducer, allVlansReducer, locationReducer, allLocationsReducer })