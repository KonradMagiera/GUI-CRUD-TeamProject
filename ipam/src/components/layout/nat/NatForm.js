import React from 'react';
import { setNatItem, resetNat, addItem, updateItem } from '../../../actions'
import { connect } from 'react-redux'

class NatForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var natTmp = {
      "name": this.props.nat.name,
      "device": this.props.nat.device,
      "description": this.props.nat.description,
      "ip_external": this.props.nat.ip_external,
      "internal_subnet": this.props.nat.internal_subnet
    }
    if (this.props.nat.nat_key === "") {
      addItem("nats", natTmp)
    } else {
      updateItem("nats", this.props.nat.nat_key, natTmp)
    }
    this.props.resetNat()
    this.props.history.push("/nat"); // redirect after success
  }

  handleChange = e => {
    const { name, value } = e.target
    this.props.setNatItem(name, value)
  }

  cancelOperation = () => {
    this.props.history.push("/nat");
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="right">
        <div className="register-box">
            <h2>{this.props.nat.nat_key === "" ? "Register NAT" : "Edit NAT"}</h2>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.props.nat.name} placeholder="Name" onChange={e => this.handleChange(e)} />
            <label htmlFor="device">Device</label>
            <input type="text" name="device" value={this.props.nat.device} placeholder="Device" onChange={e => this.handleChange(e)} />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={this.props.nat.description} placeholder="Description" onChange={e => this.handleChange(e)} />
            <label htmlFor="ip_external">External IP</label>
            <input type="text" name="ip_external" value={this.props.nat.ip_external} placeholder="External IP" onChange={e => this.handleChange(e)} />
            <label htmlFor="internal_subnet">Internal subnet</label>
            <input type="text" name="internal_subnet" value={this.props.nat.internal_subnet} placeholder="Internal subnet" onChange={e => this.handleChange(e)} />
            <div className="button-actions">
              <button>{this.props.nat.nat_key === "" ? "Register" : "Update"}</button>
              <button className="cancel-button" onClick={() => this.cancelOperation()}>Cancel</button>
            </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ natReducer }) => ({
  nat: natReducer
})

export default connect(mapStateToProps, { setNatItem, resetNat })(NatForm)