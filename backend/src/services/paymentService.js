/* File: src/services/paymentService.js */
const mercadopago = require('../config/mercadopagoConfig');
const admin = require('firebase-admin');
const boom = require('@hapi/boom');

const processPayment = async (paymentData) => {
  let payment;
  
  switch(paymentData.selectedPaymentMethod) {
    case 'bank_transfer':  // No caso de Pix
      payment = await processPixPayment(paymentData);
      break;
    case 'credit_card':  // No caso de cartão de crédito, a implementação pode ser feita depois
      payment = await processCreditCardPayment(paymentData);
      break;
    default:
      throw boom.badRequest('Método de pagamento inválido.');
  }
  
  if (!payment) {
    throw boom.internal('Erro ao processar o pagamento.');
  }

  if (payment.status === 'approved') {
    await updateSubscription(paymentData.userId);
  }

  return payment;
};

const processPixPayment = async (paymentData) => {
  // Extraia os detalhes necessários de paymentData
  const { transaction_amount, payment_method_id, payer } = paymentData.paymentDetails;

  const pixPaymentData = {
    transaction_amount,
    payment_method_id,
    payer
  };

  // Use a SDK do Mercado Pago para criar o pagamento
  const pixPayment = await mercadopago.payment.create(pixPaymentData);

  return pixPayment;
};

// Você pode implementar processCreditCardPayment depois
const processCreditCardPayment = async (paymentData) => {
  // Implementação do processamento de pagamento com cartão de crédito
};

const updateSubscription = async (uid) => {
  const usersCollection = admin.firestore().collection('usuarios');
  const currentDate = new Date();
  const newExpiryDate = new Date();
  newExpiryDate.setMonth(currentDate.getMonth() + 1); // Adiciona 30 dias

  try {
      await usersCollection.doc(uid).update({
          assinaturaAtiva: true,
          dataExpiracaoAssinatura: newExpiryDate
      });
  } catch (error) {
      throw boom.internal('Erro ao atualizar a assinatura do usuário. Contacte um administrador', error);
  }
};

module.exports = {
  processPayment
};

