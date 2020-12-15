import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../../util/auth'
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")
const crypto = require('crypto');

export default function CreateQuestion(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Assignment, setAssignment] = useState('')
    const [Description, setDescription] = useState('')
    const [Points, setPoints] = useState('')
    const [QuestionType, setQuestionType] = useState('')
    const [Answer, setAnswer] = useState('')
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        const params = props.match.params
        getAssignment(params.assignmentid)
    }, [])
    async function click() {
        let question = { AssignmentID: props.match.params.assignmentid, Description:Description, Points:Points, QuestionType:QuestionType, Answer:Answer, QuestionID:crypto.createHash('sha1').update(props.match.params.assignmentid + Description).digest('hex') };
        console.log(Assignment)
        if (Assignment) {
            Assignment.Questions.push(question)
        }
        let body = Assignment
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", JSON.stringify(body))
        window.location.href = "/viewAssignment/".concat(Assignment.AssignmentID.toString())
    }
    async function getAssignment(id) {
        let body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
    }
    return (
        <div className="App">
            <header className="create-header">
                <div className="Form">
                    <FormGroup>
                        <Label for="questionDescription">Question Description </Label>
                        <Input type="textarea" name="desc" className="formElement" onChange={(event) => { setDescription(event.target.value) }} id="questionDescription" placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="numPoints">Points </Label>
                        <Input type="number" name="points" className="formElement" onChange={(event) => { setPoints(event.target.value) }} id="numPoints" placeholder="Points" />
                    </FormGroup>
                    <Label for="qType">Category </Label>
                    <Input type="select" name="Question Category" className="formElement dropdown" onChange={(event) => { setQuestionType(event.target.value) }} id="qType">
                        <option value="" selected disabled hidden>Select Category</option>
                        <option>Multiple Choice</option>
                        <option>Free Response</option>
                        <option>Select All That Apply</option>
                    </Input>
                    <FormGroup>
                        <Label for="questionAnswer">Correct Answer </Label>
                        <Input type="text" name="ans" className="formElement" onChange={(event) => { setAnswer(event.target.value) }} id="questionAnswer" placeholder="Answer" />
                    </FormGroup>
                    <FormGroup check row>
                        <Button onClick={() => { click() }} id="submit">Submit</Button>
                    </FormGroup>
                </div>
            </header>
        </div>
    )
}
