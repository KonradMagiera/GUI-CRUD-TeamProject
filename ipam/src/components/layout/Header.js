import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, resetSubnet } from '../../actions'


function Header(props) {
  return (
    <header className="top-bar" >
      <nav className="top-bar-links">
        <Link to="/">
          <button onClick={() => { 
            props.login(false) 
            props.resetSubnet()
            }}>Logout</button>
        </Link>
        <Link to="/home">
          <button>Home</button>
        </Link>

        <Link to="/subnet">
          <button>Subnet</button>
        </Link>

        <Link to="/vlan">
          <button>VLAN</button>
        </Link>
      </nav>
    </header>
  )
}

export default connect(null, {login, resetSubnet})(Header)