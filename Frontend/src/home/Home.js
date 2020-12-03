import React, {useEffect,useState} from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'

function App() {

  //Making sure that user is login
  const [user, setUser] = useState('');

  useEffect(() => {
    let tempUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    setUser(tempUser)
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {user? <Logout reload={true}/> : <Login reload={true}/>}
        {user? <Link to='/profile'>Profile</Link>:''}
        {user? <Link to='/assignments'>Assignments</Link>:''}
      </header>
    </div>
  );
}

export default App;
