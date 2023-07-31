import React from 'react';
import RegisterComponent from '../../components/Register.component';
import { DivExterna, RegisterS } from './Style';

function Register() {
  return (
    <DivExterna>
      <RegisterS>
        <RegisterComponent />
      </RegisterS>
    </DivExterna>
  );
}

export default Register;
