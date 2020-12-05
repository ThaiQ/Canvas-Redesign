import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
const axios = require("axios")


export default function ViewAssignments() {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignment()
        console.log(user)
    },[])
    async function getAssignment() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        setAssignment(res.data.Items)
    }
    return (
        <div className="App"> 
            <header className="App-header">
                { Assignment ? (
                    <>
                        <h1 id="title">
                        All Assignments:
                        </h1>
                        <div className="AssignmentDisplay">
                            {Assignment? Assignment.map((element, index)=>{
                                return (
                                    <div className="AssignmentInstance">
                                        {element.Name}: {element.Points} points, due on {element.DueDate}. <Link to = {`/editassignment/${element.AssignmentID}`}>Edit</Link>
                                    </div> 
                                )
                            }):''}
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

