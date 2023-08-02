const { Router } = require('express');
const loginRoute = require('./loginRoute.routes');
const logoutRoute = require('./logoutRoute.routes');
const registerRoute = require('./registerRoute.routes');
const updateRoute = require('./updateRoute.routes');

const router = Router();

router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/register', registerRoute);
router.use('/update', updateRoute);

module.exports = router;