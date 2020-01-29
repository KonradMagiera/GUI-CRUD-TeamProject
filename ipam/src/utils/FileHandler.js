import { importDB } from '../actions/index'


export const download = (filename, data) => {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const selectFile = () => {
  var file = document.getElementById("file-input").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        importDB(JSON.parse(evt.target.result))
        alert("Database imported!")
    }
    reader.onerror = function (evt) {
        alert("Error reading file")
    }
  }
}


/*class FileHandler extends React.Component {
  componentDidMount() {
    document.body.style.cursor = 'default'
    fetchAll()
  }

  render() {
    return (
      <div className="right middle"> 
        <button className="menuItem" style={{ width: "25%" }} onClick={() => {document.getElementById('file-input').click()}}>Import</button>
        <input id="file-input" type="file" name="name" style={{display: "none"}} onChange={() => {this.selectFile()}} ></input>
        <button className="menuItem" style={{ width: "25%" }} onClick={() => { exportDB(this.download) }}>Export</button>
      </div>
    )
  }
}


export default FileHandler*/