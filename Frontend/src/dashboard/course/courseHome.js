
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Navbar from '../../components/left-navbar/drawer'

const useStyles = makeStyles((theme) => ({
  root: {
   
    display: 'flex',
    justifyContent: 'space-around',
   
   // margin: theme.spacing(0),
  },
  gridList: {
    width: 800,
    height: 650,
    padding: theme.spacing(4, 5,),
    
   
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const tileData = [
  {

    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: <a href="/home" style={{ color: "white" }} ><strong>Setting</strong></a>,
   
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
    title: <a href="/course/Peo" style={{ color: "white" }} ><strong>People</strong></a>,

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
  function HomeCourse() {
    return <div className={classes.root}  >
      <GridList cellHeight={300} cols={3} className={classes.gridList}  >
      
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  }
  return(
      <Navbar Title=' Course Home' content={HomeCourse} />
      
  );
}
