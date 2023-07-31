// logout route
const { Router } = require('express');

const { logout } = require('../controllers/userController');

const router = Router();

router.get('/', logout);

module.exports = router;
