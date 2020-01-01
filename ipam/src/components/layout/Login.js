import React from 'react';
import 'firebase/auth';
import Firebase from '../../firebaseConfig';



class Login extends React.Component {

    async handleLogin(e) {
        e.preventDefault()
        const  email = e.target.email.value
        const password = e.target.password.value

        var msg = ""
        await Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => msg = "")
            .catch(error => msg = error.message)

        // TODO redirect to PrivateRoute pages; move Firebase.auth to Redux action
        console.log(msg === "" ? "true" : msg)
    }

    render() {
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


export default Login;
