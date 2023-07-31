import React from 'react';
import CartComponent from '../../components/CartComponent';
import { DivExterna, CartS } from './Style';

function Cart() {
  return (
    <DivExterna>
      <CartS>
        <CartComponent />
      </CartS>
    </DivExterna>
  );
}

export default Cart;
