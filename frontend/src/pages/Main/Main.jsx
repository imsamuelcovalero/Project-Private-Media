import React from 'react';
import MainComponent from '../../components/MainComponent/MainComponent';
import Header from '../../components/Header/Header';
import { DivExterna, MainS } from './Style';

function Main() {
  return (
    <DivExterna>
      <div id="header">
        <Header />
      </div>
      <MainS>
        <MainComponent />
      </MainS>
    </DivExterna>
  );
}

export default Main;
