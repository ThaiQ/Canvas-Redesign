import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewAssignments(props) {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        const body = JSON.stringify({CourseID:params.courseid})
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        console.log(body)
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignment(body)
        console.log(user)
    },[])
    async function getAssignment(body) {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        let found = await res.data.Items.filter(elem => elem.CourseID === props.match.params.courseid)
        setAssignment(found)
    }
    let ViewAssign=() => {
        return (
            <div className="App"> 
            <header className="new-header">
                { Assignment ? (
                    <>
                        <h1 id="title">
                        All Assignments:
                        </h1>
                        <div className="AssignmentDisplay">
                            {Assignment? Assignment.map((element, index)=>{
                                return (
                                    <div className="AssignmentInstance">
                                        {element.Name}: {element.Points} points, due on {element.DueDate}. <Link to = {`/editassignment/${element.AssignmentID}`}>Edit</Link> <Link to = {`/submitassignment/${element.AssignmentID}`}>Submit</Link>
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
    return (
        <Navbar title='View Assignments' content={ViewAssign}> </Navbar>
    )
}

