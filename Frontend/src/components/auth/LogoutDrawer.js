import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { checkLogin, clientId } from '../../util/auth'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function LogoutHooks(props) {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    localStorage.removeItem('user');
    //checkLogin()
    if (props.reload === true) window.location.reload(false)
    if (props.rehome === true) window.location.href = '/'
  };

  const onFailure = (err) => {
    console.log(err);
    //checkLogin()
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <ListItem onClick={signOut} className='dashb-text' button>
      <ListItemIcon><ExitToAppIcon /></ListItemIcon>
      <ListItemText primary={'Sign out'} />
    </ListItem>
  );
}