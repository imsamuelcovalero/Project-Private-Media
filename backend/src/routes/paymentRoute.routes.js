// File: src/routes/paymentRoute.routes.js
const { Router } = require('express');

const { processPayment, verifyPaymentStatus, cancelPayment } = require('../controllers/paymentController');
const { validatePayment, validatePaymentStatus, validateCancelPayment  } = require('../middlewares/validators');

const router = Router();

router.post('/', validatePayment, processPayment);
router.post('/status', validatePaymentStatus, verifyPaymentStatus);
router.patch('/cancel/:paymentId', validateCancelPayment, cancelPayment);

module.exports = router;