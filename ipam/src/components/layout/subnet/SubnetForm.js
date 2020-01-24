import React from 'react';
import { setSubnetItem, resetSubnet, addItem, updateItem } from '../../../actions'
import { connect } from 'react-redux'

class SubnetForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var subnetTmp = {
      "ip_address": this.props.subnet.ip_address,
      "netmask": this.props.subnet.netmask,
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
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <h2>{this.props.subnet.subnet_key === "" ? "Register subnet" : "Edit subnet"}</h2>
        </div>
        <div>
          <label htmlFor="ip_address">IP address</label>
        </div>
        <div>
          <input type="text" name="ip_address" value={this.props.subnet.ip_address} placeholder="ip_address" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="netmask">Netmask</label>
        </div>
        <div>
          <input type="text" name="netmask" value={this.props.subnet.netmask} placeholder="netmask" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="vlan">VLAN</label>
        </div>
        <div>
          <input type="text" name="vlan" value={this.props.subnet.vlan} placeholder="vlan" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="nameservers">Nameservers</label>
        </div>
        <div>
          <input type="text" name="nameservers" value={this.props.subnet.nameservers} placeholder="nameservers" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="location">Location</label>
        </div>
        <div>
          <input type="text" name="location" value={this.props.subnet.location} placeholder="location" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label><input type="checkbox" value="routable" name="routable" checked={this.props.subnet.routable} onChange={e => this.handleChange(e)} />Is routable?</label>
        </div>
        <div>
          <label htmlFor="public_or_dmz">Public / DMZ</label>
        </div>
        <div>
          <input type="radio" value="Public" name="public_or_dmz" checked={this.props.subnet.public_or_dmz === "Public"} onChange={e => this.handleChange(e)} />Public
          <input type="radio" value="DMZ" name="public_or_dmz" checked={this.props.subnet.public_or_dmz === "DMZ"} onChange={e => this.handleChange(e)} />DMZ
        </div>
        <div>
          <label htmlFor="ip_assignment">IP assignment:</label>
        </div>
        <div>
          <input type="radio" value="Static" name="ip_assignment" checked={this.props.subnet.ip_assignment === "Static"} onChange={e => this.handleChange(e)} />Static
          <input type="radio" value="Dynamic" name="ip_assignment" checked={this.props.subnet.ip_assignment === "Dynamic"} onChange={e => this.handleChange(e)} />Dynamic
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea name="description" value={this.props.subnet.description} placeholder="description" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <button>{this.props.subnet.subnet_key === "" ? "Register" : "Update"}</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ subnetReducer }) => ({
  subnet: subnetReducer
})

export default connect(mapStateToProps, { setSubnetItem, resetSubnet })(SubnetForm)