import React from 'react';
import { useGoogleLogout}  from 'react-google-login';
import { checkLogin,clientId } from '../../util/auth'
import { Button } from '@material-ui/core'

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
    <Button onClick={signOut} variant="contained" color="secondary">
      Sign out
    </Button>
  );
}