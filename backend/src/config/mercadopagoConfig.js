/* File: src/config/mercadopagoConfig.js */
const mercadopago = require('mercadopago');

console.log("Token do MercadoPago:", process.env.MERCADOPAGO_ACCESS_TOKEN);

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

module.exports = mercadopago;