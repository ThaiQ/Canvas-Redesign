import React, { useState, useEffect } from 'react';
import { checkLogin, checkTeacher } from '../../util/auth'
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
const axios = require("axios")



export default function ViewSubmissions(props) {
    const [user, setUser] = useState(null);
    const [Submissions, setSubmissions] = useState(null);
    const [Assignment, setAssignment] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        checkTeacher(user)
        getSubmissions()
        console.log(user)
    },[])
    async function getSubmissions() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        let found = await res.data.Items.filter(elem => elem.AssignmentID === props.match.params.assignmentid)
        console.log(found[0])
        setAssignment(found[0])
        setSubmissions(found[0].Submissions);
    }
    let ViewSubs=() => {
        return (
            <div className="App"> 
            <header className="new-header">
                { Submissions ? (
                    <>
                        <div className="AssignmentDisplay">
                            {Submissions? Submissions.map((element, index)=>{
                                return (
                                    <div className="AssignmentInstance">
                                        <div className="assignmentDetails">
                                            Submission by ID {element.StudentID} Grade: {element.Grade}/{Assignment.Points} 
                                        </div>
                                            <div className="buttondivmed">
                                                <Link to = {`/viewsubmission/${Assignment.AssignmentID}/${element.SubmissionID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><SearchIcon /> </ListItemIcon>
                                                        <ListItemText primary={'View Submission'} />
                                                    </ListItem>
                                                </Link>
                                            </div><div className="buttondivsmall">
                                                <Link to = {`/gradesubmission/${element.AssignmentID}/${element.SubmissionID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><GradeIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Grade'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
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
        <Navbar title={`View Submissions for ${Assignment?.Name ?? ''}`} content={ViewSubs}> </Navbar>
    )
}

