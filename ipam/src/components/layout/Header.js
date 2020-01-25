import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, resetSubnet, resetVlan, resetLocation, resetNat } from '../../actions'


function Header(props) {
  return (
    <header className="top-bar" >
      <nav className="top-bar-links">
        <Link to="/">
          <button onClick={() => { 
            props.login(false) 
            props.resetSubnet()
            props.resetLocation()
            props.resetVlan()
            props.resetNat()
            }}>Logout</button>
        </Link>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </nav>
    </header>
  )
}

export default connect(null, {login, resetSubnet, resetVlan, resetLocation, resetNat})(Header)