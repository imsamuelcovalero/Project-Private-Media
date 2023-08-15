/* File: src/middlewares/validators.js */
const { loginSchema, registerSchema, updateSchema, paymentSchema, paymentStatusSchema, cancelPaymentSchema } = require('./joySchemas');
/* 
Utilizamos a classe CustomError nesta função em vez de uma biblioteca externa como o @hapi/boom, devido à necessidade de personalizar os códigos de status HTTP em nossas mensagens de erro. No contexto de uma API REST, os códigos de status HTTP fornecem informações importantes sobre a natureza do erro. Por exemplo, um código de status na faixa 400 geralmente indica um erro do lado do cliente, enquanto um código na faixa 500 indica um erro no servidor.

Dessa forma, a inclusão de códigos de status em nossas mensagens de erro ajuda o cliente da API a entender o que deu errado e como corrigir o problema, além de auxiliar na depuração e registro de erros.

Portanto, a classe CustomError é utilizada aqui devido à sua flexibilidade na personalização dos códigos de status HTTP, que é uma prática comum e recomendada na criação de APIs REST.
*/
const CustomError = require('../errors/CustomError');

function validate(schema, schemaName, validationSource = "body") { 

  return (req, _res, next) => {
    console.log(`validate ${schemaName}`, req[validationSource]);

    const { error } = schema.validate(req[validationSource]);

    if (error) {
      console.log('Validator Error', error.message);
      let [status, message] = error.message.split('|');
      /* A linha abaixo garante que o status seja um número, foi criada para corrigir o erro: express deprecated res.status("400"): use res.status(400) instead src/middlewares/error.middleware.js:20:9 */
      if (!error.message.includes('|')) {
        status = 400;
        message = error.message;
      } else {
        status = isNaN(status) ? 400 : Number(status);
      }

      // Se status não for um número (ou seja, a mensagem de erro do Joi não contém '|'),
      // atribua valores padrão a status e message.
      if (isNaN(status)) {
        status = 400;
        message = error.message;
      }

      throw new CustomError(status, message);
    }

    next();
  }
}

const validators = {
  validateLogin: validate(loginSchema, "loginSchema", "body"),
  validateRegister: validate(registerSchema, "registerSchema", "body"),
  validateUpdate: validate(updateSchema, "updateSchema", "body"),
  validatePayment: validate(paymentSchema, "paymentSchema", "body"),
  validatePaymentStatus: validate(paymentStatusSchema, "paymentStatusSchema", "body"),
  validateCancelPayment: validate(cancelPaymentSchema, "cancelPaymentSchema", "params"),
};

module.exports = validators;
