import InvalidRequest from "./InvalidRequest.js";

export default class ValidationError extends InvalidRequest {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
      
    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}