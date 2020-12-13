import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")

export default function GradeSubmission(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Submission, setSubmission] = useState(null)
    const [Assignment, setAssignment] = useState(null)
    const [Grade, setGrade] = useState(null)
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        const params = props.match.params
        getSubmission(params.assignmentid, params.submissionid)
        console.log(user)
    }, [])
    async function click() {
        const body = JSON.stringify({ FilePath:Submission.FilePath, Answers:Submission.Answers, Grade:Grade, AssignmentID:Submission.AssignmentID, StudentID:Submission.StudentID });
        console.log(body)
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putSubmission", body)
    }
    async function getSubmission(assignid, subid) {
        const body = JSON.stringify({AssignmentID:assignid})
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        setAssignment(res.data.Item)
        setSubmission(Assignment.Submissions.find(element => element.SubmissionID === subid))
        console.log(Submission)
    }

    return (
        <div className="App">
            <header className="create-header">
                <div className="Form">
                    <FormGroup>
                        <Label for="numPoints">Enter Grade</Label>
                        <Input type="number" name="points" className="formElement" onChange={(event) => { setGrade(event.target.value) }} id="numPoints" placeholder="Grade" />
                    </FormGroup>
                    <FormGroup check row>
                        <Button onClick={() => { click() }} id="submit">Submit</Button>
                    </FormGroup>
                </div>
            </header>
        </div>
    )
}
