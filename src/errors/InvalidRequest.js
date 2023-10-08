import GenericError from "./GenericError.js";

export default class InvalidRequest extends GenericError{
  constructor(message = "Dados fornecidos estão incorretos") {
    super(message, 400);
  }
}