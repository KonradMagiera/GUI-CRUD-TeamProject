import React from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../../firebaseConfig';
import { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo } from '../../../actions'
import { connect } from 'react-redux'

class Subnet extends React.Component {
  componentDidMount() {
    this.fetchSubnets()
  }

  fetchSubnets = () => {
    Firebase.database().ref("/subnets").once("value", data => {
      var subnets = data.val()
      if (subnets !== null) {
        Object.keys(subnets).map(key => {
          return this.props.addSubnetInfo(key, subnets[key])
        })
      } else {
        return subnets
      }

    })
  }


  render() {
    this.props.resetSubnet() // reset subnet store
    var subnetItems = null
    if (this.props.allSubnets !== null) {
      subnetItems = Object.keys(this.props.allSubnets).map(key => {
        return (
          <tr key={key}>
            <th>{this.props.allSubnets[key].ip_address}</th>
            <th>{this.props.allSubnets[key].netmask}</th>
            <th>{this.props.allSubnets[key].ip_assignment}</th>
            <th>{this.props.allSubnets[key].is_routable ? "Yes" : "No"}</th>
            <th>{this.props.allSubnets[key].location}</th>
            <th>{this.props.allSubnets[key].nameservers}</th>
            <th>{this.props.allSubnets[key].public_or_dmz}</th>
            <th>{this.props.allSubnets[key].vlan}</th>
            <th>{this.props.allSubnets[key].description}</th>
            <th><Link to="/edit_subnet" onClick={() => {
              this.props.setSubnet({
                subnet_key: key,
                ip_address: this.props.allSubnets[key].ip_address,
                netmask: this.props.allSubnets[key].netmask,
                vlan: this.props.allSubnets[key].vlan,
                nameservers: this.props.allSubnets[key].nameservers,
                location: this.props.allSubnets[key].location,
                routable: this.props.allSubnets[key].is_routable,
                public_or_dmz: this.props.allSubnets[key].public_or_dmz,
                ip_assignment: this.props.allSubnets[key].ip_assignment,
                description: this.props.allSubnets[key].description
              })

            }}>Edit</Link>
              <button onClick={() => { Firebase.database().ref(`/subnets/${key}`).remove(); this.props.deleteSubnetInfo(key); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }
    return (
      <div>
        <label>Subnet</label>
        <Link to="/register_subnet">Register Subnet</Link>
        <table>
          <tbody>
            <tr>
              <th>IP address</th>
              <th>Netmask</th>
              <th>IP assignment</th>
              <th>Is routable</th>
              <th>Location</th>
              <th>Nameservers</th>
              <th>Type</th>
              <th>Vlan</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {subnetItems}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ allSubnetsReducer }) => ({
  allSubnets: allSubnetsReducer
})

export default connect(mapStateToProps, { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo })(Subnet)