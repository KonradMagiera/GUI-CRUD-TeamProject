import React from 'react'
import { Link } from 'react-router-dom'
import { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'
import edit from '../../../static/edit.png'
import remove from '../../../static/delete.png'

class Subnet extends React.Component {
  componentDidMount() {
    document.body.style.cursor='wait'
    fetchItems("subnets", this.props.addSubnetInfo)
  }

  render() {
    this.props.resetSubnet()
    var subnetItems = null
    if (this.props.allSubnets !== null) {
      subnetItems = Object.keys(this.props.allSubnets).map(key => {
        return (
          <tr key={key}>
            <th><div>{this.props.allSubnets[key].ip_address}</div></th>
            <th><div>{this.props.allSubnets[key].netmask}</div></th>
            <th><div>{this.props.allSubnets[key].ip_assignment}</div></th>
            <th><div>{this.props.allSubnets[key].is_routable ? "Yes" : "No"}</div></th>
            <th><div>{this.props.allSubnets[key].location}</div></th>
            <th><div>{this.props.allSubnets[key].nameservers}</div></th>
            <th><div>{this.props.allSubnets[key].public_or_dmz}</div></th>
            <th><div>{this.props.allSubnets[key].vlan}</div></th>
            <th><div>{this.props.allSubnets[key].description}</div></th>
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

            }}><img src={edit} alt="Edit" className="img-table" /></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allSubnets[key].ip_address, "subnets", key, this.props.deleteSubnetInfo); this.forceUpdate() }} />
            </th>
          </tr>
        )
      })
    }
    return (
      <div className="right">
        <Link to="/register_subnet"><button className="register">Register Subnet</button></Link>
        <Table tabledef={["IP address", "Netmask", "IP assignment", "Is routable", "Location", "Nameservers", "Type", "Vlan", "Description"]} items={subnetItems} len={subnetItems ? subnetItems.length : 1 }/>
      </div>
    )
  }
}

const mapStateToProps = ({ allSubnetsReducer }) => ({
  allSubnets: allSubnetsReducer
})

export default connect(mapStateToProps, { setSubnet, setSubnetItem, resetSubnet, addSubnetInfo, deleteSubnetInfo })(Subnet)