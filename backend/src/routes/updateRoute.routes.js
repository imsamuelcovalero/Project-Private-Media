/* File: src/routes/registerRoute.routes.js */
const { Router } = require('express');

const { update } = require('../controllers/userController');
const { validateUpdate } = require('../middlewares/validators');

const router = Router();

router.post('/', validateUpdate, update);

module.exports = router;