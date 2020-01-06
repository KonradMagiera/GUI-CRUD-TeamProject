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
      <form onSubmit={e => this.handleLogin(e)}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <div>
          <button>Sign in</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ authenticationReducer }) => ({
  isAuthenticated: authenticationReducer
})

export default connect(mapStateToProps, { login })(Login)
