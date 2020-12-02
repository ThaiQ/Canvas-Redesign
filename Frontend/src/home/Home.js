import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'

const axios = require("axios")

function App() {

  //Making sure that user is login
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');

  useEffect(() => {
    createUser()
  }, [])

  function createUser() {
    console.log(user)
    axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/user", {})
      .then(
        (res) => {
          console.log(res.data)
        }
      )
      .catch(err => console.log(err.message))
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>RE : CANVAS</h1>

        {user ? <Logout reload={true} /> : <Login reload={true} />}
        {user ? <Link to='/profile'>Profile</Link> : ''}
      </header>
    </div>
  );
}

export default App;
