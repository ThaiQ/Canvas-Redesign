import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../dashboard.css'

const axios = require('axios')

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        color: 'white !important'
    }
});

export default function BasicTable() {
    const classes = useStyles();

    useEffect(()=>{
        getCourses()
    },[])

    const [courses, setCourses] = useState('')

    function navCourse(href){
        window.location.href=href
    }

    async function getCourses(){
        let courses = await axios.post('https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getCourse', JSON.stringify({}))
        setCourses(courses.data.Items)
    }

    return (
        <TableContainer id='dash-table' component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell align="left">Session</TableCell>
                        <TableCell align="left">Semester</TableCell>
                        <TableCell align="left">Professor</TableCell>
                        <TableCell align="left">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses?courses.map((row, ind) => (
                        <TableRow key={ind} className='dash-class-cell' onClick={()=>{navCourse('coursedashboard/'+row.CourseID)}}>
                            <TableCell component="th" scope="row">
                                {row.Description.text}
                            </TableCell>
                            <TableCell align="left">{row.Session}</TableCell>
                            <TableCell align="left">{row.Description.semester}</TableCell>
                            <TableCell align="left">{row.Description.professor}</TableCell>
                            <TableCell align="left">{row.Description.time}</TableCell>
                        </TableRow>
                    )):''}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
