import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home/Home'
import Profile from './profile/Profile'
import CreateAssignment from './assignments/createassignment/createdashboard'
import CreateQuestion from './assignments/createquestion/createdashboard'
import ViewAssignments from './assignments/viewassignments/ViewAssignments'
import ViewAssignment from './assignments/viewassignment/ViewAssignment'
import ViewQuizzes from './assignments/viewassignments/ViewQuizzes'
import EditAssignment from './assignments/editassignment/createdashboard'
import EditQuestion from './assignments/editquestion/createdashboard'
import SubmitAssignment from './assignments/submitassignment/createdashboard'
import GradeSubmission from './assignments/gradesubmission/createdashboard'
import ViewSubmissions from './assignments/viewsubmissions/ViewSubmissions'
import ViewSubmission from './assignments/viewsubmission/ViewSubmission'
import DeleteAssignment from './assignments/deleteassignment/DeleteAssignment'
import DeleteQuestion from './assignments/deletequestion/DeleteQuestion'

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
    path: "/viewquizzes/:courseid",
    component: ViewQuizzes
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
