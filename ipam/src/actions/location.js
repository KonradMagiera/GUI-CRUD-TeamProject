export const SET_LOCATION_ITEM = "SET_LOCATION_ITEM"
export const SET_LOCATION = "SET_LOCATION"
export const RESET_LOCATION = "RESET_LOCATION"
export const ADD_LOCATION_INFO = "ADD_LOCATION_INFO"
export const DELETE_LOCATION_INFO = "DELETE_LOCATION_INFO"

export const setLocation = location => dispatch => {
    dispatch({
        type: SET_LOCATION,
        location
    })
}

export const setLocationItem = (name, value) => dispatch => {
    dispatch({
        type: SET_LOCATION_ITEM,
        name,
        value
    })
}

export const resetLocation = () => dispatch => {
    dispatch({
        type: RESET_LOCATION
    })
}

export const addLocationInfo = (locationKey, locationInfo) => dispatch => {
    dispatch({
        type: ADD_LOCATION_INFO,
        locationKey,
        locationInfo
    })
}

export const deleteLocationInfo = (locationKey) => dispatch => {
    dispatch({
        type: DELETE_LOCATION_INFO,
        locationKey
    })
}