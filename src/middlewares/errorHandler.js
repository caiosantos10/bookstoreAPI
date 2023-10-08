import mongoose from "mongoose";
import { GenericError, InvalidRequest, ValidationError, NotFoundError } from "../errors/index.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error);
  if (error instanceof mongoose.Error.CastError) {
    new InvalidRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof NotFoundError) {
    error.sendResponse(res);
  } else {
    new GenericError().sendResponse(res);
  }
}

export default errorHandler;