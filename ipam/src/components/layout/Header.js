import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, resetSubnet, resetVlan, resetLocation, resetNat, resetHost } from '../../actions'


function Header(props) {
  return (
    <header className="top-bar" >
      <nav className="top-bar-links">
        <Link to="/home">
          <label className="logo">IP Managment Studio</label>
        </Link>
        <Link to="/">
          <button  className="logout" onClick={() => {
            props.login(false)
            props.resetSubnet()
            props.resetLocation()
            props.resetVlan()
            props.resetNat()
            props.resetHost()
          }}>Logout</button>
        </Link>
      </nav>
    </header>
  )
}

export default connect(null, { login, resetSubnet, resetVlan, resetLocation, resetNat, resetHost })(Header)