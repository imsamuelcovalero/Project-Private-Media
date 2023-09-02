/* File: src/services/mecadopago.helper.jsx */
import { initMercadoPago } from '@mercadopago/sdk-react';

const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;

/* Inicializa o MercadoPago */
const initializeMercadoPago = () => {
  initMercadoPago(MERCADOPAGO_PUBLIC_KEY, {
    locale: 'en-US',
  });
};

export default initializeMercadoPago;
