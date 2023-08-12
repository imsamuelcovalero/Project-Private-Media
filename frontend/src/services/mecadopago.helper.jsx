/* File: src/services/mecadopago.helper.jsx */
import { initMercadoPago } from '@mercadopago/sdk-react';

const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;

// Inicializa o MercadoPago
const initializeMercadoPago = () => {
  initMercadoPago(MERCADOPAGO_PUBLIC_KEY);
  console.log('window', window.paymentBrickController);
};

// Função para obter um token para um cartão
const getCardToken = async (cardInfo) => new Promise((resolve, reject) => {
  window.Mercadopago.createToken(cardInfo, (status, response) => {
    if (status !== 200 && status !== 201) {
      reject(response);
    } else {
      resolve(response.id);
    }
  });
});

export { initializeMercadoPago, getCardToken };
