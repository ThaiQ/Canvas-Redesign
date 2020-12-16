import React, { useState, useEffect } from 'react';
import { checkLogin } from '../../util/auth'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Navbar from '../../components/left-navbar/drawer'
import CreateAsig from './CreateQuestion'
const axios = require("axios")

export default function CreateAssignment(props) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    }, [])

    return (
        <Navbar title='Create Question' content={CreateAsig} {...props}></Navbar>
    )
}
