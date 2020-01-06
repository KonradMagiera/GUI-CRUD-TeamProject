import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'

function Home(props) {
  return (
    <div>
      <label>Home Page / mozna przygotowac jakis komponent prezentujacy nasz porjekcik</label>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

export default connect(null, mapDispatchToProps)(Home)