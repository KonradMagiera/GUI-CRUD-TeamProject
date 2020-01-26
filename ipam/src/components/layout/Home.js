import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'

function Home() {
  document.body.style.cursor='default'
  return (
    <div className="right middle">
      <h2>Witaj w serwisie IP Managment Studio!</h2>
      <p>System zarządzania przestrzenią adresową został opracowany przez amatorski zespół dla wyśmienitego prowadzącego PGUI :)</p>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

export default connect(null, mapDispatchToProps)(Home)