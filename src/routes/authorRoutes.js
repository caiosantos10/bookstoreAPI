import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/authors", AuthorController.listAuthors, pagination);
routes.get("/authors/:id", AuthorController.listAuthorById);
routes.post("/authors", AuthorController.authorRegister);
routes.put("/authors/:id", AuthorController.updateAuthor);
routes.delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;