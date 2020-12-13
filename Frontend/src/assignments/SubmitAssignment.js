import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")

export default function SubmitAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Answers, setAnswers] = useState('')
    const [AssignmentID, setAssignmentID] = useState('')
    const [Assignment, setAssignment] = useState('')
    const [StudentID, setStudentID] = useState('')
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        const params = props.match.params
        getAssignment(params.assignmentid)
    }, [])
    async function click() {
        const body = JSON.stringify({ FilePath:'', Answers, Grade:'', AssignmentID, StudentID });
        Assignment.Submissions.push(body)
        body = Assignment
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", body)
    }
    async function getAssignment(id) {
        setStudentID(user.StudentID.toString())
        console.log(StudentID)
        const body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
        console.log(Assignment)
    }

    return (
        <div className="App">
            <header className="create-header">
                <div className="Form">
                    <FormGroup>
                        <Label for="assignmentAnswers">Enter Submission Here</Label>
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
