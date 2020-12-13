import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")

export default function SubmitAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Answers, setAnswers] = useState(null)
    const [AssignmentID, setAssignmentID] = useState(null)
    const [StudentID, setStudentID] = useState(null)
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        const params = props.match.params
        setAssignmentID(params.assignmentid)
        setStudentID(user.StudentID.toString())
        console.log(user)
    }, [])
    async function click() {
        const body = JSON.stringify({ Answers, AssignmentID, StudentID });
        console.log(body)
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putSubmission", body)
    }

    return (
        <div className="App">
            <header className="create-header">
                <div className="Form">
                    <FormGroup>
                        <Label for="assignmentAnswers">Assignment Description </Label>
                        <Input type="textarea" name="ans" className="formElement" onChange={(event) => { setAnswers(event.target.value) }} id="ans" placeholder="Enter Submission" />
                    </FormGroup>
                    <FormGroup check row>
                        <Button onClick={() => { click() }} id="submit">Submit</Button>
                    </FormGroup>
                </div>
            </header>
        </div>
    )
}
