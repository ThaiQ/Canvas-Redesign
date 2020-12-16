import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../../util/auth'
import { Link } from 'react-router-dom';
import Navbar from '../../components/left-navbar/drawer'
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import GradeIcon from '@material-ui/icons/Grade';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
const axios = require("axios")


export default function ViewSubmission(props) {
    const [user, setUser] = useState(null);
    const [Submission, setSubmission] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getSubmissions()
        console.log(user)
    },[])
    async function getSubmissions() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        setAssignment(found[0])
        let sub = found[0].Submissions.filter(elem => elem.SubmissionID === props.match.params.submissionid)[0]
        setSubmission(sub);
    }
    let ViewSub=() => {
        return (
            
            <div className="App"> 
            <header className="new-header">
                { Submission ? (
                    <>
                        <h1 id="title">
                        Submission By {Submission.StudentID} for {Assignment.Name}:
                        </h1>
                        <div className="AssignmentDisplay">
                            <div className="assignmentDetails">
                                Grade: {Submission.Grade}
                                <br/>
                                    Submission Body:<br/> {Assignment.Category === "Assignment"? (Submission.Answers):(
                                    Submission ? Submission.Answers.map((element, index) => {
                                        return (
                                            <u>Question {index + 1}: {element}<br/></u>
                                        )
                                    }) : '')}
                                <br/>
                                {user.AccessLevel == 'Teacher' ? <div className="buttondivmed">
                                                <Link to = {`/gradesubmission/${Submission.AssignmentID}/${Submission.SubmissionID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><GradeIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Grade Submission'} />
                                                    </ListItem>
                                                </Link>
                                            </div>:''}
                                {user.AccessLevel == 'Student' ? <div className="buttondivsmall">
                                                <Link to = {`/submitassignment/${Submission.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><PublishIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Resubmit'} />
                                                    </ListItem>
                                                </Link>
                                            </div>:''}
                            </div> 
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
        <Navbar title='View Submission' content={ViewSub}> </Navbar>
    )
}

