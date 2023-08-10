import React from 'react';
import SubscriptionComponent from '../../components/SubscriptionComponent/Subscription.component';
import Header from '../../components/Header/Header';
import DivExterna from './Style';

function Subscription() {
  console.log('Subscription');
  return (
    <DivExterna>
      <Header />
      <SubscriptionComponent />
    </DivExterna>
  );
}

export default Subscription;
