import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import Navbar from '../components/left-navbar/drawer'

export default function Profile(props) {

    //Making sure that user is login
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(()=>{
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])

<<<<<<< HEAD
=======
    function ProfilePage(){
        return <div>
            <h1 style={{color:'white'}}> Hi {user?user.Name:''}! </h1>
        </div>
    } 

>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
    return (
    <div>
        <Navbar title='Profile' content={ProfilePage}></Navbar>
    </div>
    );
}
