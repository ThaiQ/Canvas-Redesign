import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { checkLogin,clientId } from '../../util/auth'
const {refreshTokenSetup} = require('../../util/refreshToken')

export default function LoginHooks(props) {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem('user', JSON.stringify(res.profileObj));
    refreshTokenSetup(res);
    //checkLogin(res)
    //if (props.location === 'home') window.location.reload(false)
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
    <button onClick={signIn} className="button">
      Sign in with Google
    </button>
  );
}