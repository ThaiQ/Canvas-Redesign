import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../../util/auth'
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")


export default function EditQuestion(props) {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    const [Question, setQuestion] = useState(null);
    const [Description, setDescription] = useState(null)
    const [Points, setPoints] = useState(null)
    const [QuestionType, setQuestionType] = useState(null)
    const [Answer, setAnswer] = useState(null)
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        getAssignment()
        console.log(user)
    },[])
    async function getAssignment() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        if (found[0]) {
            setQuestion(found[0].Questions.filter(elem => elem.QuestionID === props.match.params.questionid)[0])
        }
        if (found[0]) {
            setAssignment(found[0])
        }
    }
    async function click() {
        const question = {   AssignmentID:Question.AssignmentID,
                                        Description:Description||Question.Description, 
                                        Points:Points||Question.Points, 
                                        QuestionType:QuestionType||Question.QuestionType,
                                        Answer:Answer||Question.Answer,  
                                        QuestionID:Question.QuestionID  };
        Assignment.Questions[Assignment.Questions.findIndex(element => element.QuestionID === question.QuestionID)] = question
        console.log(Assignment.Questions)
        let body = JSON.stringify(Assignment)
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", body)
        window.location.href = "/viewAssignment/".concat(Assignment.AssignmentID.toString())
    }
    //let editQuestion=() => {
        return (
            <div className="App">
                <header className="create-header">
                    <div className="Form">
                        <FormGroup>
                            <Label for="questionDescription">Question Description </Label>
                            <Input type="textarea" name="desc" className="formElement" onChange={(event) => { setDescription(event.target.value) }} id="questionDescription" defaultValue={Question&&Question.Description} placeholder="Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numPoints">Points </Label>
                            <Input type="number" name="points" className="formElement" onChange={(event) => { setPoints(event.target.value) }} id="numPoints" defaultValue={Question&&Question.Points} placeholder="Points" />
                        </FormGroup>
                        <Label for="qType">Category </Label>
                        <Input type="select" name="Question Category" className="formElement dropdown" onChange={(event) => { setQuestionType(event.target.value) }} id="qType" defaultValue={Question&&Question.QuestionType}>
                            <option value="" selected disabled hidden>Select Category</option>
                            <option>Multiple Choice</option>
                            <option>Free Response</option>
                            <option>Select All That Apply</option>
                        </Input>
                        <FormGroup>
                            <Label for="questionAnswer">Correct Answer </Label>
                            <Input type="text" name="ans" className="formElement" onChange={(event) => { setAnswer(event.target.value) }} id="questionAnswer" defaultValue={Question&&Question.Answer} placeholder="Answer" />
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
    //     <Navbar title='Edit Question' content={editQuestion}> </Navbar>
    // )
}

