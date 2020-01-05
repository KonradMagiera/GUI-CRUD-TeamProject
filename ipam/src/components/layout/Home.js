import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/authentication'

function Home(props) {
  return (
    <div>
      <label>Home Page</label>
      <div>
        <Link to="/register_subnet">Register subnet</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: isAuth => dispatch(login(isAuth))
})

export default connect(null, mapDispatchToProps)(Home)