import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'
import  Firebase  from '../../firebaseConfig';


const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

function db(){
  //Firebase.database().ref('/ips').push(["new", "smth"]).
  var key = Firebase.database().ref('/ips').push({"ip:":"192", "name":"test"}).key //dodaje ale pod jakims magicznym kluczem
 // Firebase.database().ref('/devices').set({ "a":"test", "b":"xd", "c":"dx"}); //nadpisuje cala baze i wstawia tylko to
}


function Home(props)  {
  return (
    <div>
        <label>After login TMP TEST</label>
        <div>
        <Link to="/" onClick={() => { db() }}>Link without logout</Link>
        </div>
        <div>
        <Link to="/" onClick={() => { props.logout(false) }} >
          Logout
        </Link>
        </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Home)