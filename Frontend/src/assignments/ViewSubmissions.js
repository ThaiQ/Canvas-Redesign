import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewSubmissions(props) {
    const [user, setUser] = useState(null);
    const [Submissions, setSubmissions] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        getSubmissions()
        console.log(user)
    },[])
    async function getSubmissions() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        console.log(found[0])
        setAssignment(found[0])
        setSubmissions(found[0].Submissions);
    }
    let ViewSubs=() => {
        return (
            <div className="App"> 
            <header className="new-header">
                { Submissions ? (
                    <>
                        <div className="AssignmentDisplay">
                            {Submissions? Submissions.map((element, index)=>{
                                return (
                                    <div className="AssignmentInstance">
                                        Submission by ID {element.StudentID} Grade: {element.Grade}/{Assignment.Points} <Link to = {`/viewsubmission/${Assignment.AssignmentID}/${element.SubmissionID}`}><u>View Submission</u></Link> <Link to = {`/gradesubmission/${element.AssignmentID}/${element.SubmissionID}`}><u>Grade</u></Link>
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
        <Navbar title={`View Submissions for ${Assignment?.Name ?? ''}`} content={ViewSubs}> </Navbar>
    )
}

