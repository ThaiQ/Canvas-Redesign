import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../../util/auth'
import { Link } from 'react-router-dom';
import Navbar from '../../components/left-navbar/drawer'
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")


export default function DeleteQuestion(props) {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    const [Question, setQuestion] = useState(null);
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
        setAssignment(found[0])
        setQuestion(found[0].Questions.filter(elem => elem.QuestionID === props.match.params.questionid)[0])
    }
    async function yes() {
        for (var i = 0; i < Assignment.Questions.length; i++) {
            if (Assignment.Questions[i].QuestionID === Question.QuestionID) {
                if (i == Assignment.Questions.length - 1) {
                    Assignment.Questions.pop()
                }
                else if (i == 0) {
                    Assignment.Questions.shift()
                }
                else {
                    const arr1 = Assignment.Questions.splice(0, i)
                    const arr2 = Assignment.Questions.splice(i + 1, Assignment.Questions.length)
                    Assignment.Questions = arr1.concat(arr2)
                }
            }
        }
        let body = Assignment
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment', JSON.stringify(body))
        window.location.href = "/viewquiz/".concat(props.match.params.assignmentid.toString())
    }
    async function no() {
        window.location.href = "/viewquiz/".concat(props.match.params.assignmentid.toString())
    }
    let delAssign=() => {
        return (
            <div className="App"> 
                <header className="new-header">
                        <>
                            <h1 id="title">
                            Are you sure?
                            </h1>
                            <div className="AssignmentDisplay">
                                <FormGroup check row>
                                < Button onClick={() => { yes() }} id="Yes">Yes</Button> <Button onClick={() => { no() }} id="Yes">No</Button>
                                </FormGroup>
                            </div>
                        </>
                </header>
            </div>
        )
    }
    return (
        <Navbar title='Delete Assignment' content={delAssign}> </Navbar>
    )
}

