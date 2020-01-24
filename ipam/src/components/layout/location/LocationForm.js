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

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <h2>{this.props.location.location_key === "" ? "Register location" : "Edit location"}</h2>
        </div>
        <div>
          <label htmlFor="location">Location</label>
        </div>
        <div>
          <input type="text" name="location" value={this.props.location.location} placeholder="location" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea name="description" value={this.props.location.description} placeholder="description" onChange={e => this.handleChange(e)} />
        </div>
        <div>
          <button>{this.props.location.location_key === "" ? "Register" : "Update"}</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ locationReducer }) => ({
  location: locationReducer
})

export default connect(mapStateToProps, { setLocationItem, resetLocation })(LocationForm)