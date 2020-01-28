import { ADD_NAT_INFO, RESET_NAT, SET_NAT, DELETE_NAT_INFO, SET_NAT_ITEM, ADD_NAT_DEVICE } from "../actions/nat"

const initialNat = {
    nat_key: "",
    name: "",
    //device: "",
    device: {},
    description: "",
    ip_external: "",
    internal_subnet: ""
  }
  
  export function natReducer(state = initialNat, { type, name, value, nat, device_key, device_name }) {
    Object.freeze(state)
    switch (type) {
      case SET_NAT:
        return nat
      case SET_NAT_ITEM:
        return ({
          ...state,
          [name]: value})
      case ADD_NAT_DEVICE:
        return ({
          ...state,
          device: {
            [device_key]: device_name
          }
        })
      case RESET_NAT:
        return initialNat
      default:
        return state
    }
  }
  
  const initialAllNats = null
  
  export function allNatsReducer(state = initialAllNats, {type, natKey, natInfo}) {
    //Object.freeze(state)
    switch(type) {
      case DELETE_NAT_INFO:
        var newState = state
        delete newState[natKey]
        return newState
      case ADD_NAT_INFO:
        return ({
        ...state,
        [natKey]: natInfo
      })
      default:
        return state
    }
  }