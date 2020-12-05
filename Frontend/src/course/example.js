import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import { Table, Input, Button } from 'reactstrap';
import './example.css'
<<<<<<< HEAD


=======
import Navbar from '../components/left-navbar/drawer'
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da

const axios = require('axios')

export default function Example(props) {

    //Current user who is logging in
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');

    //Making sure that user is login
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
        getDatabase()
    }, [])



    //form variables
    const [courseName, setCourseName] = useState("")
    const [session, setSession] = useState("")
    const [description, setDescription] = useState("")
    const [id, setID] = useState(user.StudentID)
    //Submitting button
    async function submit() {
<<<<<<< HEAD
       
            let objectToSave = {
                CourseName: courseName,
                Description: description,
                Session: session,
                InstructorID: id
            }
            //save data to databse (on aws)
            await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", JSON.stringify(objectToSave))
            //reupdate current board
            getDatabase()
            window.location.href = '/course/CourseHome'
    
=======
        let objectToSave = {
            CourseName: courseName,
            Description: description,
            Session: session,
            InstructorID: id
        }
        //save data to databse (on aws)
        await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", JSON.stringify(objectToSave))
        //reupdate current board
        getDatabase()
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
    }



    //Get all data in the database (on aws)
    const [data, setData] = useState([])
    async function getDatabase() {
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getCourse", JSON.stringify({}))
        //save to variable above
        setData(res.data.Items)
    }



    //Delete an item by there ID (only ID because your api wrote like that)
    async function deleteItem(CourseID) {
        //(only ID because your api wrote like that in src/course/delete-course)
        let objectToDelete = {
            CourseID: CourseID,
        }
        await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/deleteCourse", JSON.stringify(objectToDelete))
        //reupdate current board
        getDatabase()
<<<<<<< HEAD
    } 

   

    //HTML
    return (
        <div>
            <div className='example-input'>
                Add a Course
                <Input type="email" required placeholder="Course Name" onChange={(event) => { setCourseName(event.target.value) }} />
=======
    }

    //HTML

    function Page() {
        return <div>
            <div className='example-input' style={{ color: 'white' }}>
                Add a Course
        <Input type="email" placeholder="Course Name" onChange={(event) => { setCourseName(event.target.value) }} />
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
                <Input type="email" placeholder="Session" onChange={(event) => { setSession(event.target.value) }} />
                <Input type="email" placeholder="Description" onChange={(event) => { setDescription(event.target.value) }} />
                <Button onClick={submit}> Submit </Button>
            </div>

            <Table>
<<<<<<< HEAD
                <thead>
=======
                <thead style={{ color: 'white' }}>
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
                    <tr>
                        <th>#</th>
                        <th>CourseID</th>
                        <th>CourseName</th>
                        <th>Session</th>
                        <th>InstructorID</th>
                        <th>Description</th>
                        <th>Delete</th>
<<<<<<< HEAD
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data ? data.map((course, index) => {
                            return <tr key={index}>
                                <th scope="row">{index+1}</th>
=======
                    </tr>
                </thead>
                <tbody style={{ color: 'white' }}>
                    {
                        data ? data.map((course, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
                                <td>{course.CourseID}</td>
                                <td>{course.CourseName}</td>
                                <td>{course.Session}</td>
                                <td>{course.InstructorID}</td>
                                <td>{course.Description}</td>
                                <th id='example-delete-text' onClick={() => { deleteItem(course.CourseID) }}> Delete </th>
<<<<<<< HEAD
                                
=======
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
                            </tr>
                        }) : ''
                    }
                </tbody>
<<<<<<< HEAD
        
            </Table>
        </div>
=======
            </Table>
        </div>
    }

    return (
        <Navbar Title='Sample Course' content={Page}/>
>>>>>>> 8dce802537e65babcb32460885d5e8ee035dd3da
    );
}
