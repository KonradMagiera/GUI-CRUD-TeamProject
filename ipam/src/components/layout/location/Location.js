import React from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../../firebaseConfig';
import { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo } from '../../../actions'
import { connect } from 'react-redux'
class Location extends React.Component {

  componentDidMount() {
    this.fetchLocations()
  }

  fetchLocations = () => {
    Firebase.database().ref("/locations").once("value", data => {
      var locations = data.val()
      if (locations !== null) {
        Object.keys(locations).map(key => {
          return this.props.addLocationInfo(key, locations[key])
        })
      } else {
        return locations
      }

    })
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
              <button onClick={() => { Firebase.database().ref(`/locations/${key}`).remove(); this.props.deleteLocationInfo(key); this.forceUpdate() }}>Delete</button></th>
          </tr>
        )
      })
    }



    return (
      <div>
        <label>Subnet</label>
        <Link to="/register_location">Register Location</Link>
        <table>
          <tbody>
            <tr>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            { locationItems }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ allLocationsReducer }) => ({
  allLocations: allLocationsReducer
})

export default connect(mapStateToProps, { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo })(Location)