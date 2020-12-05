
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { checkLogin } from '../util/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 560,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const tileData = [
  {

    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: <a href="/home" style={{ color: "white" }} ><strong>Home</strong></a>,
  },
  {
    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: 'Module',

  },
  {
    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: 'Assignment',

  },
  {
    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: <a href="/course/People" style={{ color: "white" }} ><strong>People</strong></a>,

  },
  {
    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: 'Grades',

  },
  {
    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: 'Announcement',

  },

];

export default function TitlebarGridList() {
  const classes = useStyles();
  const axios = require('axios')
  const [data, setData] = useState([])
  async function getDatabase() {
      let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getCourse", JSON.stringify({}))
      //save to variable above
      setData(res.data.Items)
  }
  //Current user who is logging in
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');

  //Making sure that user is login
  useEffect(() => {
      checkLogin(user) //redirect user to homepage if not login
      console.log(user)
      getDatabase()
  }, [])
 
  return (

    <div className={classes.root}>
      <GridList cellHeight={280} className={classes.gridList} cols={3} style={{ margin: "100px 300px" }} >
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>

        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>

  );
}
