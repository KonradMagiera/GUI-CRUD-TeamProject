import React from 'react';
import  { Login, Home, PrivateRoute }  from "./index"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App()  {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/home" component={Home}/>
      </Switch>
    </Router>
  )
}


export default App;
