import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { StartCourse } from './StartCourse'

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
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const tileData = [
  {

    img: "https://i.pinimg.com/236x/39/9a/42/399a42619d2ac5e1b648bd5c69d2a361.jpg",
    title: 'Home Course',

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

  return (

    <div className={classes.root}>
      <div style={{ margin: "50px " }}>
        <strong>Session</strong>
      </div>
      <GridList cellHeight={180} className={classes.gridList} cols={3} style={{ margin: "50px 200px" }} >
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
