import React from 'react';
import { setLocationItem, resetLocation, addItem, updateItem } from '../../../actions'
import { connect } from 'react-redux'

class LocationForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var locationTmp = {
      "location": this.props.location.location,
      "description": this.props.location.description
    }
    if (this.props.location.location_key === "") {
      addItem("locations", locationTmp)
    } else {
      updateItem("locations", this.props.location.location_key, locationTmp)
    }
    this.props.resetLocation()
    this.props.history.push("/location");
  }

  handleChange = e => {
    const { name, value } = e.target
    this.props.setLocationItem(name, value)
  }

  cancelOperation = () => {
    this.props.history.push("/location");
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="register-box">
          <h2>{this.props.location.location_key === "" ? "Register location" : "Edit location"}</h2>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" value={this.props.location.location} placeholder="Location" onChange={e => this.handleChange(e)} />
          <label htmlFor="description">Description</label>
          <textarea name="description" value={this.props.location.description} placeholder="Description" onChange={e => this.handleChange(e)} />
          <div className="button-actions">
            <button>{this.props.location.location_key === "" ? "Register" : "Update"}</button>
            <button className="cancel-button" onClick={() => this.cancelOperation()}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ locationReducer }) => ({
  location: locationReducer
})

export default connect(mapStateToProps, { setLocationItem, resetLocation })(LocationForm)