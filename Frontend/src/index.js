import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home'
import Profile from './profile/Profile'
import AssignmentsHub from './assignments/AssignmentsHub'
import CreateAssignment from './assignments/create/CreateAssignment'
import CreateQuestion from './assignments/CreateQuestion'
import ViewAssignments from './assignments/ViewAssignments'
import ViewAssignment from './assignments/ViewAssignment'
import EditAssignment from './assignments/EditAssignment'
import EditQuestion from './assignments/EditQuestion'
import SubmitAssignment from './assignments/SubmitAssignment'
import GradeSubmission from './assignments/GradeSubmission'
import ViewSubmissions from './assignments/ViewSubmissions'
import ViewSubmission from './assignments/ViewSubmission'
import DeleteAssignment from './assignments/DeleteAssignment'
import DeleteQuestion from './assignments/DeleteQuestion'

import Dashboard from './dashboard/dashboard'
import CourseBoard from './coursedashboard/dashboard'
import People from './people/People'


// Add new routing path to new pages in here
let routes = [
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/assignments",
    component: AssignmentsHub
  },
  {
    path: "/createassignment/:courseid",
    component: CreateAssignment
  },
  {
    path: "/createquestion/:assignmentid",
    component: CreateQuestion
  },
  {
    path: "/viewassignments/:courseid",
    component: ViewAssignments
  },
  {
    path: "/viewassignment/:assignmentid",
    component: ViewAssignment
  },
  {
    path: "/editassignment/:assignmentid",
    component: EditAssignment
  },
  {
    path: "/editquestion/:assignmentid/:questionid",
    component: EditQuestion
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
    path: "/viewsubmissions/:assignmentid",
    component: ViewSubmissions
  },
  {
    path: "/viewsubmission/:assignmentid/:submissionid",
    component: ViewSubmission
  },
  {
    path: "/deleteassignment/:assignmentid",
    component: DeleteAssignment
  },
  {
    path:"/deletequestion/:assignmentid/:questionid",
    component: DeleteQuestion
  },
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/coursedashboard/:id",
    component: CourseBoard
  },
  {
    path: "/people/people",
    component: People
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
