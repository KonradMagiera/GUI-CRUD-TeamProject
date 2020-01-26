import React from 'react';
import { setHostItem, resetHost, addItem, updateItem } from '../../../actions'
import { connect } from 'react-redux'

class HostForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var hostTmp = {
      "ip": this.props.host.ip,
      "hostname": this.props.host.hostname,
      "description": this.props.host.description,
      "mac_address": this.props.host.mac_address,
      "gateway": this.props.host.gateway,
      "owner": this.props.host.owner,
      "device_description": this.props.host.device_descption,
      "location_description": this.props.host.location_description
    }
    if (this.props.host.host_key === "") {
      addItem("hosts", hostTmp)
    } else {
      updateItem("hosts", this.props.host.host_key, hostTmp)
    }
    this.props.resetHost()
    this.props.history.push("/host");
  }

  handleChange = e => {
    const { name, value, type, checked } = e.target
    type === "checkbox"
      ? this.props.setHostItem(name, checked)
      : this.props.setHostItem(name, value)
  }

  cancelOperation = () => {
    this.props.history.push("/host");
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="right">
        <div className="register-box">
            <h2>{this.props.host.host_key === "" ? "Register host" : "Edit host"}</h2>
            <label htmlFor="ip">IP</label>
            <input type="text" name="ip" value={this.props.host.ip} placeholder="1.1.1.1" onChange={e => this.handleChange(e)} />
            <label htmlFor="hostname">Hostname</label>
            <input type="text" name="hostname" value={this.props.host.hostname} placeholder="Hostname" onChange={e => this.handleChange(e)} />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={this.props.host.description} placeholder="Description" onChange={e => this.handleChange(e)} />
            <label htmlFor="mac_address">MAC address</label>
            <input type="text" name="mac_address" value={this.props.host.mac_address} placeholder="MAC address" onChange={e => this.handleChange(e)} />
            <label><input type="checkbox" value="gateway" name="gateway" checked={this.props.host.gateway} onChange={e => this.handleChange(e)} />Gateway?</label>
            <label htmlFor="owner">Owner</label>
            <input type="text" name="owner" value={this.props.host.owner} placeholder="Owner" onChange={e => this.handleChange(e)} />
            <h3>Device</h3>
            <label htmlFor="device_description">Device description</label>
            <textarea name="device_description" value={this.props.host.device_description} placeholder="Device description" onChange={e => this.handleChange(e)} />
            <label htmlFor="location_description">Location description</label>
            <textarea name="location_description" value={this.props.host.location_description} placeholder="Location description" onChange={e => this.handleChange(e)} />
            <div className="button-actions">
              <button>{this.props.host.host_key === "" ? "Register" : "Update"}</button>
              <button className="cancel-button" onClick={() => this.cancelOperation()}>Cancel</button>
            </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ hostReducer }) => ({
  host: hostReducer
})

export default connect(mapStateToProps, { setHostItem, resetHost })(HostForm)