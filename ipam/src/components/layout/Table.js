import React from 'react'

function Table(props) {
  const tabledef = props.tabledef.map(id => {
    return (
      <th key={id}>{id}</th>
    )
  })

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {tabledef}
          </tr>
          {props.items}
        </tbody>
      </table>
    </div>
  )
}


export default Table