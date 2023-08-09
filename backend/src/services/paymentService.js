/* File: src/services/paymentService.js */
const mercadopago = require('../config/mercadopagoConfig');
const admin = require('firebase-admin');
const boom = require('@hapi/boom');

const processPayment = async (paymentData) => {
  const payment = await mercadopago.payment.save(paymentData);

  if (!payment) {
      throw boom.internal('Erro ao processar o pagamento.');
  }

  if (payment.status === 'approved') {
      await updateSubscription(paymentData.userId);
  }

  return payment;
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

