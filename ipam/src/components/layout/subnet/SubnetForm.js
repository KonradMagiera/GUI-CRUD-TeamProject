import React from 'react';
import { setSubnetItem, resetSubnet, addSubnetVlan, deleteSubnetVlan, addItem, updateItem, fetchItems } from '../../../actions'
import { addVlanInfo, resetVlan } from '../../../actions'
import { connect } from 'react-redux'
import { validateIPaddress, validateNetmask } from '../../../utils/validation'

class SubnetForm extends React.Component {
  componentDidMount() {
    fetchItems("vlans", this.props.addVlanInfo)
    this.setValue()
  }

  handleSubmit(e) {
    e.preventDefault();

    if(validateIPaddress(this.props.subnet.ip_address) && validateNetmask(this.props.subnet.netmask)) {

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
    } else {
      if(!validateIPaddress(this.props.subnet.ip_address)) {
        var wrongField = document.getElementById("ip_address")
        wrongField.style.borderColor = "red"
      }

      if(!validateNetmask(this.props.subnet.netmask)) {
        var wrongField = document.getElementById("netmask")
        wrongField.style.borderColor = "red"
      }
    }
  }

  handleChange = e => {
    if (e.target.name === "vlans") {
      if (e.target.value !== "") {
        var vlan_key = e.target.value
        var id_vlan = this.props.allVlans[vlan_key].id_vlan
        this.props.addSubnetVlan(vlan_key, id_vlan)
      } else {
        this.props.deleteSubnetVlan()
      }
    }

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

  setValue = () => {
    if(this.props.subnet.vlan){
      const key = Object.keys(this.props.subnet.vlan)
      var x = document.getElementsByName("vlans")
      x = x[0]
      x.value = key[0]
    }
  }

  render() {
    this.props.resetVlan()
    var vlanItems = null
    if (this.props.allVlans !== null) {
      vlanItems = Object.keys(this.props.allVlans).map(key => {
        return (
          <option value={key} key={key}>
            {this.props.allVlans[key].id_vlan}
          </option>
        )
      })
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="right">
        <div className="register-box">
          <h2>{this.props.subnet.subnet_key === "" ? "Register subnet" : "Edit subnet"}</h2>
          <label htmlFor="ip_address">IP address</label>
          <input type="text" id="ip_address" name="ip_address" value={this.props.subnet.ip_address} placeholder="127.0.0.1" onChange={e => this.handleChange(e)} />
          <label htmlFor="netmask">Netmask</label>
          <input type="text" name="netmask" id="netmask" value={this.props.subnet.netmask} placeholder="255.255.0.0" onChange={e => this.handleChange(e)} />
          <label htmlFor="vlan">VLAN</label>
          <select name="vlans" onChange={e => this.handleChange(e)}>
            <option value="">--VLAN--</option>
            {vlanItems}
          </select>
          <label htmlFor="nameservers">Nameservers</label>
          <input type="text" name="nameservers" value={this.props.subnet.nameservers} placeholder="Nameservers" onChange={e => this.handleChange(e)} />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" value={this.props.subnet.location} placeholder="Location" onChange={e => this.handleChange(e)} />
          <label><input type="checkbox" value="routable" name="routable" checked={this.props.subnet.routable} onChange={e => this.handleChange(e)} />Is routable?</label>
          <label htmlFor="public_or_dmz">Public / DMZ</label>
          <div className="radio-box">
            <input type="radio" value="Public" name="public_or_dmz" id="radio_public" checked={this.props.subnet.public_or_dmz === "Public"} onChange={e => this.handleChange(e)} />
            <label htmlFor="radio_public">Public</label>
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


const mapStateToProps = ({ subnetReducer, allVlansReducer }) => ({
  subnet: subnetReducer,
  allVlans: allVlansReducer
})

export default connect(mapStateToProps, { setSubnetItem, resetSubnet, addVlanInfo, resetVlan, addSubnetVlan, deleteSubnetVlan })(SubnetForm)