import React from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../../firebaseConfig';
import { setSubnet, setSubnetItem, resetSubnet } from '../../../actions'
import { connect } from 'react-redux'

class Subnet extends React.Component {
  constructor(props) {
    super(props)
    this.state = { datax: <tr></tr> }
  }

  componentDidMount() {
    this.fetchSubnets()
  }

  fetchSubnets = () => {
    Firebase.database().ref("/subnets").on("value", data => {
      var tmp = data.val()
      var datax = Object.keys(tmp).map(key => {
        return (
          <tr key={key}>
            <th>{tmp[key].ip_address}</th>
            <th>{tmp[key].netmask}</th>
            <th>{tmp[key].ip_assignment}</th>
            <th>{tmp[key].is_routable ? "Yes" : "No"}</th>
            <th>{tmp[key].location}</th>
            <th>{tmp[key].nameservers}</th>
            <th>{tmp[key].public_or_dmz}</th>
            <th>{tmp[key].vlan}</th>
            <th>{tmp[key].description}</th>
            <th><Link to="/edit_subnet" onClick={() => {
              this.props.setSubnet({
                subnet_key: key,
                ip_address: tmp[key].ip_address,
                netmask: tmp[key].netmask,
                vlan: tmp[key].vlan,
                nameservers: tmp[key].nameservers,
                location: tmp[key].location,
                routable: tmp[key].is_routable,
                public_or_dmz: tmp[key].public_or_dmz,
                ip_assignment: tmp[key].ip_assignment,
                description: tmp[key].description
              })

            }}>Edit</Link></th>
          </tr>
        )
      })
      this.setState({ datax: datax })
    })
  }

  render() {
    this.props.resetSubnet() // reset subnet store
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
            {this.state.datax}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, { setSubnet, setSubnetItem, resetSubnet })(Subnet)