import React from 'react';
import 'firebase/auth';
import Firebase from '../../firebaseConfig';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authentication'


const mapStateToProps = ({ authenticationReducer }) => ({
    isAuthenticated: authenticationReducer
})

const mapDispatchToProps = dispatch => ({
    login: isAuthenticated => dispatch(login(isAuthenticated))
})


class Login extends React.Component {
    async handleLogin(e) {
        e.preventDefault()
        const  email = e.target.email.value
        const password = e.target.password.value
        var isAuth
        await Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => isAuth = true)
            .catch(() => isAuth = false)

        this.props.login(isAuth)

    }

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/home" />
        }
        return (
            <form onSubmit={e => this.handleLogin(e)}>
                <input type="text" name="email" placeholder="email"/>
                <input type="password" name="password" placeholder="password"/>
                <div>
                    <button>Sign in</button>
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
