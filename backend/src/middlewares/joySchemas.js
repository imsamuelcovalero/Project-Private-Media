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

// esquema para pagamento
const paymentSchema = joi.object({
  userId: joi.string().required().messages({
    'string.empty': 'UserID is required',
    'any.required': 'UserID is required',
  }),
  paymentDetails: joi.object({
    token: joi.string().required().messages({
      'string.empty': 'O token do cartão é obrigatório',
      'any.required': 'O token do cartão é obrigatório',
    }),
    amount: joi.number().positive().precision(2).required().messages({
      'number.positive': 'O valor deve ser positivo',
      'number.base': 'O valor do pagamento é obrigatório e deve ser um número',
      'any.required': 'O valor do pagamento é obrigatório',
    }),
    currency: joi.string().valid('BRL').required().messages({
      'string.valid': 'Moeda inválida. A única moeda aceita é BRL',
      'any.required': 'A moeda é obrigatória',
    }),
    description: joi.string().allow('', null), // Descrição é opcional.
  }).required()
});

module.exports = { loginSchema, registerSchema, updateSchema, paymentSchema };