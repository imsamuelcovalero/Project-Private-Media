// File: userController.js em backend/src/controllers
const boom = require('@hapi/boom');
const userService = require('../services/userService');

// const tokenFunctions = require('../middlewares/tokenFunctions');

const handleUserRequest = (serviceFunction, status) => async (req, res, _next) => {
  const result = await serviceFunction(req.body);

  res.cookie('token', result.token, { httpOnly: true, secure: false, path: '/', maxAge: 3600000 });

  const { token, ...rest } = result;
  return res.status(status).json(rest);
};

const login = handleUserRequest(userService.login, 200);
const register = handleUserRequest(userService.createAndUpdateUser, 201);
const update = handleUserRequest(userService.createAndUpdateUser, 200);

const logout = async (_req, res, _next) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

const verifyUser = async (req, res, _next) => {
  if (!req.user || !req.user.uid) throw boom.unauthorized('User is not authenticated');
  // console.log('verifyUser', req.user);
  const { uid } = req.user;
  // console.log('id', id);
  const result = await userService.verifyUser(uid);
  console.log('result', result);

  return res.status(200).json(result);
};

module.exports = {
  login,
  logout,
  register,
  verifyUser,
  update,
};
