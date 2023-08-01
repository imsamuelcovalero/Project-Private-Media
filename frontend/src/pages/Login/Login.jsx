import React from 'react';
import LoginComponent from '../../components/LoginComponent/Login.component';
import DivExterna from './Style';
// import Logo from '../../images/logo.png';

function Login() {
  return (
    <DivExterna>
      {/* <img id="logo" src={ Logo } alt="Logo" /> */}
      <LoginComponent />
      {/* <LoginS>

      </LoginS> */}
    </DivExterna>
  );
}

export default Login;
