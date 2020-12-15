import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/left-navbar/drawer'
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")


export default function DeleteAssignment(props) {
    const [user, setUser] = useState(null);
    const [Assignment, setAssignment] = useState(null);
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
    }
    async function yes() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/deleteAssignment', JSON.stringify({AssignmentID:props.match.params.assignmentid}))
        window.location.href = "/viewAssignments/".concat(Assignment.CourseID.toString())
    }
    async function no() {
        window.location.href = "/viewAssignments/".concat(Assignment.CourseID.toString())
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

