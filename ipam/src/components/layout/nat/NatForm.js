import React from 'react';
import { setNatItem, resetNat, addNatDevice, addItem, fetchItems, updateItem } from '../../../actions'
import { addHostInfo, resetHost } from '../../../actions'
import { connect } from 'react-redux'

class NatForm extends React.Component {
  componentDidMount() {
    fetchItems("hosts", this.props.addHostInfo)
  }

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

  handleChange = e => {
    if (e.target.name === "devices") {
      if (e.target.value !== "") {
        var host_key = e.target.value
        var host_name = this.props.allHosts[host_key].hostname
        this.props.addNatDevice(host_key, host_name)
      }
    } else {
      const { name, value } = e.target
      this.props.setNatItem(name, value)
    }
  }

  //<input type="text" name="device" value={this.props.nat.device} placeholder="Device" onChange={e => this.handleChange(e)} />

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

const mapStateToProps = ({ natReducer, allHostsReducer }) => ({
  nat: natReducer,
  allHosts: allHostsReducer
})

export default connect(mapStateToProps, { setNatItem, resetNat, resetHost, addHostInfo, addNatDevice })(NatForm)