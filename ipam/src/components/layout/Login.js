import React from 'react';
import 'firebase/auth';
import Firebase from '../../firebaseConfig';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../../actions'


class Login extends React.Component {
  handleLogin(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.login(true))
      .catch(() => this.props.login(false))
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />
    }
    return (
      <div className="container-middle">
      <form className="form-middle" onSubmit={e => this.handleLogin(e)}>
        <label htmlFor="email" className="login-label">Email:</label>
        <input type="text" name="email" className="login-input" placeholder="email" />
        <label htmlFor="password" className="login-label">Password:</label>
        <input type="password" name="password" className="login-input" placeholder="password" />
        <button className="login-button">Sign in</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = ({ authenticationReducer }) => ({
  isAuthenticated: authenticationReducer
})

export default connect(mapStateToProps, { login })(Login)
