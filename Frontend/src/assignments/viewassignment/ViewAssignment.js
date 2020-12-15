import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../../util/auth'
import { Link } from 'react-router-dom';
import Navbar from '../../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [Submission, setSubmission] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        checkLogin(user) //redirect user to homepage if not login
        getAssignment()
        console.log(user)
    },[])
    async function getAssignment() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        setAssignment(found[0])
        console.log(found[0].Submissions.filter(elem => elem.StudentID === user.StudentID.toString())[0])
        if (found[0]) {
            if (found[0].Submissions.filter(elem => elem.StudentID === user.StudentID.toString())[0]) {
                setSubmission(found[0].Submissions.filter(elem => elem.StudentID === user.StudentID.toString())[0]);
            }
        }
    }
    let ViewAssign=() => {
        return (
            <div className="App"> {console.log(Submission)}
            <header className="new-header">
                { Assignment ? (
                    <>
                        <h1 id="title">
                        {Assignment.Name}
                        </h1>
                        <div className="AssignmentDisplay">
                            <div>
                                {user.AccessLevel == 'Teacher' ? <Link to = {`/viewsubmissions/${Assignment.AssignmentID}`}><u>Grade Submissions</u>&nbsp;&nbsp;</Link>:''}
                                {user.AccessLevel == 'Teacher' ? <Link to = {`/editassignment/${Assignment.AssignmentID}`}><u>Edit Assignment  </u>&nbsp;&nbsp;</Link>:''}
                                {user.AccessLevel == 'Teacher' ? <Link to = {`/createquestion/${Assignment.AssignmentID}`}><u>Add Question  </u>&nbsp;&nbsp;</Link>:''}
                                <br/>
                                Points: {Assignment.Points}
                                <br/>
                                {Assignment.Description}
                                <br/>
                                <br/>
                                {user.AccessLevel == 'Student' && !Submission ? <Link to = {`/submitassignment/${Assignment.AssignmentID}`}><u>Post Submission</u></Link>
                                :user.AccessLevel == 'Student' ? <Link to = {`/submitassignment/${Assignment.AssignmentID}`}><u>Resubmit Assignment </u></Link>:''}
                                {user.AccessLevel == 'Student' && Submission ? <p> Your Submission: {Submission.Answers} </p>:''}
                                <br/>
                            </div> 
                            {Assignment.Questions? Assignment.Questions.map((element, index)=>{
                                    return (
                                        <div className="AssignmentInstance">
                                            <br/>
                                            {user.AccessLevel == 'Teacher' ? <Link to = {`/editquestion/${element.AssignmentID}/${element.QuestionID}`}><u>Edit Question</u>&nbsp;&nbsp;</Link>:''}
                                            {user.AccessLevel == 'Teacher' ? <Link to = {`/deletequestion/${element.AssignmentID}/${element.QuestionID}`}><u>Delete Question</u></Link>:''}
                                            <br/>
                                            Question {Assignment.Questions.indexOf(element) + 1}: {element.QuestionType} worth {element.Points} points.<br/>
                                            {element.Description}
                                            <br/>
                                        </div> 
                                    )
                                }):''}
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
    }
    return (
        <Navbar title='View Assignment' content={ViewAssign}> </Navbar>
    )
}

