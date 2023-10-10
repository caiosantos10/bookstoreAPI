import express from "express";
import BookController from "../controllers/bookController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/books", BookController.listBooks, pagination);
routes.get("/books/search", BookController.listBookByQuery, pagination);
routes.get("/books/:id", BookController.listBookById, pagination);
routes.post("/books", BookController.bookRegister);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;