import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './EditAssignment.css';
const axios = require("axios")

export default function EditAssignment(props) {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignment(params.assignmentid)
    },[])
    async function getAssignment(id) {
        const body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
    }
    return (
        <div className="App"> 
            <header className="App-header">
                { Assignment ? (
                    <>
                        <h1 id="title">
                                Assignments:
                        </h1>
                        <div className="AssignmentDisplay">
                                <div className="AssignmentInstance">
                                    {Assignment.Name}: {Assignment.Points} points, due on {Assignment.DueDate}.
                                </div>
                        </div>
                    </>
                ) : (
                    <div>
                        {'Waiting for API'}
                    </div>
                ) }
            </header>
        </div>
    )
}

