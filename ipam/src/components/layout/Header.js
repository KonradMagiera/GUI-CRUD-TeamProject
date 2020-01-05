import React from 'react'
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'



function Header(props) {
  return (
    <header className="top-bar" >
      <nav className="top-bar-links">
        <Link to="/">
          <button onClick={() => { props.logout(false) }}>Logout</button>
        </Link> 
        <Link to="/home">
          <button>Home</button>
        </Link>

        <Link to="/register_subnet">
        <button>Register subnet</button>
        </Link>
      </nav>
    </header>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

export default connect(null, mapDispatchToProps)(Header)