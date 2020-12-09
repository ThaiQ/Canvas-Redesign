import React from "react";
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

    const {courses} = require('../../Config/data')

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
                        courses.map((course, indx) => {
                            return <Link to={'/coursedashboard/'+course.id} key={indx}><ListItem button className={classes.nested}>
                                <ListItemIcon className='dashb-text'>
                                    <MenuBookIcon/>
                                </ListItemIcon>
                                <ListItemText className='dashb-text' primary={course.text} />
                            </ListItem></Link>
                        })
                    }
                </List>
            </Collapse>
        </List>
    );
}
