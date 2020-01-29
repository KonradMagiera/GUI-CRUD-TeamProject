import React from 'react'
import { fetchAll, exportDB } from '../../actions/index'

class FileHandler extends React.Component {
  componentDidMount() {
    document.body.style.cursor = 'default'
    fetchAll()
  }

  download = (filename, data) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  render() {
    return (
      <div className="right middle">
        <button className="menuItem" style={{ width: "25%" }}>Import</button>
        <button className="menuItem" style={{ width: "25%" }} onClick={() => { exportDB(this.download) }}>Export</button>
      </div>
    )
  }
}


export default FileHandler