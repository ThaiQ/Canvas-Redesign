import React, { useEffect, useState } from 'react';
import { checkLogin } from '../util/auth'
import './dashboard.css';
import { Link } from 'react-router-dom'
import Nav from '../components/left-navbar/drawer'
import Grid from './grid'
const axios = require("axios")

function App(props) {

    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [courseID, setCourseID] = useState(props.match.params.id)
    const [courseText, setCourseText] = useState('')

    useEffect(()=>{
        if (props.match.params.id!==courseID) window.location.reload(true)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
        getCourse()
    },[props.match.params.id])

    async function getCourse(){
        let body = {CourseID:courseID}
        let course = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getCourse', JSON.stringify(body))
        setCourseID(course.data.Item.CourseID)
        if (course) setCourseText(course.data.Item)
    }

    return (
        <div className="App">
            <Nav title={courseText?courseText.Description.text:''} courseID={courseID} content={Grid}></Nav>
        </div>
    );
}
export default App;
