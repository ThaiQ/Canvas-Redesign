import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';

export default function ViewAssignments() {
    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])
}