import { LOG_IN } from '../actions/authentication'
import { SET_SUBNET, RESET_SUBNET } from "../actions/subnet"


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


const initialSubnet = {
  subnet_key: "",
  ip_address: "",
  netmask: "",
  vlan: "",
  nameservers: "",
  location: "",
  routable: false,
  public_or_dmz: "Public",
  ip_assignment: "Static",
  description: ""
}

export function subnetReducer(state = initialSubnet, { type, name, value }) {
  Object.freeze(state)
  switch (type) {
    case SET_SUBNET:
      return ({
        ...state,
        [name]: value})
    case RESET_SUBNET:
      return initialSubnet
    default:
      return state
  }
}