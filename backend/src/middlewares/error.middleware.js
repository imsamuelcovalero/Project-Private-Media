/* Desc: Este arquivo contém o middleware de tratamento de erros. */

const errorMiddleware = (err, _req, res, _next) => {
  if (err.isBoom) {
    // Se for um erro do boom, você pode acessar as propriedades específicas do boom
    const boomError = err;
    console.log('boomError', boomError);

    // Aqui você pode personalizar a resposta de erro ou executar a lógica de tratamento apropriada
    res.status(boomError.output.statusCode).json({
      statusCode: boomError.output.statusCode,
      error: boomError.output.payload.error,
      message: boomError.message,
    });
  } else {
    // Se não for um erro do boom, você pode tratar como um erro genérico
    console.error('Erro:', err);
    res.status(err.status || 500).json({
      // code: err.code || 'undefinedError',
      message: err.message,
      statusCode: err.status || 500,
    });
  }
};

module.exports = errorMiddleware;