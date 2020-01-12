import React from 'react';
import Firebase from '../../../firebaseConfig';
import { setVlanItem, resetVlan, addVlanSubnet } from '../../../actions'
import { addSubnetInfo, resetSubnet } from '../../../actions'
import { connect } from 'react-redux'

class VlanForm extends React.Component {
  componentDidMount() {
    this.fetchSubnets()
  }

  fetchSubnets = () => {
    Firebase.database().ref("/subnets").once("value", data => {
      var subnets = data.val()
      if (subnets !== null) {
        Object.keys(subnets).map(key => {
          return this.props.addSubnetInfo(key, subnets[key])
        })
      } else {
        return subnets
      }

    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var vlanTmp = {
      "id_vlan": this.props.vlan.id_vlan,
      "description": this.props.vlan.description,
      "subnets": this.props.vlan.subnets,
    }
    if (this.props.vlan.vlan_key === "") {
      Firebase.database().ref('/vlans').push(vlanTmp)
    } else {
      Firebase.database().ref('/vlans').child(this.props.vlan.vlan_key)
        .update(vlanTmp).then(() => {
          return {}
        }).catch(error => {
          return {
            errorCode: error.code,
            errorMessage: error.message
          }
        })
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
        <div>
          <h2>{this.props.vlan.vlan_key === "" ? "Register VLAN" : "Edit VLAN"}</h2>
        </div>
        <div>
          <label htmlFor="id_vlan">ID VLAN</label>
        </div>
        <div>
          <input type="text" name="id_vlan" value={this.props.vlan.id_vlan} placeholder="id_vlan" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea name="description" value={this.props.vlan.description} placeholder="description" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="subnets">Subnets</label>
        </div>
        <div>
          <select name="subnets" value="" onChange={e => this.handleChange(e)}>
            <option value="">--Subnet--</option>
            {subnetItems}
          </select>
          <textarea id="chosen_subnets" />
        </div>
        <div>
          <button>{this.props.vlan.vlan_key === "" ? "Register" : "Update"}</button>
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
