import React from 'react';
import Firebase from '../../../firebaseConfig';
import { setNatItem, resetNat } from '../../../actions'
import { connect } from 'react-redux'

class NatForm extends React.Component {

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
      Firebase.database().ref('/nats').push(natTmp) 
    } else {
      Firebase.database().ref('/nats').child(this.props.nat.nat_key)
      .update(natTmp).then(() => {
        return {}}).catch(error => {
          return {
            errorCode: error.code,
            errorMessage: error.message
          }})
    }
    this.props.resetNat()
    this.props.history.push("/nat"); // redirect after success
  }

  handleChange = e => {
    const { name, value} = e.target
    this.props.setNatItem(name, value)
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <h2>{this.props.nat.nat_key === "" ? "Register NAT" : "Edit NAT"}</h2>
        </div>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="text" name="name" value={this.props.nat.name} placeholder="name" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="device">Device</label>
        </div>
        <div>
          <input type="text" name="device" value={this.props.nat.device} placeholder="device" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <input type="text" name="description" value={this.props.nat.description} placeholder="description" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="ip_external">External IP</label>
        </div>
        <div>
          <input type="text" name="ip_external" value={this.props.nat.ip_external} placeholder="ip_external" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="internal_subnet">Internal subnet</label>
        </div>
        <div>
          <input type="text" name="internal_subnet" value={this.props.nat.internal_subnet} placeholder="internal_subnet" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <button>{this.props.nat.nat_key === "" ? "Register" : "Update"}</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ natReducer }) => ({
  nat: natReducer
})

export default connect(mapStateToProps, { setNatItem, resetNat })(NatForm)