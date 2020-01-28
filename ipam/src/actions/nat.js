export const SET_NAT_ITEM = "SET_NAT_ITEM"
export const SET_NAT = "SET_NAT"
export const RESET_NAT = "RESET_NAT"
export const ADD_NAT_INFO = "ADD_NAT_INFO"
export const DELETE_NAT_INFO = "DELETE_NAT_INFO"
export const ADD_NAT_DEVICE = "ADD_NAT_DEVICE"


export const setNat = nat => dispatch => {
    dispatch({
        type: SET_NAT,
        nat
    })
}

export const setNatItem = (name, value) => dispatch => {
    dispatch({
        type: SET_NAT_ITEM,
        name,
        value
    })
}

export const resetNat = () => dispatch => {
    dispatch({
        type: RESET_NAT
    })
}

export const addNatInfo = (natKey, natInfo) => dispatch => {
    dispatch({
        type: ADD_NAT_INFO,
        natKey,
        natInfo
    })
}

export const deleteNatInfo = (natKey) => dispatch => {
    dispatch({
        type: DELETE_NAT_INFO,
        natKey
    })
}

export const addNatDevice = (device_key, device_name) => dispatch => {
    dispatch({
        type: ADD_NAT_DEVICE,
        device_key,
        device_name
    })
}