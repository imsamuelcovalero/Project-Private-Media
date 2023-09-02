/* File: src/controllers/paymentController.js */
const { paymentService } = require('../services');

/* função para processar o pagamento */
const processPayment = async (req, res, _next) => {
  const result = await paymentService.processPayment(req.body);
  
  return res.status(200).json(result);
};

/* função para verificar o status do pagamento */
const verifyPaymentStatus = async (req, res, _next) => {
  const result = await paymentService.verifyPaymentStatus(req.body);
  
  return res.status(200).json(result);
};

/* função para cancelar o pagamento */
const cancelPayment = async (req, res, _next) => {
  const paymentId = req.params.paymentId;
  const result = await paymentService.cancelPayment(paymentId);

  return res.status(200).json(result);
};

module.exports = {
  processPayment,
  verifyPaymentStatus,
  cancelPayment,
};