import GenericError from "./GenericError.js";

export default class NotFoundError extends GenericError {
  constructor(message = "Rota não encontrada") {
    super(message, 404);
  }
}