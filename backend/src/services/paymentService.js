/* File: src/services/paymentService.js */
const mercadopago = require('mercadopago');
const admin = require('firebase-admin');
const boom = require('@hapi/boom');

console.log("Token do MercadoPago:", process.env.MERCADOPAGO_ACCESS_TOKEN);

// mercadopago.configure({
//   access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
// });

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

console.log('mercadoPago', mercadopago.payment.save);

const processPayment = async (paymentData) => {
  console.log('paymentData', paymentData);
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

/* Função que processa o pagamento com cartão de crédito */
const processCreditCardPayment = async (paymentData) => {
  const { paymentDetails, description } = paymentData;
  // console.log('description', description);

  const creditCardPaymentData = {
    description,
    three_d_secure_mode: 'optional',
    ...paymentDetails
    // transaction_amount: Number(paymentDetails.transaction_amount),
    // token: paymentDetails.token,
    // installments: Number(paymentDetails.installments),
    // payment_method_id: paymentDetails.payment_method_id,
    // issuer_id: paymentDetails.issuer_id,
    // payer: {
    //   email: paymentDetails.payer.email,
    //   identification: {
    //     type: paymentDetails.payer.identification.type,
    //     number: paymentDetails.payer.identification.number.toString()
    //   }
    // }
  };

  console.log('creditCardPaymentData', creditCardPaymentData);

  try {
    const creditCardPayment = await mercadopago.payment.save(creditCardPaymentData);
    const { status, status_detail, id } = creditCardPayment.body;
    console.log('status', status, 'status_detail', status_detail, 'id', id);
    return { status, status_detail, id };
  } catch (error) {
    console.error('Erro ao processar o pagamento com cartão de crédito:', error);
    const { errorMessage } = validateError(error);
    throw boom.internal(errorMessage);
  }
};

/* Função que atualiza a assinatura do usuário no Firestore */
const updateSubscription = async (uid) => {
  console.log('uid', uid);
  const usersCollection = admin.firestore().collection('usuários');

  const currentDate = new Date();
  const newExpiryDate = new Date();
  newExpiryDate.setMonth(currentDate.getMonth() + 1); // Adiciona 30 dias

  try {
    const snapshot = await usersCollection.where('uid', '==', uid).get();
    console.log('snapshot', snapshot);

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
  processPayment
};

