import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dropdown from './dropdown'
import AnnouncementIcon from '@material-ui/icons/Announcement';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Logout from '../auth/LogoutDrawer'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const categories = [
    {
      text: 'Announcements',
      icon: AnnouncementIcon,
      href: '/dashboard'
    },
    {
      text: 'Calendar',
      icon: EventIcon,
      href: '/dashboard'
    },
    {
      text: 'Groups',
      icon: PeopleIcon,
      href: '/dashboard'
    },
    {
      text: 'Mailing',
      icon: MailIcon,
      href: '/dashboard'
    },
    {
      text: 'Help',
      icon: HelpIcon,
      href: '/dashboard'
    },
  ]

  function navigateTo(url) {
    if (url === '' || !url || url === ' ') {
      return;
    }
    else {
      window.location.href = url
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}><h2 id='dashb-draw-title'>RE:Canvas</h2></div>
      <Divider />
      <List>

        <Link className='drawer-link' to='/dashboard'>
          <ListItem className='dashb-text' button>
            <ListItemIcon><HomeIcon /> </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
        </Link>

        <Link to='/profile' className='drawer-link'>
          <ListItem className='dashb-text' button>
            <ListItemIcon><AccountBoxIcon /> </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>
        </Link>

        <Dropdown />
      </List>
      <Divider />
      <List>
        {categories.map((category, index) => (
          <Link to={category.href} className='drawer-link'>
            <ListItem className='dashb-text' button key={index}>
              <ListItemIcon><category.icon /></ListItemIcon>
              <ListItemText primary={category.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Logout rehome={true}/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root + ' dashboard-home'}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.content ? <props.content user={props.user} /> : ''}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
