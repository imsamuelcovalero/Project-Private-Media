/* File: src/controllers/paymentController.js */
const { paymentService } = require('../services');

const processPayment = async (req, res, _next) => {
  // console.log('paymentController.processPayment', req.body);
  const result = await paymentService.processPayment(req.body);
  
  return res.status(200).json(result);
};

module.exports = {
  processPayment,
};