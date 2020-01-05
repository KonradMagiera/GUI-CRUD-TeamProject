import React from 'react';
import Firebase from '../../../firebaseConfig';

class RegisterSubnet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routable: false,
      public_or_dmz: "Public",
      ip_assignment: "Static"
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    Firebase.database().ref('/subnets').push({
      "ip_address": e.target.ip_address.value,
      "netmask": e.target.netmask.value,
      "vlan": e.target.vlan.value,
      "nameservers": e.target.nameservers.value,
      "location": e.target.location.value,
      "is_routable": this.state.routable,
      "public_or_dmz": this.state.public_or_dmz,
      "ip_assignment": this.state.ip_assignment,
      "description": e.target.description.value
    })
    this.props.history.push("/subnet"); // redirect after success
  }

  handleChange = e => {
    const { name, value, type, checked } = e.target
    type === "checkbox"
      ? this.setState({
        [name]: checked
      })
      : this.setState({
        [name]: value
      })

  }

  render() {
    return (
      <form onSubmit={(e) => { this.handleSubmit(e) }}>
        <div>
          <h2>Register subnet</h2>
        </div>
        <div>
          <label htmlFor="ip_address">IP address</label>
        </div>
        <div>
          <input type="text" name="ip_address" placeholder="ip_address" />
        </div>
        <div>
          <label htmlFor="netmask">Netmask</label>
        </div>
        <div>
          <input type="text" name="netmask" placeholder="netmask" />
        </div>
        <div>
          <label htmlFor="vlan">VLAN</label>
        </div>
        <div>
          <input type="text" name="vlan" placeholder="vlan" />
        </div>
        <div>
          <label htmlFor="nameservers">Nameservers</label>
        </div>
        <div>
          <input type="text" name="nameservers" placeholder="nameservers" />
        </div>
        <div>
          <label htmlFor="location">Location</label>
        </div>
        <div>
          <input type="text" name="location" placeholder="location" />
        </div>
        <div>
          <label><input type="checkbox" value="routable" name="routable" checked={this.state.routable} onChange={e => this.handleChange(e)} />Is routable?</label>
        </div>
        <div>
          <label htmlFor="public_or_dmz">Public / DMZ</label>
        </div>
        <div>
          <input type="radio" value="Public" name="public_or_dmz" checked={this.state.public_or_dmz === "Public"} onChange={e => this.handleChange(e)} />Public
          <input type="radio" value="DMZ" name="public_or_dmz" checked={this.state.public_or_dmz === "DMZ"} onChange={e => this.handleChange(e)} />DMZ
        </div>
        <div>
          <label htmlFor="ip_assignment">IP assignment:</label>
        </div>
        <div>
          <input type="radio" value="Static" name="ip_assignment" checked={this.state.ip_assignment === "Static"} onChange={e => this.handleChange(e)} />Static
          <input type="radio" value="Dynamic" name="ip_assignment" checked={this.state.ip_assignment === "Dynamic"} onChange={e => this.handleChange(e)} />Dynamic
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea name="description" placeholder="description" />
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>
    )
  }
}

export default RegisterSubnet