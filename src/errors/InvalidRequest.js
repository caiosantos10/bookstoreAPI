import GenericError from "./GenericError.js";

export default class InvalidRequest extends GenericError{
  constructor(message = "Um ou mais dados fornecidos estão incorretos") {
    super(message, 400);
  }
}