import React from 'react'
import { fetchAll } from '../../actions/index'

class FileHandler extends React.Component {
  componentDidMount() {
    document.body.style.cursor = 'default'
    fetchAll()
  }
  render() {
    return (
      <div className="right middle">
        <button className="menuItem" style={{ width: "25%" }}>Import</button>
        <button className="menuItem" style={{ width: "25%" }} onClick={() => { console.log("test") }}>Export</button>
      </div>
    )
  }
}


export default FileHandler