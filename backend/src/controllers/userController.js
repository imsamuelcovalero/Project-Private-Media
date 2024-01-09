// File: userController.js em backend/src/controllers
const boom = require('@hapi/boom');
const { userService } = require('../services');

/* função padrão que chama o serviço correspondente e retorna o resultado */
const handleUserRequest = (serviceFunction, status) => async (req, res, _next) => {
  const result = await serviceFunction(req.body);

  res.cookie('token', result.token, { httpOnly: true, secure: false, path: '/', maxAge: 3600000 });
  
  /* Configuração para o cookie funcionar em produção */
  // res.cookie('token', result.token, { httpOnly: true, secure: true, path: '/', maxAge: 3600000, sameSite: 'none' });

  const { token, ...rest } = result;
  return res.status(status).json(rest);
};

/* funções para realizar o login, cadastro e atualização do usuário */
const login = handleUserRequest(userService.login, 200);
const register = handleUserRequest(userService.createAndUpdateUser, 201);
const update = handleUserRequest(userService.createAndUpdateUser, 200);

/* função para realizar o logout */
const logout = async (_req, res, _next) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

/* função para verificar se o usuário está autenticado */
const verifyUser = async (req, res, _next) => {
  if (!req.user || !req.user.uid) throw boom.unauthorized('User is not authenticated');
  const { uid } = req.user;
  const result = await userService.verifyUser(uid);

  return res.status(200).json(result);
};

module.exports = {
  login,
  logout,
  register,
  verifyUser,
  update,
};
