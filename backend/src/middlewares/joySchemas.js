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

// esquema para update
const updateSchema = joi.object({
  idToken: joi.string().required().messages({
    'string.empty': INVALID_TOKEN,
    'any.required': INVALID_TOKEN,
  }),
});

module.exports = { loginSchema, registerSchema, updateSchema };