import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import history from './history';
import Home from './home/Home';
import Profile from './profile/Profile';
import StarCourse from './course/StartCourse';
import CourseHome from './course/CourseHome';
import People from './course/People';
import { UserProvider } from './course/UserContext';

// Add new routing path to new pages in here
let routes = [
  {
    path : "/profile",
    component: Profile
  },
  {
    path : "/course",
    component: StarCourse
  },
  {
    path : "/course/CourseHome",
    component: CourseHome
  },
  {
    path : "/course/People",
    component: People
  }
]

const routing = (
   <UserProvider>
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
     </UserProvider>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
