export const LOG_IN = 'LOG_IN'


export const login = isAuthenticated => dispatch => {
  dispatch({
  type: LOG_IN,
  isAuthenticated
  })
}