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
    const len = this.props.items ? this.props.items.length : 1
    const difference = len % 8 === 0 ? 0 : (8 - len % 8)
    const pageCount = (len + difference) / 8
    var limitedItems = this.props.items ? this.props.items.slice((this.state.currentPage - 1) * 8, (this.state.currentPage - 1) * 8 + 8) : []

    const tableItem = tableRows.map(key => {
      return <th key={key}><div /></th>
    })
    while (limitedItems.length !== 8) {
      limitedItems = [...limitedItems,
      <tr key={limitedItems.length}>
        {tableItem}
      </tr>]
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              {tabledef}
            </tr>
            {limitedItems}
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