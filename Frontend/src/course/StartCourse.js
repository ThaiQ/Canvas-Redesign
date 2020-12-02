import React, { useState, useEffect, useContext } from 'react';
import { UserContext }  from './UserContext';
import { checkLogin } from '../util/auth'
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import history from './../history';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import CourseHome from './CourseHome';
import { UserProvider } from './UserContext';


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
        height: 150,
        right: 300,
 
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Course = (props) => {
const use = useContext(UserContext);    
const classes = useStyles();  
const [open, setOpen] = React.useState(false);
const handleOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};
    
const body = (
    <div className={classes.paper} >
        <form className={classes.root} Validate autoComplete="on" onChange={()=> history.push('/course/CourseHome')}>
            <TextField
                
                required 
                id="course_name"
                label="Course Name"
                variant="outlined"
                onChange={e => use.setName(e.target.value)}
                
            />
            <TextField
                id="session"
                label="Session"
                variant="outlined"
                onChange={e => use.setSession(e.target.value)}
                
            />
            <Cancel onClick={handleClose}>Cancel</Cancel>
            <Add type ="submit">Add</Add> 
           
                
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
)}


export default function StarCourse(props) {
   // const use = useContext(UserContext); 
    //Making sure that user is login
    const [user, setUser] = useState(null);
    useEffect(()=>{
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
        setUser(user)
       // checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    },[])
    return (
    
        <div> 
            <Course />
            {/* <CourseHome/> */}
        </div>
         
    
    );
}
const blue = 100;

const Cancel = styled.button`
margin: 100px 120px;
background: linear-gradient(to top, rgb(${blue},200,200),white );
width: 90px; 
height: 35px; 
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
height: 35px; 
display: inline-block;
text-align:center;
border-radius: 10px;
font-size: 15px;
border: none;
position: absolute;
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