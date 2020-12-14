import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewAssignment(props) {
    const [user, setUser] = useState(null);
    const [Submission, setSubmission] = useState(null);
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
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        setAssignment(found[0])
        let sub = found[0].Submissions.filter(elem => elem.SubmissionID === props.match.params.submissionid)[0]
        setSubmission(sub);
    }
    let ViewAssign=() => {
        return (
            <div className="App"> 
            <header className="new-header">
                { Assignment ? (
                    <>
                        <h1 id="title">
                        {Assignment.Name}
                        </h1>
                        <div className="AssignmentDisplay">
                            <div>
                                Points: {Assignment.Points}
                                <br/>
                                Assignment Description: {Assignment.Description}
                                <br/>
                                <Link to = {`/viewsubmissions/${Assignment.AssignmentID}`}><u>Grade Submissions</u>&nbsp;&nbsp;</Link>
                                <Link to = {`/editassignment/${Assignment.AssignmentID}`}><u>Edit Assignment  </u>&nbsp;&nbsp;</Link> 
                                <Link to = {`/submitassignment/${Assignment.AssignmentID}`}><u>Post Submission  </u>&nbsp;&nbsp;</Link>
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
    return (
        <Navbar title='View Submission' content={ViewAssign}> </Navbar>
    )
}

