import React from 'react';
import VisitorsComponent from '../../components/VisitorsComponent/Visitors.component';
import Header from '../../components/Header/Header';
import { DivExterna, MainS } from './Style';

function Main() {
  return (
    <DivExterna>
      <div id="header">
        <Header />
      </div>
      <MainS>
        <VisitorsComponent />
      </MainS>
    </DivExterna>
  );
}

export default Main;
