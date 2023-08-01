import React from 'react';
import VisitorsComponent from '../../components/VisitorsComponent/Visitors.component';
import Header from '../../components/Header/Header';
import DivExterna from './Style';

function Visitors() {
  return (
    <DivExterna>
      <div id="header">
        <Header />
      </div>
      <VisitorsComponent />
    </DivExterna>
  );
}

export default Visitors;
