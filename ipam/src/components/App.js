import React from 'react';
import  { Login, Home, RegisterSubnet, PrivateRoute }  from "./index"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App()  {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/register_subnet" component={RegisterSubnet}/>
      </Switch>
    </Router>
  )
}


export default App;
