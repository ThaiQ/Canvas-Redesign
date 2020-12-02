import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import history from './../history';
import { StartCourse } from './StartCourse'
import { UserProvider } from './UserContext';

import image from './img/green.jpg';
import image1 from './img/sunflower.jpg';
import image2 from './img/images.jpeg';


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


// const handleSubmit = e => {
//   history.push('/course/People')
// }
 

const tileData = [
  {
    
        img: image,
        title: 'Home Course',
       
  },
  {
    img: image1,
    title: 'Module',
  
  },
  {
    img: image2,
    title: 'Assignment',
   
  },
  {
    img: image,
    title: <a href="/course/People"style={{ color: "white"}} ><strong>People</strong></a>,
    
  },
  {
    img: image2,
    title: 'Grades',
  
  },
  {
    img: image,
    title: 'Announcement',
   
},

  ];
export default function TitlebarGridList() {
  const classes = useStyles();
  const use = useContext(UserContext);
  return (
   
    <div className={classes.root}>
      <div style={{ margin: "50px " }}>
       <strong>{use.name} Session {use.session}</strong>
      </div>
      <GridList cellHeight={180} className={classes.gridList} cols={3} style={{ margin: "50px 200px" }} >
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          {/* <ListSubheader component="div"><strong>{use.name} Session {use.session}</strong></ListSubheader> */}
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title}/>
          </GridListTile>
        ))}
      </GridList>
      </div>
      
  );
}
