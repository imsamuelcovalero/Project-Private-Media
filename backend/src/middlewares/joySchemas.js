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
  selectedPaymentMethod: joi.string().valid('credit_card', 'bank_transfer').required().messages({
    'string.valid': 'Método de pagamento inválido. Os métodos aceitos são credit_card e bank_transfer',
    'any.required': 'O método de pagamento é obrigatório',
  }),
  description: joi.string().required().messages({
    'string.empty': 'A descrição é obrigatória.',
    'any.required': 'A descrição é obrigatória.',
  }),
  paymentDetails: joi.object({
    token: joi.string()
      .when('selectedPaymentMethod', {
        is: 'credit_card',
        then: joi.string().required(),
      })
      .messages({
        'string.empty': 'O token do cartão é obrigatório',
        'any.required': 'O token do cartão é obrigatório',
      }),
    issuer_id: joi.string()
      .when('selectedPaymentMethod', {
        is: 'credit_card',
        then: joi.string().required(),
      }),
    payment_method_id: joi.string().required().messages({
      'string.empty': 'O ID do método de pagamento é obrigatório',
      'any.required': 'O ID do método de pagamento é obrigatório',
    }),
    transaction_amount: joi.number().positive().precision(2).required().messages({
      'number.positive': 'O valor deve ser positivo',
      'number.base': 'O valor do pagamento é obrigatório e deve ser um número',
      'any.required': 'O valor do pagamento é obrigatório',
    }),
    installments: joi.number()
      .when('selectedPaymentMethod', {
        is: 'credit_card',
        then: joi.required(),
      }),
    payer: joi.object({
      email: joi.string().email().required(),
      identification: joi.object()
        .when('selectedPaymentMethod', {
          is: 'credit_card',
          then: joi.required(),
        }),
    }).required(),
  }).required()
});

module.exports = { loginSchema, registerSchema, updateSchema, paymentSchema };