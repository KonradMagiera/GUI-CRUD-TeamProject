import React from 'react'
import { Link } from 'react-router-dom'
import { setNat, setNatItem, resetNat, addNatInfo, deleteNatInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'
import edit from '../../../static/edit.png'
import remove from '../../../static/delete.png'

class Nat extends React.Component {
  componentDidMount() {
    document.body.style.cursor='wait'
    fetchItems("nats", this.props.addNatInfo)
  }

  render() {
    this.props.resetNat()
    var natItems = null
    if (this.props.allNats !== null) {
      natItems = Object.keys(this.props.allNats).map(key => {
        return (
          <tr key={key}>
            <th><div>{this.props.allNats[key].name}</div></th>
            <th><div>{this.props.allNats[key].device}</div></th>
            <th><div>{this.props.allNats[key].ip_external}</div></th>
            <th><div>{this.props.allNats[key].internal_subnet}</div></th>
            <th><div>{this.props.allNats[key].description}</div></th>
            <th><Link to="/edit_nat" onClick={() => {
              this.props.setNat({
                nat_key: key,
                name: this.props.allNats[key].name,
                device: this.props.allNats[key].device,
                description: this.props.allNats[key].description,
                ip_external: this.props.allNats[key].ip_external,
                internal_subnet: this.props.allNats[key].internal_subnet,
              })

            }}><img src={edit} alt="Edit" className="img-table" /></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allNats[key].name, "nats", key, this.props.deleteNatInfo); this.forceUpdate() }} />
            </th>
          </tr>
        )
      })
    }
    return (
      <div className="right">
        <Link to="/register_nat"><button className="register">Register NAT</button></Link>
        <Table tabledef={["Name", "Device", "External IP", "Internal subnet", "Description"]} items={natItems} len={natItems ? natItems.length : 1 }/>
      </div>
    )
  }
}

const mapStateToProps = ({ allNatsReducer }) => ({
  allNats: allNatsReducer
})

export default connect(mapStateToProps, { setNat, setNatItem, resetNat, addNatInfo, deleteNatInfo })(Nat)