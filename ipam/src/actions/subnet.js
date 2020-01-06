export const SET_SUBNET = "SET_SUBNET"
export const RESET_SUBNET = "RESET_SUBNET"

export const setSubnet = (name, value) => dispatch => {
    dispatch({
        type: SET_SUBNET,
        name,
        value
    })
}

export const resetSubnet = () => dispatch => {
    dispatch({
        type: RESET_SUBNET
    })
}