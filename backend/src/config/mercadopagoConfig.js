/* File: src/config/mercadopagoConfig.js */
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

module.exports = mercadopago;