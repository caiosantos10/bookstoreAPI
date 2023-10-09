import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", BookController.listBooks);
routes.get("/books/search", BookController.listBookByQuery);
routes.get("/books/:id", BookController.listBookById);
routes.post("/books", BookController.bookRegister);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;