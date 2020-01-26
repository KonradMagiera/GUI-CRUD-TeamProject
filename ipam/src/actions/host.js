export const SET_HOST_ITEM = "SET_HOST_ITEM"
export const SET_HOST = "SET_HOST"
export const RESET_HOST = "RESET_HOST"
export const ADD_HOST_INFO = "ADD_HOST_INFO"
export const DELETE_HOST_INFO = "DELETE_HOST_INFO"

export const setHost = host => dispatch => {
    dispatch({
        type: SET_HOST,
        host
    })
}

export const setHostItem = (name, value) => dispatch => {
    dispatch({
        type: SET_HOST_ITEM,
        name,
        value
    })
}

export const resetHost = () => dispatch => {
    dispatch({
        type: RESET_HOST
    })
}

export const addHostInfo = (hostKey, hostInfo) => dispatch => {
    dispatch({
        type: ADD_HOST_INFO,
        hostKey,
        hostInfo
    })
}

export const deleteHostInfo = (hostKey) => dispatch => {
    dispatch({
        type: DELETE_HOST_INFO,
        hostKey
    })
}