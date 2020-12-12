import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import CreateIcon from '@material-ui/icons/Create';
import Item from './item'
import '../dashboard.css'

const useStyles = makeStyles((theme) => ({
    root: {

        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

export default function ImageGridList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                <Item></Item>
            </GridList>
        </div>
    );
}

