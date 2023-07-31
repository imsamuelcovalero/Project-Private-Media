/* File: src/routes/registerRoute.routes.js */
const { Router } = require('express');

const { register } = require('../controllers/userController');
const { validateRegister } = require('../middlewares/validators');

const router = Router();

router.post('/', validateRegister, register);

module.exports = router;