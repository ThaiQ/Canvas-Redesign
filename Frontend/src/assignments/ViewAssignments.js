import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';
const axios = require("axios")

export default async function ViewAssignments() {
    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])

    let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
    res = res.data.Items
    return (
        <div className="App"> 
            <header className="App-header">
                <h1 id="title">
                        All Assignments:
                </h1>
            </header>
        </div>
    )
}

