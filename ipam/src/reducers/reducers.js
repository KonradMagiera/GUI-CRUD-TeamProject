import { LOG_IN } from '../actions/authentication'
import { SET_SUBNET_ITEM, RESET_SUBNET, SET_SUBNET, ADD_SUBNET_INFO, DELETE_SUBNET_INFO } from "../actions/subnet"
import { ADD_VLAN_INFO, RESET_VLAN, SET_VLAN, DELETE_VLAN_INFO, SET_VLAN_ITEM } from "../actions/vlan"


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

export function subnetReducer(state = initialSubnet, { type, name, value, subnet }) {
  Object.freeze(state)
  switch (type) {
    case SET_SUBNET:
      return subnet
    case SET_SUBNET_ITEM:
      return ({
        ...state,
        [name]: value})
    case RESET_SUBNET:
      return initialSubnet
    default:
      return state
  }
}

const initialAllSubnets = null

export function allSubnetsReducer(state = initialAllSubnets, {type, subnetKey, subnetInfo}) {
  //Object.freeze(state)
  switch(type) {
    case DELETE_SUBNET_INFO:
      var newState = state
      delete newState[subnetKey]
      return newState
    case ADD_SUBNET_INFO:
      return ({
      ...state,
      [subnetKey]: subnetInfo
    })
    default:
      return state
  }
}

const initialVlan = {
  vlan_key: "",
  id_vlan: "",
  description: "",
  vlan: "",
  subnets: "", //to bedzie chyba jakos inaczej
}

export function vlanReducer(state = initialVlan, { type, name, value, vlan }) {
  Object.freeze(state)
  switch (type) {
    case SET_VLAN:
      return vlan
    case SET_VLAN_ITEM:
      return ({
        ...state,
        [name]: value})
    case RESET_VLAN:
      return initialVlan
    default:
      return state
  }
}

const initialAllVlans = null

export function allVlansReducer(state = initialAllVlans, {type, vlanKey, vlanInfo}) {
  //Object.freeze(state)
  switch(type) {
    case DELETE_VLAN_INFO:
      var newState = state
      delete newState[vlanKey]
      return newState
    case ADD_VLAN_INFO:
      return ({
      ...state,
      [vlanKey]: vlanInfo
    })
    default:
      return state
  }
}