import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Dados fornecidos estão incorretos" });
  } else {
    res.status(500).json({ message:`${error} - Erro na requisição` });
  }
}

export default errorHandler;