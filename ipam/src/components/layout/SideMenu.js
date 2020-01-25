import React from 'react'
import { Link } from 'react-router-dom'


function SideMenu() {
  return (
    <div className="left">
      <nav>
        <Link to="/subnet">
          <button className="menuItem">Subnet</button>
        </Link>

        <Link to="/vlan">
          <button className="menuItem">VLAN</button>
        </Link>

        <Link to="/location">
          <button className="menuItem">Location</button>
        </Link>

        <Link to="/nat">
          <button className="menuItem">NAT</button>
        </Link>
      </nav>
    </div>
  )
}

export default SideMenu