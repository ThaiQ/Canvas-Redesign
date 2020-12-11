import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home';
import Profile from './profile/Profile';
import AssignmentsHub from './assignments/AssignmentsHub'
import CreateAssignment from './assignments/create/createdashboard'
import ViewAssignments from './assignments/ViewAssignments';
import EditAssignment from './assignments/EditAssignment'

import Dashboard from './dashboard/dashboard'
import CourseBoard from './coursedashboard/dashboard'

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
    path: "/viewassignments/:courseid",
    component: ViewAssignments
  },
  {
      path : "/editassignment/:assignmentid",
      component: EditAssignment
  },
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/coursedashboard/:id",
    component: CourseBoard
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
