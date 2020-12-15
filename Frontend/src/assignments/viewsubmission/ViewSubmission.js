import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../../util/auth'
import { Link } from 'react-router-dom';
import Navbar from '../../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewSubmission(props) {
    const [user, setUser] = useState(null);
    const [Submission, setSubmission] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getSubmissions()
        console.log(user)
    },[])
    async function getSubmissions() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        setAssignment(found[0])
        let sub = found[0].Submissions.filter(elem => elem.SubmissionID === props.match.params.submissionid)[0]
        setSubmission(sub);
    }
    let ViewSub=() => {
        return (
            <div className="App"> 
            <header className="new-header">
                { Submission ? (
                    <>
                        <h1 id="title">
                        Submission By {Submission.StudentID} for {Assignment.Name}:
                        </h1>
                        <div className="AssignmentDisplay">
                            <div>
                                Grade: {Submission.Grade}
                                <br/>
                                Submission Body: {Submission.Answers}
                                <br/>
                                {user.AccessLevel == 'Teacher' ? <Link to = {`/gradesubmission/${Submission.AssignmentID}/${Submission.SubmissionID}`}><u>Grade Submission</u>&nbsp;&nbsp;</Link>:''}
                                {user.AccessLevel == 'Student' ? <Link to = {`/submitassignment/${Submission.AssignmentID}`}><u>Resubmit</u>&nbsp;&nbsp;</Link>:''}
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
        <Navbar title='View Submission' content={ViewSub}> </Navbar>
    )
}

