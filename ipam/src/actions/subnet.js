export const SET_SUBNET = "SET_SUBNET"

export const setSubnet = subnet => dispatch => {
    dispatch({
        type: SET_SUBNET,
        subnet
    })
}