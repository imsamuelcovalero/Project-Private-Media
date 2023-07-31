// File: userController.js em backend/src/controllers
const boom = require('@hapi/boom');
const userService = require('../services/userService');

// const tokenFunctions = require('../middlewares/tokenFunctions');

const login = async (req, res, _next) => {
  // console.log('login', req.body);
  const result = await userService.login(req.body);

  // Definindo o token no cookie httpOnly
  // console.log('token', result.token);
  res.cookie('token', result.token, { httpOnly: true, secure: false, path: '/', maxAge: 3600000 });

  const { token, ...rest } = result;
  return res.status(200).json(rest);
};

const logout = async (_req, res, _next) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

const register = async (req, res, _next) => {
  console.log('registerController', req.body);
  // const { name, username, email } = req.body;
  const result = await userService.createNewUser(req.body);
  
   // Definindo o token no cookie httpOnly
  // console.log('token', result.token);
  res.cookie('token', result.token, { httpOnly: true, secure: false, path: '/', maxAge: 3600000 });

  const { token, ...rest } = result;
  return res.status(201).json(rest);
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
};
