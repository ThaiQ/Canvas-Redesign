import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")
const crypto = require('crypto');

export default function SubmitAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Answers, setAnswers] = useState('')
    const [Assignment, setAssignment] = useState('')
    const [StudentID, setStudentID] = useState('')
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        const params = props.match.params
        getAssignment(params.assignmentid)
    }, [])
    async function click() {
        let submission = { FilePath:'', Answers, Grade:'', AssignmentID:props.match.params.assignmentid, StudentID, SubmissionID:crypto.createHash('sha1').update(props.match.params.assignmentid + StudentID).digest('hex') };
        var state = 0
        console.log(submission.StudentID)
        for (var i = 0; i < Assignment.Submissions.length; i++) {
            if (Assignment.Submissions[i].StudentID === submission.StudentID) {
                Assignment.Submissions[i] = submission
                state = 1
            }
        }
        if (state == 0) {
            Assignment.Submissions.push(submission)
        }
        console.log(Assignment)
        let body = Assignment
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", JSON.stringify(body))
        window.location.href = "/viewassignment/".concat(Assignment.AssignmentID)
    }
    async function getAssignment(id) {
        setStudentID(user.StudentID.toString())
        console.log(StudentID)
        let body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
        console.log(Assignment)
    }
    //let subAssign=() => {
        return (
            <div className="App">
                <header className="create-header">
                    <div className="Form">
                        <FormGroup>
                            <Label for="assignmentAnswers">Enter Submission Here</Label>
                            <Input type="textarea" name="ans" className="formElement" onChange={(event) => { setAnswers(event.target.value) }} id="ans" placeholder="Submission" />
                        </FormGroup>
                        <FormGroup check row>
                            <Button onClick={() => { click() }} id="submit">Submit</Button>
                        </FormGroup>
                    </div>
                </header>
            </div>
        )
    //}
    // return (
    //     <Navbar title='Submit Assignment' content={subAssign}> </Navbar>
    // )
}
