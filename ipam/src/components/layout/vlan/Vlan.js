import React from 'react'
import { Link } from 'react-router-dom'
import { addVlanInfo, resetVlan, setVlan, deleteVlanInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'
import edit from '../../../static/edit.png'
import remove from '../../../static/delete.png'

class Vlan extends React.Component {
  componentDidMount() {
    document.body.style.cursor='wait'
    fetchItems("vlans", this.props.addVlanInfo)
  }

  render() {
    this.props.resetVlan()
    var vlanItems = null

    if (this.props.allVlans !== null) {
      vlanItems = Object.keys(this.props.allVlans).map(key => {
        var vlanSubnets = null;
        if (this.props.allVlans[key].subnet !== undefined) {
          vlanSubnets = Object.keys(this.props.allVlans[key].subnet).map(subnetKey => {
            return (<div key={subnetKey}>{this.props.allVlans[key].subnet[subnetKey]}</div>)
          })
        }
        return (
          <tr key={key}>
            <th><div>{this.props.allVlans[key].id_vlan}</div></th>
            <th><div>{vlanSubnets}</div></th>
            <th><div>{this.props.allVlans[key].description}</div></th>
            <th><Link to="/edit_vlan" onClick={() => {
              this.props.setVlan({
                vlan_key: key,
                id_vlan: this.props.allVlans[key].id_vlan,
                description: this.props.allVlans[key].description,
                subnet: this.props.allVlans[key].subnet ? this.props.allVlans[key].subnet : null,
              })

            }}><img src={edit} alt="Edit" className="img-table"/></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allVlans[key].id_vlan, "vlans", key, this.props.deleteVlanInfo); this.forceUpdate()}}/>
            </th>
          </tr>
        )
      })
    }
    return (
      <div className="right">
        <Link to="/register_vlan"><button className="register">Register VLAN</button></Link>
        <Table tabledef={["ID VLAN", "Subnets", "Description"]} items={vlanItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allVlansReducer }) => ({
  allVlans: allVlansReducer
})

export default connect(mapStateToProps, { addVlanInfo, resetVlan, setVlan, deleteVlanInfo })(Vlan)