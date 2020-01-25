import React from 'react'
import { Link } from 'react-router-dom'
import { addVlanInfo, resetVlan, setVlan, deleteVlanInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'

class Vlan extends React.Component {
  componentDidMount() {
    fetchItems("vlans", this.props.addVlanInfo)
  }

  render() {
    this.props.resetVlan()
    var vlanItems = null

    if (this.props.allVlans !== null) {
      vlanItems = Object.keys(this.props.allVlans).map(key => {
        var vlanSubnets = null;
        if (this.props.allVlans[key].subnets !== undefined) {
          vlanSubnets = Object.keys(this.props.allVlans[key].subnets).map(subnetKey => {
            return (<div key={subnetKey}>{this.props.allVlans[key].subnets[subnetKey]}</div>)
          })
        }
        return (
          <tr key={key}>
            <th>{this.props.allVlans[key].id_vlan}</th>
            <th>{this.props.allVlans[key].description}</th>
            <th>{vlanSubnets}</th>
            <th><Link to="/edit_vlan" onClick={() => {
              this.props.setVlan({
                vlan_key: key,
                id_vlan: this.props.allVlans[key].id_vlan,
                description: this.props.allVlans[key].description,
                subnets: this.props.allVlans[key].subnets ? this.props.allVlans[key].subnets : null,
              })

            }}>Edit</Link>
              <button onClick={() => { deleteItem(this.props.allVlans[key].id_vlan, "vlans", key, this.props.deleteVlanInfo); this.forceUpdate()}}>Delete</button></th>
          </tr>
        )
      })
    }

    return (
      <div>
        <label>VLAN</label>
        <Link to="/register_vlan">Register VLAN</Link>
        <Table tabledef={["ID VLAN", "Description", "Subnets"]} items={vlanItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allVlansReducer }) => ({
  allVlans: allVlansReducer
})

export default connect(mapStateToProps, { addVlanInfo, resetVlan, setVlan, deleteVlanInfo })(Vlan)