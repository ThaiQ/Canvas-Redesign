import React, { useState, useEffect } from 'react';
import { checkLogin } from '../../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import GradeIcon from '@material-ui/icons/Grade';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from '../../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewQuizzes(props) {
    const [user, setUser] = useState(null);
    const [Assignments, setAssignments] = useState(null);
    useEffect(() => {
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignments()
        console.log(user)
    }, [])
    async function getAssignments() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        console.log(res.data.Items)
        let found = await res.data.Items.filter(elem => elem.CourseID === props.match.params.courseid && (elem.Category === "Test" || elem.Category === "Quiz"))
        setAssignments(found)
    }
    let ViewQuiz = () => {
        return (
            <div className="App">
                <header className="new-header">
                    {Assignments ? (
                        <>
                            <h1 id="title">
                                All Quizzes and Tests
                            </h1>
                            <div className="AssignmentDisplay">
                                {user.AccessLevel == 'Teacher' ? 
                                <div className="buttondiv">
                                    <Link to={`/createassignment/${props.match.params.courseid}`} className='drawer-link'>
                                        <ListItem className='dashb-text' button>
                                            <ListItemIcon><AddBoxIcon /> </ListItemIcon>
                                            <ListItemText primary={'Create Assignment'} />
                                        </ListItem>
                                    </Link>
                                </div>:''}
                                {Assignments ? Assignments.map((element, index) => {
                                    return user.AccessLevel == 'Teacher' ? (
                                        <div className="AssignmentInstance">
                                            <br />
                                            <br />
                                            <div className="assignmentDetails">
                                                {element.Name}: {element.Category} worth {element.Points} points, due on {element.DueDate}.<br />
                                            </div>
                                            <div className="buttondivsmall">
                                                <Link to={`/viewquiz/${element.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><SearchIcon /> </ListItemIcon>
                                                        <ListItemText primary={'View'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
                                            <div className="buttondivsmall">
                                                <Link to={`/editassignment/${element.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><EditIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Edit'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
                                            <div className="buttondivsmall">
                                                <Link to={`/viewsubmissions/${element.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><GradeIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Grade'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
                                            <div className="buttondivsmall">
                                                <Link to={`/deleteassignment/${element.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><DeleteIcon /> </ListItemIcon>
                                                        <ListItemText primary={'Delete'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
                                        </div>
                                    ) :
                                        (<div className="AssignmentInstance">
                                            <div className="assignmentDetails">
                                                {element.Name}: {element.Points} points, due on {element.DueDate}.<br />
                                            </div>
                                            <div className="buttondivsmall">
                                                <Link to={`/viewquiz/${element.AssignmentID}`} className='drawer-link'>
                                                    <ListItem className='dashb-text' button>
                                                        <ListItemIcon><SearchIcon /> </ListItemIcon>
                                                        <ListItemText primary={'View'} />
                                                    </ListItem>
                                                </Link>
                                            </div>
                                        </div>)
                                }) : ''}
                            </div>
                        </>
                    ) : (
                            <div>
                                {'Waiting for API'}
                            </div>
                        )}
                </header>
            </div>
        )
    }
    return (
        <Navbar title='View Quizzes and Tests' content={ViewQuiz}> </Navbar>
    )
}

