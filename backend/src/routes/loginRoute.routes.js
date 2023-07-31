// login route
const { Router } = require('express');


const { login, verifyUser } = require('../controllers/userController');
const { validateLogin } = require('../middlewares/validators');
const { decode } = require('../middlewares/tokenFunctions');

const router = Router();


router.post('/', validateLogin, login);
// Rota para verificar a autenticidade do usuário
router.get('/me', decode, verifyUser);

module.exports = router;
