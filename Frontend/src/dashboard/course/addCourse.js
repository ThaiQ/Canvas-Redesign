import React, { useState, useEffect } from 'react';
//import { checkLogin } from '../util/auth'
import styled from '@emotion/styled';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '45ch',
            
        },
    },
    paper: {
        position: 'absolute',
        top: 150,
        width: 550,
        height: 450,
        right: 500,
        color: 'darkblue',
        backgroundColor: 'whiteSmoke',
        //backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 20),
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
   
    async function submit(e) {
        e.preventDefault()
        let objectToSave = {
            CourseName: courseName,
            Description: description,
            Session: session,
            InstructorID: id
        }
        //save data to databse (on aws)
        await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/putCourse", JSON.stringify(objectToSave))
        //reupdate current board
        window.location.href = '/course/courseHome'
    
       
    }
    
    const body = (
        
        <div className={classes.paper} style ={{borderColor:"lightblue", borderStyle: 'solid'}}  >
            <form className={classes.root} Validate autoComplete="on" style={{
                borderColor: "lightblue",
                borderStyle: 'solid', width: '500px', height: '400px'
            }}>
            
                <h2> Add New Course</h2>   
        <TextField
            variant="outlined"
            type="text"
            label="Course Name(required)"    
            onChange={(event) => { setCourseName(event.target.value) }}
            required
            cursor= "pointer" />
        <TextField
            type="number"
            label="Session"
            variant="outlined"
                //onChange={(event) => { setSession(event.target.value) }} 
                />
        <TextField
           // type="text"
            label="Description"
            variant="outlined"
            multiline="true"
            />
            {/* onChange={(event) => { setDescription(event.target.value) }}  */}
          
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
            </Modal>

        </div>
    )
}


export default Course;
 
     
const white = 0;
const blue = 300;
const Cancel = styled.button`
margin: 100px 50px;
background: linear-gradient(to top, rgb(${white}, 200, 200),white );
width: 140px; 
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
background: linear-gradient(to top, rgb(${white},200,200),white);
width: 140px; 
height: 45px; 
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
background: linear-gradient(to top, rgb(${blue},200,200),white );
width: 160px; 
height: 50px; 
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 18px;
border: none;
cursor: pointer;
` ;