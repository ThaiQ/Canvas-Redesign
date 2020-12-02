import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { checkLogin,clientId } from '../../util/auth'
import { Button } from '@material-ui/core'
const {refreshTokenSetup} = require('../../util/refreshToken')

export default function LoginHooks(props) {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem('user', JSON.stringify(res.profileObj));
    refreshTokenSetup(res);
    //checkLogin(res)
    if (props.reload === true) window.location.reload(false)
  };

  const onFailure = (res) => {
    localStorage.setItem('user', '');
    //checkLogin()
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId : clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <Button onClick={signIn} variant="contained" color="primary">
      Sign in with Google
    </Button>
  );
}