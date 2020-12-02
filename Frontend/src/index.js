import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home';
import Profile from './profile/Profile';
import CreateAssignment from './assignments/CreateAssignment'


// Add new routing path to new pages in here
let routes = [
  {
    path : "/profile",
    component: Profile,
    path : "/assignments",
    component: CreateAssignment
  }
]

const routing = (
  <Router>
    <Switch>
      {
        routes.map((route,ind)=>{
          return <Route key={ind} exact path={route.path} component={route.component}/>
        })
      }
      <Route exact component={Home}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
