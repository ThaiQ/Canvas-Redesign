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
    const [course, setCourse] = useState('')

    useEffect(()=>{
        if (props.match.params.id!==courseID) window.location.reload(true)
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
        getCourse()
    },[props.match.params.id])

    function getCourse(){
        let {courses} = require('../Config/data')
        setCourseID(props.match.params.id)
        let course = courses.filter(item=>item.id==courseID)
        if (course.length > 0) setCourse(course[0])
    }

    return (
        <div className="App">
            <Nav title={course.text} content={Grid}></Nav>
        </div>
    );
}
export default App;
