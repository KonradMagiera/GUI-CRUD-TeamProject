import React from 'react';
import { setNatItem, resetNat, addNatDevice, addItem, fetchItems, updateItem, deleteNatDevice } from '../../../actions'
import { addHostInfo, resetHost } from '../../../actions'
import { connect } from 'react-redux'
import { validateIPaddress } from '../../../utils/validation'

class NatForm extends React.Component {
  componentDidMount() {
    fetchItems("hosts", this.props.addHostInfo)
    this.setValue()
  }

  handleSubmit(e) {
    e.preventDefault();

    if(validateIPaddress(this.props.nat.ip_external)) {
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
      this.props.history.push("/nat");
    } else {
      var wrongField = document.getElementById("ip_external")
      wrongField.style.borderColor = "red"
    }
  }


  cancelOperation = () => {
    this.props.history.push("/nat");
  }

  handleChange = e => {
    if (e.target.name === "ip_external") {
      if (validateIPaddress(e.target.value)) {
        e.target.style.borderColor = "black"
      } else {
        e.target.style.borderColor = "red"
      }
    }

    if (e.target.name === "devices") {
      if (e.target.value !== "") {
        var host_key = e.target.value
        var host_name = this.props.allHosts[host_key].hostname
        this.props.addNatDevice(host_key, host_name)
      } else {
        this.props.deleteNatDevice()
      }
    } else {
      const { name, value } = e.target
      this.props.setNatItem(name, value)
    }
  }

  setValue = () => {
    if(this.props.nat.device){
      const key = Object.keys(this.props.nat.device)
      var x = document.getElementsByName("devices")
      x = x[0]
      x.value = key[0]
    }
  }

  render() {
    this.props.resetHost()
    var hostItems = null
    if (this.props.allHosts !== null) {
      hostItems = Object.keys(this.props.allHosts).map(key => {
        return (
          <option value={key} key={key}>
            {this.props.allHosts[key].hostname}
          </option>
        )
      })
    }


    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="right">
        <div className="register-box">
            <h2>{this.props.nat.nat_key === "" ? "Register NAT" : "Edit NAT"}</h2>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.props.nat.name} placeholder="Name" onChange={e => this.handleChange(e)} />
            <label htmlFor="device">Device</label>
            <select name="devices" onChange={e => this.handleChange(e)}>
              <option value="">--Device--</option>
              {hostItems}
          </select>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={this.props.nat.description} placeholder="Description" onChange={e => this.handleChange(e)} />
            <label htmlFor="ip_external">External IP</label>
            <input type="text" name="ip_external" id="ip_external" value={this.props.nat.ip_external} placeholder="127.0.0.1" onChange={e => this.handleChange(e)} />
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

const mapStateToProps = ({ natReducer, allHostsReducer }) => ({
  nat: natReducer,
  allHosts: allHostsReducer
})

export default connect(mapStateToProps, { setNatItem, resetNat, resetHost, addHostInfo, addNatDevice, deleteNatDevice })(NatForm)