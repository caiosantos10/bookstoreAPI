import express from "express";
import connectOnDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const connection = await connectOnDatabase();

connection.on("error", (error) => {
  console.error("Erro de conexão", error);
});

connection.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
