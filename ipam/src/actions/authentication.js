export const LOG_IN = 'LOG_IN'


export const login = (isAuthenticated) => ({
  type: LOG_IN,
  isAuthenticated
})