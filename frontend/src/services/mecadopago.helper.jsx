/* File: src/services/mecadopago.helper.jsx */
const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;

// Inicializa o MercadoPago
const initializeMercadoPago = () => {
  window.Mercadopago.setPublishableKey(MERCADOPAGO_PUBLIC_KEY);
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
