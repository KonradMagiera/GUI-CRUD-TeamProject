import React from 'react';
import Firebase from '../../../firebaseConfig';
import { setVlanItem, resetVlan } from '../../../actions'
import { connect } from 'react-redux'

class VlanForm extends React.Component {

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
        return {}}).catch(error => {
          return {
            errorCode: error.code,
            errorMessage: error.message
          }})
    }
    this.props.resetVlan()
    this.props.history.push("/vlan"); // redirect after success
  }

  handleChange = e => {
    const { name, value } = e.target
    this.props.setVlanItem(name, value)
  }

    render() {  // Subnets musza być chyba wybierane z tych zarejestrowanych
        return(
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
              <input type="text" name="subnets" value={this.props.vlan.subnets} placeholder="subnets" onChange={e => this.handleChange(e)} />
            </div>
            <div>
              <button>{this.props.vlan.vlan_key === "" ? "Register" : "Update"}</button>
            </div>
          </form>
        )
    }
}

const mapStateToProps = ({ vlanReducer }) => ({
  vlan: vlanReducer
})

export default connect(mapStateToProps, { setVlanItem, resetVlan })(VlanForm)
