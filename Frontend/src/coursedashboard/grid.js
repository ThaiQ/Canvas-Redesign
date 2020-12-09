import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Graph from './graph'
import Card from '../components/card'
import './dashboard.css'
import Todo from './todo/todo'
import AbuCard from './card/collection'

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

    return (
        <div id='dashboard-app'>
            <Grid container spacing={4}>

                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={6}>
                        <h2 id='dashb-sub'>{`Welcome ${props.user?props.user.FirstName:''}!`}</h2>
                        <Card content={Graph}/>
                    </Grid>
                    <Grid item xs={6} spacing={10}>
                       <Todo></Todo>
                    </Grid>
                </Grid>



                <Grid container item xs={12} spacing={0}>
                    <AbuCard></AbuCard>
                </Grid>

            </Grid>
        </div>
    );
}
