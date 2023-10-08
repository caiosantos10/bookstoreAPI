import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error);
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Dados fornecidos estão incorretos" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    res.status(400).json({ message: `Os seguintes erros foram encontrados: ${errorMessages}` });
  } else {
    res.status(500).json({ message:`${error} - Erro na requisição` });
  }
}

export default errorHandler;