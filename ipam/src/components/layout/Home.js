import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../actions/authentication'

function Home(props) {
  return (
    <div>
      <Link to="/register_subnet">Register Subnet</Link>
      <label>Home Page / mozna przygotowac jakis komponent prezentujacy nasz porjekcik</label>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

export default connect(null, mapDispatchToProps)(Home)