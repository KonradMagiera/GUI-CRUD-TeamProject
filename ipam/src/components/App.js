import React from 'react';
import { Login, Home, RegisterSubnet, PrivateRoute, Header, Subnet } from "./index"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <PrivateRoute path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/subnet" component={Subnet} />
        <PrivateRoute path="/register_subnet" component={RegisterSubnet} />
      </Switch>
    </Router>
  )
}


export default App;
