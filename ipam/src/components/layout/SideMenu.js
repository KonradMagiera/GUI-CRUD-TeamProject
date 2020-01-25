import React from 'react'
import { Link } from 'react-router-dom'
import subnet from '../../static/subnet.png'
import vlan from '../../static/vlan.png'
import location from '../../static/location.png'
function SideMenu() {
  return (
    <div className="left">
      <nav>
        <Link to="/subnet">
          <button className="menuItem"><img src={subnet} alt="Subnet" className="img-sidemenu"/>Subnet</button>
        </Link>

        <Link to="/vlan">
          <button className="menuItem"><img src={vlan} alt="VLAN" className="img-sidemenu"/>VLAN</button>
        </Link>

        <Link to="/location">
          <button className="menuItem"><img src={location} alt="Location" className="img-sidemenu"/>Location</button>
        </Link>

        <Link to="/nat">
          <button className="menuItem"><img src={vlan} alt="NAT" className="img-sidemenu"/>NAT</button>
        </Link>
      </nav>
    </div>
  )
}

export default SideMenu