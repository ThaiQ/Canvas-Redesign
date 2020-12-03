import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import Log from '../components/auth/Logout'

export default function Profile(props) {

    //Making sure that user is login
    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        //checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])


    return (
    <div> Hi: {user?user.Name:''} 
        <Log rehome={true}/>
    </div>
    );
}
