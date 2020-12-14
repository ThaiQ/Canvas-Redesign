import React, { useState, useEffect } from 'react';
import { checkLogin }  from '../util/auth'
import './ViewAssignments.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/left-navbar/drawer'
const axios = require("axios")


export default function ViewAssignments(props) {
    const [user, setUser] = useState(null);
    const [Assignments, setAssignments] = useState(null);
    useEffect(()=>{
        const params = props.match.params
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
        checkLogin(user) //redirect user to homepage if not login
        getAssignments()
        console.log(user)
    },[])
    async function getAssignments() {
        let res = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getAssignment', JSON.stringify({}))
        console.log(res.data.Items)
        let found = await res.data.Items.filter(elem => elem.CourseID === props.match.params.courseid)
        setAssignments(found)
    }
    let ViewAssign=() => {
        //if (user.AccessLevel === "Teacher") {
            return (
                <div className="App"> 
                <header className="new-header">
                    { Assignments ? (
                        <>
                            <h1 id="title">
                            All Assignments
                            </h1>
                            <div className="AssignmentDisplay">
                                {Assignments? Assignments.map((element, index)=>{
                                    return (
                                        <div className="AssignmentInstance">
                                            {element.Name}: {element.Category} worth {element.Points} points, due on {element.DueDate}.<br/>
                                            <Link to = {`/viewassignment/${element.AssignmentID}`}><u>View Assignment</u>&nbsp;&nbsp;</Link> 
                                            <Link to = {`/editassignment/${element.AssignmentID}`}><u>Edit Assignment</u>&nbsp;&nbsp;</Link>  
                                            <Link to = {`/viewsubmissions/${element.AssignmentID}`}><u>View Submissions</u>&nbsp;&nbsp;</Link>
                                            <Link to = {`/deleteassignment/${element.AssignmentID}`}><u>Delete Assignment</u>&nbsp;&nbsp;</Link> 
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
        //}
        // else {
        //     return (
        //         <div className="App"> 
        //         <header className="new-header">
        //             { Assignment ? (
        //                 <>
        //                     <h1 id="title">
        //                     All Assignments
        //                     </h1>
        //                     <div className="AssignmentDisplay">
        //                         {Assignment? Assignment.map((element, index)=>{
        //                             return (
        //                                 <div className="AssignmentInstance">
        //                                     {element.Name}: {element.Points} points, due on {element.DueDate}.<br/>
        //                                     <Link to = {`/viewassignment/${element.AssignmentID}`}><u>View Assignment</u>&nbsp;&nbsp;</Link>  
        //                                     <Link to = {`/submitassignment/${element.AssignmentID}`}><u>Post Submission</u>&nbsp;&nbsp;</Link>  
        //                                 </div> 
        //                             )
        //                         }):''}
        //                     </div>
        //                 </>
        //             ) : (
        //                 <div>
        //                     {'Waiting for API'}
        //                 </div>
        //             ) }
        //         </header>
        //     </div>
        //     )
        // }
    }
    return (
        <Navbar title='View Assignments' content={ViewAssign}> </Navbar>
    )
}

