import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home';
import Profile from './profile/Profile';
import AssignmentsHub from './assignments/AssignmentsHub'
import CreateAssignment from './assignments/CreateAssignment'
import ViewAssignments from './assignments/ViewAssignments';
import EditAssignment from './assignments/EditAssignment'

import Dashboard from './dashboard/dashboard'

// Add new routing path to new pages in here
let routes = [
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/assignments",
    component: AssignmentsHub,
  },
  {
    path: "/createassignment",
    component: CreateAssignment,
  },
  {
    path: "/viewassignments",
    component: ViewAssignments
  },
  {
      path : "/editassignment/:assignmentid",
      component: EditAssignment
  },
  {
    path: "/dashboard",
    component: Dashboard
  }
]

const routing = (
  <Router>
    <Switch>
      {
        routes.map((route, ind) => {
          return <Route key={ind} exact path={route.path} component={route.component} />
        })
      }
      <Route exact component={Home} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
