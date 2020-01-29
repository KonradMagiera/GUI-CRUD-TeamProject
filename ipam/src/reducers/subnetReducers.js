import { SET_SUBNET_ITEM, RESET_SUBNET, SET_SUBNET, ADD_SUBNET_INFO, DELETE_SUBNET_INFO, ADD_SUBNET_VLAN, DELETE_SUBNET_VLAN } from "../actions/subnet"


const initialSubnet = {
    subnet_key: "",
    ip_address: "",
    netmask: "",
    vlan: {},
    nameservers: "",
    location: "",
    routable: false,
    public_or_dmz: "Public",
    ip_assignment: "Static",
    description: ""
  }
  
  export function subnetReducer(state = initialSubnet, { type, name, value, subnet, vlan_key, id_vlan }) {
    Object.freeze(state)
    switch (type) {
      case SET_SUBNET:
        return subnet
      case SET_SUBNET_ITEM:
        return ({
          ...state,
          [name]: value})
      case ADD_SUBNET_VLAN:
        return ({
          ...state,
          vlan: {
            [vlan_key]: id_vlan
          }
        })
      case DELETE_SUBNET_VLAN:
        return ({
          ...state,
          vlan: {}
        })
      case RESET_SUBNET:
        return initialSubnet
      default:
        return state
    }
  }
  
  const initialAllSubnets = null
  
  export function allSubnetsReducer(state = initialAllSubnets, {type, subnetKey, subnetInfo}) {
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