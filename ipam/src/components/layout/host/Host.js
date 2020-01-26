import React from 'react'
import { Link } from 'react-router-dom'
import { setHost, setHostItem, resetHost, addHostInfo, deleteHostInfo, fetchItems, deleteItem } from '../../../actions'
import { connect } from 'react-redux'
import { Table } from '../../index'
import edit from '../../../static/edit.png'
import remove from '../../../static/delete.png'

class Host extends React.Component {
  componentDidMount() {
    document.body.style.cursor='wait'
    fetchItems("hosts", this.props.addHostInfo)
  }

  render() {
    this.props.resetHost()
    var hostItems = null
    if (this.props.allHosts !== null) {
      hostItems = Object.keys(this.props.allHosts).map(key => {
        return (
          <tr key={key}>
            <th><div>{this.props.allHosts[key].ip}</div></th>
            <th><div>{this.props.allHosts[key].hostname}</div></th>
            <th><div>{this.props.allHosts[key].description}</div></th>
            <th><div>{this.props.allHosts[key].mac_address}</div></th>
            <th><div>{this.props.allHosts[key].gateway ? "Yes" : "No"}</div></th>
            <th><div>{this.props.allHosts[key].owner}</div></th>
            <th><div>{this.props.allHosts[key].device_description}</div></th>
            <th><div>{this.props.allHosts[key].location_description}</div></th>
            <th><Link to="/edit_host" onClick={() => {
              this.props.setHost({
                host_key: key,
                ip: this.props.allHosts[key].ip,
                hostname: this.props.allHosts[key].hostname,
                description: this.props.allHosts[key].description,
                mac_address: this.props.allHosts[key].mac_address,
                gateway: this.props.allHosts[key].gateway,
                owner: this.props.allHosts[key].owner,
                device_description: this.props.allHosts[key].device_description,
                location_description: this.props.allHosts[key].location_description
              })

            }}><img src={edit} alt="Edit" className="img-table" /></Link>
              <img src={remove} alt="Delete" className="img-table" onClick={() => { deleteItem(this.props.allHosts[key].ip, "hosts", key, this.props.deleteHostInfo); this.forceUpdate() }} />
            </th>
          </tr>
        )
      })
    }
    document.body.style.cursor='default'
    return (
      <div className="right">
        <Link to="/register_host"><button className="register">Register host</button></Link>
        <Table tabledef={["IP", "Hostname", "Description", "MAC address", "Gateway", "Owner", "Device description", "Location description"]} items={hostItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ allHostsReducer }) => ({
  allHosts: allHostsReducer
})

export default connect(mapStateToProps, { setHost, setHostItem, resetHost, addHostInfo, deleteHostInfo })(Host)