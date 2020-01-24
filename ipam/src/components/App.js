import React from 'react';
import { Login, Home, SubnetForm, PrivateRoute, Header, Subnet, Vlan, VlanForm, Location, LocationForm, Nat, NatForm } from "./index"
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
        <PrivateRoute path="/location" component={Location} />
        <PrivateRoute path="/nat" component={Nat} />
        <PrivateRoute path="/register_subnet" component={SubnetForm} />
        <PrivateRoute path="/register_location" component={LocationForm} />
        <PrivateRoute path="/register_vlan" component={VlanForm} />
        <PrivateRoute path="/register_nat" component={NatForm} />
        <PrivateRoute path="/edit_subnet" component={SubnetForm} />
        <PrivateRoute path="/edit_location" component={LocationForm} />
        <PrivateRoute path="/edit_vlan" component={VlanForm} />
        <PrivateRoute path="/edit_nat" component={NatForm} />
        
      </Switch>
    </Router>
  )
}


export default App;
