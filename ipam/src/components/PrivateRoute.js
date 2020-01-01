import React from 'react';
import { connect } from 'react-redux'
import { Redirect , Route} from 'react-router-dom';

const mapStateToProps = ({ authenticationReducer }) => ({
    isAuthenticated: authenticationReducer
})


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => {
        return isAuthenticated ? (
        <Component {...props} />
        ) : (
        <Redirect to="/" />
        )
        }}
    />
)

export default connect(mapStateToProps)(PrivateRoute)
