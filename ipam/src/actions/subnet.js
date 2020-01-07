export const SET_SUBNET_ITEM = "SET_SUBNET_ITEM"
export const SET_SUBNET = "SET_SUBNET"
export const RESET_SUBNET = "RESET_SUBNET"
export const ADD_SUBNET_INFO = "ADD_SUBNET_INFO"
export const DELETE_SUBNET_INFO = "DELETE_SUBNET_INFO"

export const setSubnet = subnet => dispatch => {
    dispatch({
        type: SET_SUBNET,
        subnet
    })
}

export const setSubnetItem = (name, value) => dispatch => {
    dispatch({
        type: SET_SUBNET_ITEM,
        name,
        value
    })
}

export const resetSubnet = () => dispatch => {
    dispatch({
        type: RESET_SUBNET
    })
}

export const addSubnetInfo = (subnetKey, subnetInfo) => dispatch => {
    dispatch({
        type: ADD_SUBNET_INFO,
        subnetKey,
        subnetInfo
    })
}

export const deleteSubnetInfo = (subnetKey) => dispatch => {
    dispatch({
        type: DELETE_SUBNET_INFO,
        subnetKey
    })
}