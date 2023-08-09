import React from 'react';
import MainComponent from '../../components/MainComponent/Main.component';
import Header from '../../components/Header/Header';
import DivExterna from './Style';

function Main() {
  return (
    <DivExterna>
      <Header />
      <MainComponent />
    </DivExterna>
  );
}

export default Main;
