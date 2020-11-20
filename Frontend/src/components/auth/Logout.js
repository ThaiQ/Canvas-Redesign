import React from 'react';
import { useGoogleLogout}  from 'react-google-login';
import { checkLogin,clientId } from '../../util/auth'

export default function LogoutHooks() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    localStorage.setItem('user', '');
    //checkLogin()
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
    <button onClick={signOut}>
      Sign out
    </button>
  );
}