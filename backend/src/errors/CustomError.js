/* Desc: Classe para criar erros personalizados/customizados */
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    // this.code = code;
  }
}

module.exports = CustomError;