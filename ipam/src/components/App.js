import React from 'react';
import { Login, Home, SubnetForm, PrivateRoute, Header, Subnet, Vlan, VlanForm, Location, LocationForm, Nat, NatForm, SideMenu, Host, HostForm } from "./index"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="header">
        <PrivateRoute path="/" component={Header} />
      </div>
      <PrivateRoute path="/" component={SideMenu} />
      <Switch>
        <Route exact path="/" component={Login} />

        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/subnet" component={Subnet} />
        <PrivateRoute path="/vlan" component={Vlan} />
        <PrivateRoute path="/location" component={Location} />
        <PrivateRoute path="/nat" component={Nat} />
        <PrivateRoute path="/host" component={Host} />
        <PrivateRoute path="/register_subnet" component={SubnetForm} />
        <PrivateRoute path="/register_location" component={LocationForm} />
        <PrivateRoute path="/register_vlan" component={VlanForm} />
        <PrivateRoute path="/register_nat" component={NatForm} />
        <PrivateRoute path="/register_host" component={HostForm} />
        <PrivateRoute path="/edit_subnet" component={SubnetForm} />
        <PrivateRoute path="/edit_location" component={LocationForm} />
        <PrivateRoute path="/edit_vlan" component={VlanForm} />
        <PrivateRoute path="/edit_nat" component={NatForm} />
        <PrivateRoute path="/edit_host" component={HostForm} />
      </Switch>

    </Router>
  )
}


export default App;
