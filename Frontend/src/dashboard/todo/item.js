import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import data from '../../Config/data'
import '../dashboard.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgb(35, 48, 68)',
    color: 'white'
  },
}));

export default function CheckboxList() {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  //const [todo,setTodo] = useState(data.todo);
  const {todo} = require('../../Config/data')

  useEffect(()=>{},[todo])

  const handleToggle = (index) => {
    // let tempTodo = todo
    // let temp = todo[index]
    // temp = {...temp, done:!temp.done}
    // tempTodo[index] = temp
    // setTodo(tempTodo)
    // setStatus(!status);
    todo[index].done = !todo[index].done
    setStatus(!status);
  };

  function styleDue(value){
    if (value < 3){
      return {color: 'rgb(253, 18, 18)',backgroundColor:'rgba(235, 178, 178, 0.15)'}
    }
    else{
      return {color: 'rgb(0, 255, 0)',backgroundColor:'rgba(140, 245, 140, 0.15)'}
    }
  }

  return (
    <List className={classes.root}>
      {todo.map((value,ind) => {
        const labelId = `checkbox-list-label-${value.text}`;

        return (
          <ListItem key={ind} role={undefined} dense button onClick={()=>{handleToggle(ind)}}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo[ind].done}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
        <ListItemText id={labelId} primary={value.text} /> <span style = {styleDue(value.due)}>&nbsp;{value.due<1?'Today' : value.due+' days'}&nbsp;</span>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon className='dashb-text'/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
