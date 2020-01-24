import React from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../../firebaseConfig';
import { setNat, setNatItem, resetNat, addNatInfo, deleteNatInfo, fetchItems } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'

class Nat extends React.Component {
  componentDidMount() {
    fetchItems("nats", this.props.addNatInfo)
  }

  render() {
    this.props.resetNat() // reset subnet store
    var natItems = null
    if (this.props.allNats !== null) {
      natItems = Object.keys(this.props.allNats).map(key => {
        return (
          <tr key={key}>
            <th>{this.props.allNats[key].name}</th>
            <th>{this.props.allNats[key].device}</th>
            <th>{this.props.allNats[key].description}</th>
            <th>{this.props.allNats[key].ip_external}</th>
            <th>{this.props.allNats[key].internal_subnet}</th>
            <th><Link to="/edit_nat" onClick={() => {
              this.props.setNat({
                nat_key: key,
                name: this.props.allNats[key].name,
                device: this.props.allNats[key].device,
                description: this.props.allNats[key].description,
                ip_external: this.props.allNats[key].ip_external,
                internal_subnet: this.props.allNats[key].internal_subnet,
              })

            }}>Edit</Link>
              <button onClick={() => { Firebase.database().ref(`/nats/${key}`).remove(); this.props.deleteNatInfo(key); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }
    return (
      <div>
        <label>NAT</label>
        <Link to="/register_nat">Register NAT</Link>
        <Table tabledef={["Name", "Device", "Description", "External IP", "Internal subnet"]} items={natItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allNatsReducer }) => ({
  allNats: allNatsReducer
})

export default connect(mapStateToProps, { setNat, setNatItem, resetNat, addNatInfo, deleteNatInfo })(Nat)