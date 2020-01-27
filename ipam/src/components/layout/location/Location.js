import React from 'react'
import { Link } from 'react-router-dom'
import { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'
import edit from '../../../static/edit.png'
import remove from '../../../static/delete.png'

class Location extends React.Component {

  componentDidMount() {
    document.body.style.cursor='wait'
    fetchItems("locations", this.props.addLocationInfo)
  }

  render() {
    this.props.resetLocation()

    var locationItems = null
    if (this.props.allLocations !== null) {
      locationItems = Object.keys(this.props.allLocations).map(key => {
        return (
          <tr key={key}>
            <th><div>{this.props.allLocations[key].location}</div></th>
            <th><div>{this.props.allLocations[key].description}</div></th>
            <th><Link to="/edit_location" onClick={() => {
              this.props.setLocation({
                location_key: key,
                location: this.props.allLocations[key].location,
                description: this.props.allLocations[key].description
              })

            }}><img src={edit} alt="Edit" className="img-table" /></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allLocations[key].location, "locations", key, this.props.deleteLocationInfo); this.forceUpdate() }} />
            </th>
          </tr>
        )
      })
    }
    return (
      <div className="right">
        <Link to="/register_location"><button className="register">Register Location</button></Link>
        <Table tabledef={["Location", "Description"]} items={locationItems} len={locationItems ? locationItems.length : 1 }/>
      </div>
    )
  }
}

const mapStateToProps = ({ allLocationsReducer }) => ({
  allLocations: allLocationsReducer
})


export default connect(mapStateToProps, { setLocation, setLocationItem, resetLocation, deleteLocationInfo, addLocationInfo })(Location)