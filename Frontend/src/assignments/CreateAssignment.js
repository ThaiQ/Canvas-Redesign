import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './CreateAssignment.css';
import { Button, FormGroup, Label, Input} from 'reactstrap';
const axios = require("axios")

export default function CreateAssignment() {
    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])
    const [assignmentName, setAssignmentName] = useState ('')
    const [assignmentDesc, setAssignmentDesc] = useState ('')
    const [numPoints, setNumPoints] = useState ('')
    const [dueDate, setDueDate] = useState ('')
    const [category, setCategory] = useState ('')

    async function click() {
        const body = JSON.stringify({assignmentName, assignmentDesc, numPoints, dueDate, category});
        console.log(user)
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putAssignment", body)
        console.log(res.data)
      }
    
    return (
        <html className="bg">
            <div className="App"> 
                <header className="App-header">
                    <h1 id="title">
                        Create an Assignment
                    </h1>
                    <div className="Form">
                        <FormGroup>
                            <Label for="assignmentName">Assignment Name </Label>
                            <Input type="text" name="name" className="formElement" onChange={(event)=>{setAssignmentName(event.target.value)}} id="assignmentName" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignmentDescription">Assignment Description </Label>
                            <Input type="textarea" name="desc" className="formElement" onChange={(event)=>{setAssignmentDesc(event.target.value)}} id="assignmentDesc" placeholder="Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numPoints">Points </Label>
                            <Input type="number" name="points" className="formElement" onChange={(event)=>{setNumPoints(event.target.value)}} id="numPoints" placeholder="Points" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueDate">Due Date </Label>
                            <Input type="date" name="due" className="formElement" onChange={(event)=>{setDueDate(event.target.value)}} id="dueDate" />
                        </FormGroup>
                            <Label for="category">Category </Label>
                            <Input type="select" name="Category" className="formElement dropdown" onChange={(event)=>{setCategory(event.target.value)}} id="category">
                            <option value="" selected disabled hidden>Select Category</option>
                            <option>Homework</option>
                            <option>Quiz</option>
                            <option>Test</option>
                        </Input>
                        <FormGroup check row>
                            <Button onClick={()=>{click()}} id="submit">Submit</Button>
                        </FormGroup>
                    </div>
                </header>
            </div>
        </html>
    );
}