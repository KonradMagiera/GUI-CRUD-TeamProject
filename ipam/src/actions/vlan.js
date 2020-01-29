export const SET_VLAN_ITEM = "SET_VLAN_ITEM"
export const SET_VLAN = "SET_VLAN"
export const RESET_VLAN = "RESET_VLAN"
export const ADD_VLAN_INFO = "ADD_VLAN_INFO"
export const DELETE_VLAN_INFO = "DELETE_VLAN_INFO"
export const ADD_VLAN_SUBNET = "ADD_VLAN_SUBNET"
export const DELETE_VLAN_SUBNET = "DELETE_VLAN_SUBNET"


export const setVlan = vlan => dispatch => {
    dispatch({
        type: SET_VLAN,
        vlan
    })
}

export const setVlanItem = (name, value) => dispatch => {
    dispatch({
        type: SET_VLAN_ITEM,
        name,
        value
    })
}

export const resetVlan = () => dispatch => {
    dispatch({
        type: RESET_VLAN
    })
}

export const addVlanInfo = (vlanKey, vlanInfo) => dispatch => {
    dispatch({
        type: ADD_VLAN_INFO,
        vlanKey,
        vlanInfo
    })
}

export const deleteVlanInfo = (vlanKey) => dispatch => {
    dispatch({
        type: DELETE_VLAN_INFO,
        vlanKey
    })
}

export const addVlanSubnet = (subnet_key, subnet_ip_address) => dispatch => {
    dispatch({
        type: ADD_VLAN_SUBNET,
        subnet_key,
        subnet_ip_address
    })
}

export const deleteVlanSubnet = () => dispatch => {
    dispatch({
        type: DELETE_VLAN_SUBNET
    })
}