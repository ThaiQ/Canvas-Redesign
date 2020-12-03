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

import StarCourse from './course/StartCourse';
import CourseHome from './course/CourseHome';
import People from './course/People';
import CourseExample from './course/example'

// Add new routing path to new pages in here
let routes = [
  {
    path : "/profile",
    component: Profile
    },
    {
    path : "/assignments",
    component: AssignmentsHub,
    },
    {
    path : "/createassignment",
    component: CreateAssignment,
    },
    {
    path : "/viewassignments",
    component: ViewAssignments
  },
  {
    path: "/course",
    component: StarCourse
  },
  {
    path: "/course/CourseHome",
    component: CourseHome
  },
  {
    path: "/course/People",
    component: People
  },
  {
    path: "/course/example",
    component: CourseExample
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
