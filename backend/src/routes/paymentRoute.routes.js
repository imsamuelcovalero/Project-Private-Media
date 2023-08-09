// File: src/routes/paymentRoute.routes.js
const { Router } = require('express');

const { processPayment } = require('../controllers/paymentController');
const { validatePayment } = require('../middlewares/validators');

const router = Router();

router.post('/', validatePayment, processPayment);

module.exports = router;