/* File: src/services/paymentService.js */
const mercadopago = require('mercadopago');
const admin = require('firebase-admin');
const boom = require('@hapi/boom');
const { addDays } = require('date-fns');

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

/* função para processar o pagamento */
const processPayment = async (paymentData) => {
  console.log('paymentData', paymentData);
  let payment;
  
  switch(paymentData.selectedPaymentMethod) {
    case 'bank_transfer':  // No caso de Pix
      payment = await processPixPayment(paymentData);
      break;
    case 'credit_card':  // No caso de cartão de crédito
      payment = await processCreditCardPayment(paymentData);
      break;
    default:
      throw boom.badRequest('Método de pagamento inválido.');
  }
  
  if (!payment) {
    throw boom.internal('Erro ao processar o pagamento.');
  }

  return payment;
};

/* função para validar e visualizar melhor os errors do MercadoPago */
function validateError(error) {
  let errorMessage = 'Unknown error cause';
  let errorStatus = 400;

  if(error.cause && Array.isArray(error.cause) && error.cause[0] && error.cause[0].description) {
    errorMessage = error.cause[0].description;
  }
  
  if(error.status) {
    errorStatus = error.status;
  }

  console.log('errorMessage', errorMessage, 'errorStatus', errorStatus);

  return { errorMessage, errorStatus };
}

/* função para processar oa primeira etapa do pagamento com pix */
const processPixPayment = async (paymentData) => {
  console.log('processPixPayment', paymentData);
  const { transaction_amount, payment_method_id, payer } = paymentData.paymentDetails;
  const { external_reference } = paymentData;

  const pixPaymentData = {
    transaction_amount,
    payment_method_id,
    payer,
    external_reference,
  };
  
  try {
    const pixPayment = await mercadopago.payment.create(pixPaymentData);
    
    const { status, status_detail, id, point_of_interaction, external_reference } = pixPayment.body;
    const transaction_data = point_of_interaction.transaction_data;

    return { status, status_detail, id, transaction_data, external_reference };
  } catch (error) {
    console.error('Erro ao processar o pagamento com Pix:', error);
    const { errorMessage } = validateError(error);
    throw boom.internal(errorMessage);
  }
};

/* Função que processa o pagamento com cartão de crédito */
const processCreditCardPayment = async (paymentData) => {
  const { paymentDetails, description, external_reference } = paymentData;

  const creditCardPaymentData = {
    description,
    three_d_secure_mode: 'optional',
    external_reference,
    ...paymentDetails
  };

  try {
    const creditCardPayment = await mercadopago.payment.save(creditCardPaymentData);
    const { status, status_detail, id } = creditCardPayment.body;

    if (status === 'approved') {
      await updateSubscription(paymentData.userId);
    }

    return { status, status_detail, id };
  } catch (error) {
    console.error('Erro ao processar o pagamento com cartão de crédito:', error);
    const { errorMessage } = validateError(error);
    throw boom.internal(errorMessage);
  }
};

/* Função que verifica o status do pagamento */
const verifyPaymentStatus = async (transactionData) => {
  const { paymentId } = transactionData;
  
  try {
    const payment = await mercadopago.payment.findById(paymentId);

    const { status, status_detail } = payment.body;
    console.log('status', status, 'status_detail', status_detail);
    
    if (status === 'approved') {
      await updateSubscription(transactionData.userId);
    }

    return { status, status_detail, id: paymentId };

  } catch (error) {
    console.error('Erro ao verificar o status do pagamento:', error);
    const { errorMessage } = validateError(error);
    throw boom.internal(errorMessage);
  }
};

/* Função que cancela o pagamento */
const cancelPayment = async (paymentId) => {
  try {
    const payment = await mercadopago.payment.cancel(paymentId);
    const { status, status_detail } = payment.body;

    return { status, status_detail, id: paymentId };
  } catch (error) {
    console.error('Erro ao cancelar o pagamento:', error);
    const { errorMessage } = validateError(error);
    throw boom.internal(errorMessage);
  }
};

/* Função que atualiza a assinatura do usuário no Firestore */
const updateSubscription = async (uid) => {
  console.log('uid', uid);
  const usersCollection = admin.firestore().collection('usuários');

  const currentDate = new Date();
  const newExpiryDate = addDays(currentDate, 30); // Adiciona exatos 30 dias

  try {
    const snapshot = await usersCollection.where('uid', '==', uid).get();

    if (snapshot.empty) {
      console.log("Documento não existe.");
      throw boom.notFound('Usuário não encontrado');
    }

    let userDocRef;
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      userDocRef = doc.ref;
    });

    await userDocRef.update({
        assinaturaAtiva: true,
        dataExpiracaoAssinatura: newExpiryDate
    });

  } catch (error) {
      throw boom.internal('Erro ao atualizar a assinatura do usuário. Contacte um administrador', error);
  }
};

module.exports = {
  processPayment,
  verifyPaymentStatus,
  cancelPayment,
};

