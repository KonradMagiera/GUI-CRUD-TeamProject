import React from 'react'
import { Link } from 'react-router-dom'
import { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'

class Subnet extends React.Component {
  componentDidMount() {
    fetchItems("subnets", this.props.addSubnetInfo)
  }

  render() {
    this.props.resetSubnet()
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
              <button onClick={() => { deleteItem(this.props.allSubnets[key].ip_address, "subnets", key, this.props.deleteSubnetInfo); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }
    return (
      <div>
        <label>Subnet</label>
        <Link to="/register_subnet">Register Subnet</Link>
        <Table tabledef={["IP address", "Netmask", "IP assignment", "Is routable", "Location", "Nameservers", "Type", "Vlan", "Description", "Actions"]} items={subnetItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allSubnetsReducer }) => ({
  allSubnets: allSubnetsReducer
})

export default connect(mapStateToProps, { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo })(Subnet)