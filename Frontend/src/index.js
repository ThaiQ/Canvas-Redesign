import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home';
import Profile from './profile/Profile';
import AssignmentsHub from './assignments/AssignmentsHub'
import CreateAssignment from './assignments/create/CreateAssignment'
import ViewAssignments from './assignments/ViewAssignments';
import EditAssignment from './assignments/EditAssignment'
import SubmitAssignment from './assignments/SubmitAssignment'
import GradeSubmission from './assignments/GradeSubmission'
import ViewSubmissions from './assignments/ViewSubmissions'

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
    path: "/createassignment/:courseid",
    component: CreateAssignment,
  },
  {
    path: "/viewassignments/:courseid",
    component: ViewAssignments
  },
  {
    path: "/editassignment/:assignmentid",
    component: EditAssignment
  },
  {
    path: "/submitassignment/:assignmentid",
    component: SubmitAssignment
  },
  {
    path: "/gradesubmission/:assignmentid/:submissionid",
    component: GradeSubmission
  },
  {
    path: "/viewsubmissions/:assignmentid/:studentid",
    component: ViewSubmissions
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
