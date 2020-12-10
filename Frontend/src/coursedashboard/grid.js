import React, { useEffect, useState } from 'react';
import { checkLogin } from '../util/auth'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Graph from './graph'
import Card from '../components/card'
import './dashboard.css'
import Todo from './todo/todo'
import AbuCard from './card/collection'
import General from './general/general'

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

    //Making sure that user is login
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
    useEffect(() => {
        checkLogin(user) //redirect user to homepage if not login
        console.log(user)
    }, [])

    const [panel, setPanel] = useState(true)
    const [panelStyle, setPanelStyle] = useState({
        width: '60vw'
    })


    return (
        <div id='dashboard-app'>
            <Grid container spacing={4}>

                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={6}>
                        <h2 id='dashbc-sub'>{`Performance`}</h2>
                        <Card content={Graph} />
                    </Grid>
                    <Grid item xs={panel?3:4} spacing={10}>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                        <h2 id='dashbc-sub' onClick={()=>{setPanel(true)}}>General</h2>
                        <h2 id='dashbc-sub' style={{marginLeft:'2vw'}} onClick={()=>{setPanel(false)}}>Todo List</h2>
                        </div>

                    {
                        panel? <General style={panelStyle}></General> : <Todo style={panelStyle}></Todo>
                    }
                </Grid>
            </Grid>


            <Grid container item xs={12} spacing={0}>
                <AbuCard></AbuCard>
            </Grid>

            </Grid>
        </div >
    );
}
