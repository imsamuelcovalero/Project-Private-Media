/* joySchemas.js */
const joi = require('joi');

const INVALID_TOKEN = '400|O token é necessário';

// esquema para login
const loginSchema = joi.object({
  idToken: joi.string().required().messages({
    'string.empty': INVALID_TOKEN,
    'any.required': INVALID_TOKEN,
  }),
});

// esquema para registro
const registerSchema = joi.object({
  idToken: joi.string().required().messages({
    'string.empty': INVALID_TOKEN,
    'any.required': INVALID_TOKEN,
  }),
});

// esquema para verificar se o usuário existe
// const checkUserSchema = joi.object({
//   email: joi.string().email().required().messages({
//     'string.empty': ALL_FIELDS_MUST_BE_FILLED,
//     'string.email': INVALID_EMAIL,
//     'any.required': '400|Email deve existir',
//   }),
// });

module.exports = { loginSchema, registerSchema };