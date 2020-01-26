import React from 'react';
import { setVlanItem, resetVlan, addVlanSubnet, fetchItems, addItem, updateItem } from '../../../actions'
import { addSubnetInfo, resetSubnet } from '../../../actions'
import { connect } from 'react-redux'

class VlanForm extends React.Component {
  componentDidMount() {
    fetchItems("subnets", this.props.addSubnetInfo)
  }

  handleSubmit(e) {
    e.preventDefault();
    var vlanTmp = {
      "id_vlan": this.props.vlan.id_vlan,
      "description": this.props.vlan.description,
      "subnets": this.props.vlan.subnets,
    }
    if (this.props.vlan.vlan_key === "") {
      addItem("vlans", vlanTmp)
    } else {
      updateItem("vlans", this.props.vlan.vlan_key, vlanTmp)
    }
    this.props.resetVlan()
    this.props.history.push("/vlan"); // redirect after success
  }

  handleChange = e => {
    if (e.target.name === "subnets") {
      if (e.target.value !== "") {
        var subnet_key = e.target.value
        var subnet_ip_address = this.props.allSubnets[subnet_key].ip_address
        this.props.addVlanSubnet(subnet_key, subnet_ip_address)
        document.getElementById("chosen_subnets").textContent += subnet_ip_address + '\n' //chwilowo zrobione tak żeby zobaczyć jakie subnety sa dodawane
      }
    } else {
      const { name, value } = e.target
      this.props.setVlanItem(name, value)
    }
  }

  cancelOperation = () => {
    this.props.history.push("/vlan");
  }

  render() {  // Subnets musza być chyba wybierane z tych zarejestrowanych    
    this.props.resetSubnet()
    var subnetItems = null
    if (this.props.allSubnets !== null) {
      subnetItems = Object.keys(this.props.allSubnets).map(key => {
        return (
          <option value={key} key={key}>
            {this.props.allSubnets[key].ip_address}
          </option>
        )
      })
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="register-box">
          <h2>{this.props.vlan.vlan_key === "" ? "Register VLAN" : "Edit VLAN"}</h2>
          <label htmlFor="id_vlan">ID VLAN</label>
          <input type="text" name="id_vlan" value={this.props.vlan.id_vlan} placeholder="ID VLAN" onChange={e => this.handleChange(e)} />
          <label htmlFor="description">Description</label>
          <textarea name="description" value={this.props.vlan.description} placeholder="Description" onChange={e => this.handleChange(e)} />
          <label htmlFor="subnets">Subnets</label>
          <select name="subnets" value="" onChange={e => this.handleChange(e)}>
            <option value="">--Subnet--</option>
            {subnetItems}
          </select>
          <textarea id="chosen_subnets" />
          <div className="button-actions">
            <button>{this.props.vlan.vlan_key === "" ? "Register" : "Update"}</button>
            <button className="cancel-button" onClick={() => this.cancelOperation()}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ vlanReducer, allSubnetsReducer }) => ({
  vlan: vlanReducer,
  allSubnets: allSubnetsReducer
})

export default connect(mapStateToProps, { setVlanItem, resetVlan, addSubnetInfo, resetSubnet, addVlanSubnet })(VlanForm)
