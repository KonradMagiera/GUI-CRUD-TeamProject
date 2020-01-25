import React from 'react'
import { Link } from 'react-router-dom'
import { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'

class Location extends React.Component {

  componentDidMount() {
    fetchItems("locations", this.props.addLocationInfo)
  }

  render() {
    this.props.resetLocation()

    var locationItems = null
    if (this.props.allLocations !== null) {
      locationItems = Object.keys(this.props.allLocations).map(key => {
        return (
          <tr key={key}>
            <th>{this.props.allLocations[key].location}</th>
            <th>{this.props.allLocations[key].description}</th>
            <th><Link to="/edit_location" onClick={() => {
              this.props.setLocation({
                location_key: key,
                location: this.props.allLocations[key].location,
                description: this.props.allLocations[key].description
              })

            }}>Edit</Link>
              <button onClick={() => { deleteItem(this.props.allLocations[key].location, "locations", key, this.props.deleteLocationInfo); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }

    return (
      <div>
        <label>Subnet</label>
        <Link to="/register_location">Register Location</Link>
        <Table tabledef={["Location", "Description"]} items={locationItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allLocationsReducer }) => ({
  allLocations: allLocationsReducer
})


export default connect(mapStateToProps, { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo })(Location)