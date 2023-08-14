// File: src/routes/paymentRoute.routes.js
const { Router } = require('express');

const { processPayment, verifyPaymentStatus } = require('../controllers/paymentController');
const { validatePayment, validatePaymentStatus  } = require('../middlewares/validators');

const router = Router();

router.post('/', validatePayment, processPayment);
router.post('/status', validatePaymentStatus, verifyPaymentStatus);

module.exports = router;