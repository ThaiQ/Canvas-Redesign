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
                                {user.AccessLevel == 'Teacher' ? <div className="buttondivsmall">
                                    <Link to = {`/viewsubmissions/${Assignment.AssignmentID}`} className='drawer-link'>
                                        <ListItem className='dashb-text' button>
                                            <ListItemIcon><GradeIcon /> </ListItemIcon>
                                            <ListItemText primary={'Grade'} />
                                        </ListItem>
                                    </Link>
                                </div>:''}
                                {user.AccessLevel == 'Teacher' ? <div className="buttondivsmall">
                                    <Link to = {`/editassignment/${Assignment.AssignmentID}`} className='drawer-link'>
                                        <ListItem className='dashb-text' button>
                                            <ListItemIcon><EditIcon /> </ListItemIcon>
                                            <ListItemText primary={'Edit'} />
                                        </ListItem>
                                    </Link>
                                </div>:''}
                                {user.AccessLevel == 'Teacher' ? 
                                    <div className="buttondivsmall">
                                        <Link to={`/deleteassignment/${Assignment.AssignmentID}`} className='drawer-link'>
                                            <ListItem className='dashb-text' button>
                                                <ListItemIcon><DeleteIcon /> </ListItemIcon>
                                                <ListItemText primary={'Delete'} />
                                            </ListItem>
                                        </Link>
                                    </div>:''}
                                <br/>
                                <div className="assignmentDetails">
                                    Points: {Submission ? <u>{Submission.Grade}/</u>:''}{Assignment.Points}
                                    <br/>
                                    {Assignment.Description}
                                </div>
                                <br/>
                                <br/>
                                {user.AccessLevel == 'Student' && !Submission ? 
                                <div className="buttondiv">
                                    <Link to = {`/submitassignment/${Assignment.AssignmentID}`} className='drawer-link'>
                                        <ListItem className='dashb-text' button>
                                            <ListItemIcon><EditIcon /> </ListItemIcon>
                                            <ListItemText primary={'Submit Assignment'} />
                                        </ListItem>
                                    </Link>
                                </div>
                                :user.AccessLevel == 'Student' ? 
                                <div className="buttondiv">
                                    <Link to = {`/submitassignment/${Assignment.AssignmentID}`} className='drawer-link'>
                                        <ListItem className='dashb-text' button>
                                            <ListItemIcon><EditIcon /> </ListItemIcon>
                                            <ListItemText primary={'Resubmit Assignment'} />
                                        </ListItem>
                                    </Link>
                                </div>:''}
                                {user.AccessLevel == 'Student' && Submission ? <p> Your Submission: {Submission.Answers} </p>:''}
                                <br/>
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
        <Navbar title='View Assignment' content={ViewAssign}> </Navbar>
    )
}

