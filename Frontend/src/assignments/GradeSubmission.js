import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")


export default function GradeSubmission(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Submission, setSubmission] = useState(null)
    const [Assignment, setAssignment] = useState(null)
    const [Grade, setGrade] = useState(null)
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        const params = props.match.params
        getSubmission(params.assignmentid, params.submissionid)
    }, [])
    async function click() {
        let submission = { FilePath:Submission.FilePath, Answers:Submission.Answers, Grade:Grade, AssignmentID:Submission.AssignmentID, StudentID:Submission.StudentID, SubmissionID:Submission.SubmissionID};
        for (var i = 0; i < Assignment.Submissions.length; i++) {
            if (Assignment.Submissions[i].StudentID === submission.StudentID) {
                Assignment.Submissions[i] = submission
            }
        }
        const body = Assignment
        console.log(body)
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", JSON.stringify(body))
        window.location.href = "/viewAssignments/".concat(Assignment.CourseID.toString())
    }
    async function getSubmission(assignid, subid) {
        let body = JSON.stringify({AssignmentID:assignid})
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        setAssignment(res.data.Item)
        setSubmission(res.data.Item.Submissions.find(element => element.SubmissionID === subid))
    }
    let gradeSub=() => {
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
    return (
        <Navbar title='Grade Submission' content={gradeSub}> </Navbar>
    )
}
