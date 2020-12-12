import React,{useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Link } from 'react-router-dom'
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ClassIcon from '@material-ui/icons/Class';
import './dashboard.css'

const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem className='dashb-text' button onClick={handleClick}>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        courses?courses.map((course, indx) => {
                            return <Link to={'/coursedashboard/'+course.CourseID} key={indx}><ListItem button className={classes.nested}>
                                <ListItemIcon className='dashb-text'>
                                    <MenuBookIcon/>
                                </ListItemIcon>
                                <ListItemText className='dashb-text' primary={course.Description.text} />
                            </ListItem></Link>
                        }):''
                    }
                </List>
            </Collapse>
        </List>
    );
}
