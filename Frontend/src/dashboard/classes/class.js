import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../dashboard.css'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        color: 'white !important'
    }
});

export default function BasicTable() {
    const classes = useStyles();

    const {courses} = require('../../Config/data')

    function navCourse(href){
        window.location.href=href
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
                    {courses.map((row, ind) => (
                        <TableRow key={ind} className='dash-class-cell' onClick={()=>{navCourse('coursedashboard/'+row.id)}}>
                            <TableCell component="th" scope="row">
                                {row.text}
                            </TableCell>
                            <TableCell align="left">{row.session}</TableCell>
                            <TableCell align="left">{row.semester}</TableCell>
                            <TableCell align="left">{row.professor}</TableCell>
                            <TableCell align="left">{row.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
