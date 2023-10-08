import NotFoundError from "../errors/notFoundError.js";

function notFoundHandler(req, res, next) {
  const error = new NotFoundError();
  next(error);
}

export default notFoundHandler;