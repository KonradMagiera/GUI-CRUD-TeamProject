import React from 'react';
import { Login, Home, SubnetForm, PrivateRoute, Header, Subnet, Vlan, VlanForm } from "./index"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <PrivateRoute path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/subnet" component={Subnet} />
        <PrivateRoute path="/vlan" component={Vlan} />
        <PrivateRoute path="/register_subnet" component={SubnetForm} />
        <PrivateRoute path="/register_vlan" component={VlanForm} />
        <PrivateRoute path="/edit_subnet" component={SubnetForm} />
        <PrivateRoute path="/edit_vlan" component={VlanForm} />
      </Switch>
    </Router>
  )
}


export default App;
