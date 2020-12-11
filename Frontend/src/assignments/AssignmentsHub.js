import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { checkLogin }  from '../util/auth'
import './AssignmentsHub.css';

function AssignmentsHub() {

    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])
  
    return (
      <div className="App">
        <header className="assignhub">
          {user? <Link to='/createassignment'>Create Assignment</Link>:''}
          {user? <Link to='/viewassignments'>View Assignments</Link>:''}
        </header>
      </div>
    );
  }

export default AssignmentsHub;