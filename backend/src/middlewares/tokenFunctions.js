/* tokenFunctions.js  em backend/src/middlewares */
const boom = require('@hapi/boom');
const admin = require('firebase-admin');
require('dotenv').config();

const tokenFunctions = {
  /* Função que decodifica o token e verifica se o usuário está autenticado */
  decode: async (req, _res, next) => {
    let token = req.cookies['token'];

    if (!token) throw new boom.unauthorized('Token not provided');

    try {
      const decoded = await admin.auth().verifyIdToken(token);

      req.user = decoded;

      next();
    } catch (err) {
      console.log('Error when verifying token', err);
      throw new boom.unauthorized('Token is malformed');
    }
  },

  /* Função que verifica se o usuário está autenticado e se possui o papel (role) necessário para acessar a rota */
  authorize: (roles) => (req, _res, next) => {
    if (!req.user) throw boom.unauthorized('User is not authenticated');
    
    const { role } = req.user;

    if (!roles.includes(role)) throw boom.forbidden('User is not authorized');

    next();
  }
};

module.exports = tokenFunctions;
