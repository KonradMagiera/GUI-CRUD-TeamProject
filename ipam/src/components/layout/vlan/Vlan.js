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
        if (this.props.allVlans[key].subnets !== undefined) {
          vlanSubnets = Object.keys(this.props.allVlans[key].subnets).map(subnetKey => {
            return (<div key={subnetKey}>{this.props.allVlans[key].subnets[subnetKey]}</div>)
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
                subnets: this.props.allVlans[key].subnets ? this.props.allVlans[key].subnets : null,
              })

            }}><img src={edit} alt="Edit" className="img-table"/></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allVlans[key].id_vlan, "vlans", key, this.props.deleteVlanInfo); this.forceUpdate()}}/>
            </th>
          </tr>
        )
      })
    }
    document.body.style.cursor='default'
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