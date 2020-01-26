import React from 'react';
import { setSubnetItem, resetSubnet, addItem, updateItem } from '../../../actions'
import { connect } from 'react-redux'
import { validateIPaddress, validateNetmask } from '../../../utils/validation'

class SubnetForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var subnetTmp = {
      "ip_address": this.props.subnet.ip_address === "" ? "127.0.0.1" : this.props.subnet.ip_address,
      "netmask": this.props.subnet.netmask === "" ? "255.255.0.0" : this.props.subnet.netmask,
      "vlan": this.props.subnet.vlan,
      "nameservers": this.props.subnet.nameservers,
      "location": this.props.subnet.location,
      "is_routable": this.props.subnet.routable,
      "public_or_dmz": this.props.subnet.public_or_dmz,
      "ip_assignment": this.props.subnet.ip_assignment,
      "description": this.props.subnet.description
    }
    if (this.props.subnet.subnet_key === "") {
      addItem("subnets", subnetTmp)
    } else {
      updateItem("subnets", this.props.subnet.subnet_key, subnetTmp)
    }
    this.props.resetSubnet()
    this.props.history.push("/subnet");
  }

  handleChange = e => {
    const { name, value, type, checked } = e.target
    type === "checkbox"
      ? this.props.setSubnetItem(name, checked)
      : this.props.setSubnetItem(name, value)

    if (name === "ip_address") {
      if (validateIPaddress(value)) {
        e.target.style.borderColor = "black"
      } else {
        e.target.style.borderColor = "red"
      }
    }
    if (name === "netmask") {
      if (validateNetmask(value)) {
        e.target.style.borderColor = "black"
      } else {
        e.target.style.borderColor = "red"
      }
    }
  }

  cancelOperation = () => {
    this.props.history.push("/subnet");
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="right">
        <div className="register-box">
          <h2>{this.props.subnet.subnet_key === "" ? "Register subnet" : "Edit subnet"}</h2>
          <label htmlFor="ip_address">IP address</label>
          <input type="text" name="ip_address" value={this.props.subnet.ip_address} placeholder="127.0.0.1" onChange={e => this.handleChange(e)} />
          <label htmlFor="netmask">Netmask</label>
          <input type="text" name="netmask" value={this.props.subnet.netmask} placeholder="255.255.0.0" onChange={e => this.handleChange(e)} />
          <label htmlFor="vlan">VLAN</label>
          <input type="text" name="vlan" value={this.props.subnet.vlan} placeholder="VLAN" onChange={e => this.handleChange(e)} />
          <label htmlFor="nameservers">Nameservers</label>
          <input type="text" name="nameservers" value={this.props.subnet.nameservers} placeholder="Nameservers" onChange={e => this.handleChange(e)} />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" value={this.props.subnet.location} placeholder="Location" onChange={e => this.handleChange(e)} />
          <label><input type="checkbox" value="routable" name="routable" checked={this.props.subnet.routable} onChange={e => this.handleChange(e)} />Is routable?</label>
          <label htmlFor="public_or_dmz">Public / DMZ</label>
          <div className="radio-box">
            <input type="radio" value="Public" name="public_or_dmz" id="radio_public" checked={this.props.subnet.public_or_dmz === "Public"} onChange={e => this.handleChange(e)} />
            <label htmlFor="radio_public">Static</label>
          </div>
          <div className="radio-box">
            <input type="radio" value="DMZ" id="radio_dmz" name="public_or_dmz" checked={this.props.subnet.public_or_dmz === "DMZ"} onChange={e => this.handleChange(e)} />
            <label htmlFor="radio_dmz">DMZ</label>
          </div>
          <label htmlFor="ip_assignment">IP assignment:</label>
          <div className="radio-box">
            <input type="radio" value="Static" id="ip_assignment_static" name="ip_assignment" checked={this.props.subnet.ip_assignment === "Static"} onChange={e => this.handleChange(e)} />
            <label htmlFor="ip_assignment_static">Static</label>
          </div>
          <div className="radio-box">
            <input type="radio" value="Dynamic" name="ip_assignment" id="ip_assignment_dynamic" checked={this.props.subnet.ip_assignment === "Dynamic"} onChange={e => this.handleChange(e)} />
            <label htmlFor="ip_assignment_dynamic">Dynamic</label>
          </div>
          <label htmlFor="description">Description</label>
          <textarea name="description" value={this.props.subnet.description} placeholder="Description" onChange={e => this.handleChange(e)} />
          <div className="button-actions">
            <button>{this.props.subnet.subnet_key === "" ? "Register" : "Update"}</button>
            <button className="cancel-button" onClick={() => this.cancelOperation()}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}


const mapStateToProps = ({ subnetReducer }) => ({
  subnet: subnetReducer
})

export default connect(mapStateToProps, { setSubnetItem, resetSubnet })(SubnetForm)