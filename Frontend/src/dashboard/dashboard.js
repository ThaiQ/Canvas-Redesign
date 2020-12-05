import React, { useState, useEffect } from 'react';
import { checkLogin } from '../util/auth'
import './dashboard.css'
import Grid from './grid'
import Drawer from '../components/left-navbar/drawer'

const Chart = require('chart.js')

export default function Profile(props) {

    //Making sure that user is login
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    }, [])



    useEffect(() => {

    }, [])

    return (
        <div className='dashboard-app'>
            hi
            <Drawer title='Dashboard' content={Grid} user={user}/>
        </div>
    );
}
