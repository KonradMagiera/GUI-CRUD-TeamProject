import React from 'react'

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }

  setPage = (num) => {
    this.setState({
      currentPage: num
    })
  }

  render() {
    const tableRows = [...this.props.tabledef, "Actions"]
    const tabledef = tableRows.map(id => {
      return (
        <th key={id}>{id}</th>
      )
    })
    console.log(this.props.len)
    const difference = this.props.len % 10 === 0 ? 0 : (10 - this.props.len % 10)
    const pageCount = (this.props.len + difference ) / 10
    console.log(pageCount)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              {tabledef}
            </tr>
            {this.props.items}
          </tbody>
        </table>
        {this.state.currentPage === 1 ? null : <button onClick={() => this.setPage(this.state.currentPage - 1)}>Prev</button>}   
        <label>Current page: {this.state.currentPage}</label>
        {this.state.currentPage === pageCount ? null : <button onClick={() => this.setPage(this.state.currentPage + 1)}>Next</button>}
        
      </div>
    )
  }
}


export default Table