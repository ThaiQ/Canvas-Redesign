import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from './graph'
import './dashboard.css'
import Card from './card'
import Todo from './todo/todo'
import Table from './classes/class'
import General from './general/general'
import Course from './course/addCourse'

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

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={1}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div id='dashboard-app'>
            <Grid style={{paddingLeft:'2vw'}} container spacing={4}>

                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={6}>
                        <h2 id='dashb-sub'>{`Welcome ${props.user ? props.user.FirstName : ''}!`}</h2>
                        <Card content={Graph} />
                       
                    </Grid>
                    <Grid style={{paddingLeft:'4vw'}} item xs={6} spacing={10}>
                        <Todo />

                    </Grid>
                </Grid>
               
                <Grid container item xs={8} spacing={0}>
                    <h2 id='dashb-sub'>Class</h2>
                    <Table></Table>
                </Grid>
                <Grid container item xs={4} spacing={0}>
                    <div><General></General>
                        <p></p>
                        <div><Course/></div>
                    </div>
                   
                </Grid>
            </Grid>
                
        </div>
    );
}
