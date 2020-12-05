import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import Logout from '../components/auth/Logout'

export default function Profile(props) {

    //Making sure that user is login
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(()=>{
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])

    return (
    <div> Hi: {user?user.Name:''} 
        <Logout rehome={true}/>
    </div>
    );
}
