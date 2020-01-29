import React from 'react'
import { Link } from 'react-router-dom'
import subnet from '../../static/subnet.png'
import vlan from '../../static/vlan.png'
import location from '../../static/location.png'
import host from '../../static/host.png'
import {download, selectFile} from '../../utils/FileHandler'
import { exportDB } from '../../actions/index'

function SideMenu() {
  return (
    <div className="left">
      <nav>
        <Link to="/subnet">
          <button className="menuItem"><img src={subnet} alt="Subnet" className="img-sidemenu" />Subnet</button>
        </Link>

        <Link to="/vlan">
          <button className="menuItem"><img src={vlan} alt="VLAN" className="img-sidemenu" />VLAN</button>
        </Link>

        <Link to="/location">
          <button className="menuItem"><img src={location} alt="Location" className="img-sidemenu" />Location</button>
        </Link>

        <Link to="/nat">
          <button className="menuItem"><img src={vlan} alt="NAT" className="img-sidemenu" />NAT</button>
        </Link>

        <Link to="/host">
          <button className="menuItem"><img src={host} alt="Host" className="img-sidemenu" />Host</button>
        </Link>
        <div className="bottom">  
          <button className="menuItem" onClick={() => { exportDB(download) }}>Export</button>
          <button className="menuItem" onClick={() => { document.getElementById('file-input').click() }}>Import</button>
          <input id="file-input" type="file" name="name" style={{display: "none"}} onChange={() => {selectFile()}} ></input>
        </div>
      </nav>
    </div>
  )
}

export default SideMenu