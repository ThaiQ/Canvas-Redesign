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
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignment()
        console.log(user)
    },[])
    async function getAssignment() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        console.log(res.data.Items)
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
                                        {element.Name}: {element.Points} points, due on {element.DueDate}. <Link to = {`/editassignment/${element.AssignmentID}`}><u>Edit Assignment</u></Link> <Link to = {`/submitassignment/${element.AssignmentID}`}><u>Post Submission</u></Link> <Link to = {`/viewsubmissions/${element.AssignmentID}`}><u>View Submissions</u></Link>
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

