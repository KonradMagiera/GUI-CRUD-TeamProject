import React from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../../firebaseConfig';
import { addVlanInfo, resetVlan, setVlan, deleteVlanInfo } from '../../../actions'
import { connect } from 'react-redux'

class Vlan extends React.Component {
  componentDidMount() {
    this.fetchVlans()
  }

  fetchVlans = () => {
    Firebase.database().ref("/vlans").once("value", data => {
      var vlans = data.val()
      if (vlans !== null) {
        Object.keys(vlans).map(key => {
          return this.props.addVlanInfo(key, vlans[key])
        })
      } else {
        return vlans
      }

    })
  }

  render() {
    this.props.resetVlan()
    var vlanItems = null
    if (this.props.allVlans !== null) {
      vlanItems = Object.keys(this.props.allVlans).map(key => {
        return (
          <tr key={key}>
            <th>{this.props.allVlans[key].id_vlan}</th>
            <th>{this.props.allVlans[key].description}</th>
            <th>{this.props.allVlans[key].subnets}</th>
            <th><Link to="/edit_vlan" onClick={() => {
              this.props.setVlan({
                vlan_key: key,
                id_vlan: this.props.allVlans[key].id_vlan,
                description: this.props.allVlans[key].description,
                subnets: this.props.allVlans[key].subnets,
              })

            }}>Edit</Link>
              <button onClick={() => { Firebase.database().ref(`/vlans/${key}`).remove(); this.props.deleteVlanInfo(key); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }
    return (
      <div>
        <label>VLAN</label>
        <Link to="/register_vlan">Register VLAN</Link>
        <table>
          <tbody>
            <tr>
              <th>ID VLAN</th>
              <th>Description</th>
              <th>Subnets</th>
              <th>Actions</th>
            </tr>
            {vlanItems}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ allVlansReducer }) => ({
  allVlans: allVlansReducer
})

export default connect(mapStateToProps, { addVlanInfo, resetVlan, setVlan, deleteVlanInfo })(Vlan)