import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'


const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

function Home(props)  {
  return (
    <div>
        <label>After login TMP TEST</label>
        <div>
        <Link to="/">Link without logout</Link>
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