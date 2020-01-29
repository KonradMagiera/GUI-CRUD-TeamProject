import { ADD_VLAN_INFO, RESET_VLAN, SET_VLAN, DELETE_VLAN_INFO, SET_VLAN_ITEM, ADD_VLAN_SUBNET, DELETE_VLAN_SUBNET } from "../actions/vlan"

const initialVlan = {
    vlan_key: "",
    id_vlan: "",
    description: "",
    vlan: "",
    subnet: {}
  }
  
  export function vlanReducer(state = initialVlan, { type, name, value, vlan, subnet_key, subnet_ip_address }) {
    Object.freeze(state)
    switch (type) {
      case SET_VLAN:
        return vlan
      case ADD_VLAN_SUBNET:
        return ({
          ...state,
          subnet: {
            [subnet_key]: subnet_ip_address
          }
        })
      case DELETE_VLAN_SUBNET:
        return ({
          ...state,
          subnet: {}
        })
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