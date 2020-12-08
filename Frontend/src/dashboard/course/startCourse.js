import React, { useState, useEffect } from 'react';
//import { checkLogin } from '../util/auth'
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import GridList from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import CourseHome from './CourseHome';
import '../dashboard.css'
//import Navbar from '../components/left-navbar/drawer'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        position: 'absolute',
        top: 150,
        width: 550,
        height: 450,
        right: 500,
       

        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Course = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const axios = require('axios')
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    const [courseName, setCourseName] = useState("")
    const [session, setSession] = useState("")
    const [description, setDescription] = useState("")
    const [id, setID] = useState(user.StudentID)
    async function submit() {
       
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

    }
    const [data, setData] = useState([])
    async function getDatabase() {
        let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getCourse", JSON.stringify({}))
        //save to variable above
        setData(res.data.Items)
    }
    
    const body = (
        
        <div className={classes.paper}     >
         <form className={classes.root}  Validate autoComplete="on" >
                <p> Add a Course</p>      
        <TextField
            type="email"
            variant="outlined"
            label="Course Name"    
            onChange={(event) => { setCourseName(event.target.value) }}
            required
            cursor= "pointer" />
        <TextField
            type="email"
            label="Session"
            variant="outlined"
            onChange={(event) => { setSession(event.target.value) }} />
        <TextField
            type="email"
            label="Description"
            variant="outlined"
            onChange={(event) => { setDescription(event.target.value) }} />
            <Add onClick={submit}> Submit </Add>
            <Cancel onClick={handleClose}> Cancel </Cancel>
               
         </form>
    </div>
    );

    return (
        <div>

            <Button1 variant="btn btn success" onClick={handleOpen}>Star a course</Button1>
            <Modal open={open} onClose={handleClose}>
               {body}
                {body}
            </Modal>

        </div>
    )
}


export default function StarCourse(props) {
    
    //Making sure that user is login
    const [user, setUser] = useState(null);
    useEffect(() => {
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
       // checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    }, [])
    return (
        <div>
            <Course />
        </div>
    //     <div>
    //     <Navbar title='StartCourse' content={Course}></Navbar>
    // </div>
    )
}
     

const blue = 100;
const Cancel = styled.button`
margin: 100px 120px;
background: linear-gradient(to top, rgb(${blue},200,200),white );
width: 100px; 
height: 45px;  
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 15px;
border: none;
position: absolute;
right: 170px;
cursor: pointer;
`;
const Add = styled.button`
margin: 100px 0px;
background: linear-gradient(to top, rgb(${blue},200,200),white );
width: 100px; 
height: 45px; 
height: 35px; 
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 15px;
border: none;
position: absolute;
left: 40px;
right: 170px;
cursor: pointer;
`;

const Button1 = styled.button`
margin: 30px 100px;
background: linear-gradient(to top, rgb(${blue},200,200),white );
width: 150px; //150
height: 50px; //50
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 18px;
border: none;
position: absolute;
top: 45px;
left: 0px;
cursor: pointer;
` ;