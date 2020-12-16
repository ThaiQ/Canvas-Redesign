import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../../util/auth'
import './EditAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
const axios = require("axios")

export default function EditAssignment(props) {
    const [user, setUser] = useState('');
    const [Assignment, setAssignment] = useState('');
    const [Name, setAssignmentName] = useState('')
    const [Description, setAssignmentDesc] = useState('')
    const [Points, setNumPoints] = useState('')
    const [DueDate, setDueDate] = useState('')
    const [Category, setCategory] = useState('')
    const [Closed, setClosed] = useState('')
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        getAssignment(params.assignmentid)
    },[])
    async function getAssignment(id) {
        const body = JSON.stringify({AssignmentID:id})
        console.log("API Request:", body)
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', body)
        console.log("API Response:", res.data.Item)
        setAssignment(res.data.Item)
    }
    async function click() {
        const body = JSON.stringify({   Name:Name||Assignment.Name,
                                        Description:Description||Assignment.Description, 
                                        Points:Points||Assignment.Points, 
                                        DueDate:DueDate||Assignment.DueDate, 
                                        Category:Category||Assignment.Category, 
                                        Questions:Assignment.Questions, 
                                        AssignmentID:Assignment.AssignmentID, 
                                        CourseID:Assignment.CourseID, 
                                        Submissions:Assignment.Submissions, 
                                        Closed:Closed||Assignment.Closed });
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", body)
        if (Assignment.Category === "Homework") {
            window.location.href = "/viewassignments/".concat(Assignment.CourseID.toString())
        }
        else {
            window.location.href = "/viewquizzes/".concat(Assignment.CourseID.toString())
        }
    }
    //let editAssign=() => {
        return (
            <div className="App"> 
                <header className="App-header">
                    { Assignment ? (
                        <>
                            <h1 id="title">
                                    Edit Assignment:
                            </h1>
                            <div className="Form">
                                <FormGroup>
                                    <Label for="assignmentName">Assignment Name </Label>
                                    <Input type="text" name="name" className="formElement" onChange={(event) => { setAssignmentName(event.target.value) }} id="assignmentName" defaultValue={Assignment&&Assignment.Name} placeholder="Name"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="assignmentDescription">Assignment Description </Label>
                                    <Input type="textarea" name="desc" className="formElement" onChange={(event) => { setAssignmentDesc(event.target.value) }} id="assignmentDesc" defaultValue={Assignment&&Assignment.Description} placeholder="Description"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="numPoints">Points </Label>
                                    <Input type="number" name="points" className="formElement" onChange={(event) => { setNumPoints(event.target.value) }} id="numPoints" defaultValue={Assignment&&parseInt(Assignment.Points, 10)} placeholder="Points"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dueDate">Due Date </Label>
                                    <Input type="date" name="due" className="formElement" onChange={(event) => { setDueDate(event.target.value) }} defaultValue={Assignment&&Assignment.DueDate} id="dueDate" />
                                </FormGroup>
                                <Label for="category">Category </Label>
                                <Input type="select" name="Category" className="formElement dropdown" onChange={(event) => { setCategory(event.target.value) }} defaultValue={Assignment&&Assignment.Category} id="category">
                                    <option value="" selected disabled hidden>Select Category</option>
                                    <option>Lecture</option>
                                    <option>Homework</option>
                                    <option>Quiz</option>
                                    <option>Test</option>
                                </Input>
                                <Label for="closed">Assignment Closed</Label>
                                <Input type="select" name="Closed" className="formElement dropdown" onChange={(event) => { setClosed(event.target.value) }} defaultValue={Assignment&&Assignment.Closed} id="closed">
                                    <option value="" selected disabled hidden>Closed</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </Input>
                                <FormGroup check row>
                                    <Button onClick={() => { click() }} id="submit">Submit</Button>
                                </FormGroup>
                            </div>
                        </>
                    ) : (
                        <div>
                            {'Waiting for API'}
                        </div>
                    ) }
                </header>
            </div>
        )
    //}
    // return (
    //     <Navbar title='Edit Assignment' content={editAssign}> </Navbar>
    // )
}

