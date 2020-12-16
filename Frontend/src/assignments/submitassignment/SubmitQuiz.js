import React, { useState, useEffect } from 'react';
import { checkLogin } from '../../util/auth'
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")
const crypto = require('crypto');

export default function SubmitAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Answers, setAnswers] = useState([])
    const [Assignment, setAssignment] = useState('')
    const [StudentID, setStudentID] = useState('')
    const [Questions, setQuestions] = useState('')
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        const params = props.match.params
        getAssignment(params.assignmentid)
    }, [])
    async function click() {
        let submission = { FilePath:'', Answers, Grade:'', AssignmentID:props.match.params.assignmentid, StudentID, SubmissionID:crypto.createHash('sha1').update(props.match.params.assignmentid + StudentID).digest('hex') };
        var state = 0
        Assignment.Submissions.push(submission)
        console.log(Assignment)
        let body = Assignment
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", JSON.stringify(body))
        window.location.href = "/viewquiz/".concat(Assignment.AssignmentID)
    }
    async function getAssignment(id) {
        setStudentID(user.StudentID.toString())
        console.log(StudentID)
        let body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
        setQuestions(res.data.Item.Questions)
    }
    async function multClick(index, event) {
        let temp = Answers
        temp[index] = event.target.value
        setAnswers(temp)
        console.log(Answers)
    }
    return (
        <div className="App">
            <header className="create-header">
                <div className="Form">
                    {Assignment.Name} Questions
                    {Questions? Questions.map((element, index)=>{
                        return (
                            element.QuestionType === "Free Response"? (
                            <FormGroup>
                                <Label for="assignmentAnswers"> Question {index + 1}: {element.Description}</Label>
                                <Input type="textarea" name="ans" className="formElement" onChange={(event) => {
                                    let temp = Answers
                                    temp[index] = event.target.value
                                    setAnswers(temp)
                                    console.log(Answers)
                                 }} id="ans" placeholder="Answer" />
                            </FormGroup>
                            ):element.QuestionType === "Multiple Choice"? (
                            <FormGroup>
                                <Label> Question {index + 1}: {element.Description}</Label>
                                <FormGroup>
                                    <Label check>
                                        <Input type="radio" name="radio1" value = "A" onClick={event => (multClick(index, event))}/>{' '}
                                        A
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label check>
                                        <Input type="radio" name="radio1" value = "B" onClick={event => (multClick(index, event))}/>{' '}
                                        B
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label check>
                                        <Input type="radio" name="radio1" value = "C" onClick={event => (multClick(index, event))}/>{' '}
                                        C
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label check>
                                        <Input type="radio" name="radio1" value = "D" onClick={event => (multClick(index, event))}/>{' '}
                                        D
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            ):''
                        )
                    }):''}
                    <FormGroup check row>
                        <Button onClick={() => { click() }} id="submit">Submit</Button>
                    </FormGroup>
                </div>
            </header>
        </div>
    )
}
