import { SET_HOST_ITEM, RESET_HOST, SET_HOST, ADD_HOST_INFO, DELETE_HOST_INFO } from "../actions/host"


const initialHost = {
    host_key: "",
    ip: "",
    hostname: "",
    description: "",
    mac_address: "",
    gateway: false,
    owner: "",
    device_description: "",
    device_location: ""
  }
  
  export function hostReducer(state = initialHost, { type, name, value, host }) {
    Object.freeze(state)
    switch (type) {
      case SET_HOST:
        return host
      case SET_HOST_ITEM:
        return ({
          ...state,
          [name]: value})
      case RESET_HOST:
        return initialHost
      default:
        return state
    }
  }
  
  const initialAllHosts = null
  
  export function allHostsReducer(state = initialAllHosts, {type, hostKey, hostInfo}) {
    //Object.freeze(state)
    switch(type) {
      case DELETE_HOST_INFO:
        var newState = state
        delete newState[hostKey]
        return newState
      case ADD_HOST_INFO:
        return ({
        ...state,
        [hostKey]: hostInfo
      })
      default:
        return state
    }
  }