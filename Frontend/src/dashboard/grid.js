import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from './graph'
import './dashboard.css'
import Card from './card'
import Todo from './todo/todo'
import Table from './classes/class'
import General from './general/general'
import CreateIcon from '@material-ui/icons/Create';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid(props) {
    const classes = useStyles();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [des, setDes] = useState('')
    const [name, setName] = useState()
    const [abbre, setAbbre] = useState()
    const [session, setSession] = useState()
    const [day, setDay] = useState()
    const [semester, setSems] = useState()

    function handleDes(event) {
        setDes(event.target.value)
    }
    function handleName(event) {
        setName(event.target.value)
    }
    function handleAbbre(event) {
        setAbbre(event.target.value)
    }
    function handleSession(event) {
        setSession(event.target.value)
    }
    function handleDday(event) {
        setDay(event.target.value)
    }
    function handleSem(event) {
        setSems(event.target.value)
    }

    async function putCourse() {
        if (!(name || abbre || session || day || semester)) {
            alert('Please fill in the fields')
            return 
        }

        const body = {
            CourseName: name,
            Description: {
                text: abbre,
                semester: semester,
                professor: props.user.Name,
                time: day,
                description: des
            },
            Session: session?session:1,
            InstructorID: props.user.StudentID,
            People: [props.user.StudentID],
            Grade: [],
            Section: []
        }

        await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", JSON.stringify(body))
        toggle()
        window.location.reload(true)
    }

    return (
        <div id='dashboard-app'>
            <Grid style={{ paddingLeft: '2vw' }} container spacing={4}>

                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={6}>
                        <h2 id='dashb-sub'>{`Welcome ${props.user ? props.user.FirstName : ''}!`}</h2>
                        <Card content={Graph} />
                    </Grid>
                    <Grid style={{ paddingLeft: '4vw' }} item xs={6} spacing={10}>
                        <Todo />
                    </Grid>
                </Grid>



                <Grid container item xs={8} spacing={0}>
                    <h2 id='dashb-sub'>Class {props.user && props.user.AccessLevel === 'Teacher'? <CreateIcon id='dash-todo' onClick={toggle} />:''}</h2>
                    <Table></Table>
                </Grid>

                <Grid container item xs={4} spacing={0}>
                    <div><General></General></div>
                </Grid>

            </Grid>

            <div>
                <Modal className='darkmodal' isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Creating a new Course!</ModalHeader>
                    <ModalBody>
                        <h3>Full Course Name</h3>
                        <Input placeholder='Course Name, ex: Software Engineer II' onChange={handleName} />
                        <h3>Abbreviation Course Name</h3>
                        <Input placeholder='Abbreviation, ex: CMPE133' onChange={handleAbbre} />
                        <h3>Session</h3>
                        <Input placeholder='Session' onChange={handleSession} />
                        <h3>Semester</h3>
                        <Input placeholder='Semester' onChange={handleSem} />
                        <h3>Day of Lecture</h3>
                        <Input placeholder='Time' onChange={handleDday} />
                        <h3>Description (Optional)</h3>
                        <Input placeholder='Description' onChange={handleDes} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={putCourse}>Create</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}
