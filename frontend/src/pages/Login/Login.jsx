import React from 'react';
import LoginComponent from '../../components/Login.component';
import { DivExterna, LoginS } from './Style';
// import Logo from '../../images/pinacolada app.png';

function Login() {
  return (
    <DivExterna>
      <LoginS>
        {/* <img id="logo" src={ Logo } alt="Logo" /> */}
        <LoginComponent />
      </LoginS>
    </DivExterna>
  );
}

export default Login;
