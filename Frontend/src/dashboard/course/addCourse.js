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
        width: 650,
        height: 550,
        right: 400,
        color: 'white',
        backgroundColor: 'rgb(35, 48, 68)',
        //backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 3, 20),
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
        
        <div className={classes.paper}  >
         <p>     
         </p>
         <h2 style={{ textAlign: 'center' }}> Add New Course</h2> 
            <form className={classes.root} Validate autoComplete="on"style={{ textAlign: 'center'}} >    
        <TextField
         defaultValue="Course Name"
        required
        className={classes.input}
        InputProps={{ className: classes.input }}   
        variant="outlined"
        type="text"
        label="Course Name(required)"    
        onChange={(event) => { setCourseName(event.target.value) }}  
        />
        <TextField
            className={classes.input}
            InputProps={{ className: classes.input }} 
            defaultValue="Session"
            //type="number"
            label="Session"
            variant="outlined"
           // onChange={(event) => { setSession(event.target.value) }} 
                />
        <TextField
           className={classes.input}
           InputProps={{ className: classes.input }} 
           defaultValue="Description"
            label="Description"
            variant="outlined"
            multiline="true"
           // onChange={(event) => { setDescription(event.target.value) }}  
            />
                </form>
           <Grid>
            <Add onClick={submit}> Submit </Add>
            <Cancel onClick={handleClose}> Cancel </Cancel>
            </Grid>
    </div>
    );

    return (
        <div>
            <Button1 style={{fontColor:'white'}} onClick={handleOpen}>Star a course</Button1>
            <Modal open={open} onClose={handleClose}>
               {body}  
            </Modal>

        </div>
    )
}


export default Course;
 
     
const white = 110;
const Cancel = styled.button`
margin: 50px 50px;
background: linear-gradient(to bottom, rgb(${white}, 173, 191),darkblue );
width: 140px; 
height: 45px;  
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 15px;
border: none;
position: absolute;
right: 35px;
color:white;
cursor: pointer;
`;

const Add = styled.button`
margin: 50px 0px;
background: linear-gradient(to bottom, rgb(${white}, 173, 191),darkblue);
width: 140px; 
height: 45px; 
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 15px;
border: none;
position: absolute;
right: 250px;
color:white;
cursor: pointer;
`;

const Button1 = styled.button`

background: linear-gradient(to bottom, rgb(${white}, 173, 191),darkblue );
width: 160px; 
height: 50px; 
display: inline-block;
text-align:center;
color:white;
border-radius: 20px 5px 20px 0px;
font-size: 18px;
border: none;
cursor: pointer;

` ;
