import { SET_LOCATION_ITEM, SET_LOCATION, RESET_LOCATION, ADD_LOCATION_INFO, DELETE_LOCATION_INFO } from "../actions/location"

const initialLocation = {
    location_key: "",
    location: "",
    description: ""
  }
  
  export function locationReducer(state = initialLocation, { type, name, value, location }) {
    Object.freeze(state)
    switch (type) {
      case SET_LOCATION:
        return location
      case SET_LOCATION_ITEM:
        return ({
          ...state,
          [name]: value})
      case RESET_LOCATION:
        return initialLocation
      default:
        return state
    }
  }
  
  const initialAllLocations = null
  
  export function allLocationsReducer(state = initialAllLocations, {type, locationKey, locationInfo}) {
    switch(type) {
      case DELETE_LOCATION_INFO:
        var newState = state
        delete newState[locationKey]
        return newState
      case ADD_LOCATION_INFO:
        return ({
        ...state,
        [locationKey]: locationInfo
      })
      default:
        return state
    }
  }