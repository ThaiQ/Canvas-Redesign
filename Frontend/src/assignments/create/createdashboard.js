import React, { useState, useEffect } from 'react';
import { checkLogin } from '../../util/auth'
import './CreateAssignment.css';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Navbar from '../../components/left-navbar/drawer'
import CreateAsig from './CreateAssignment'
const axios = require("axios")

export default function CreateAssignment() {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    }, [])

    return (
        <Navbar title='Create Assignment' content={CreateAsig}></Navbar>
    )
}
