import { author } from "../models/index.js";
import NotFoundError from "../errors/notFoundError.js";

export default class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const authors = author.find({});
      req.result = authors;
      next();
    } catch(error) {
      next(error);
    }
  }
  static async listAuthorById(req, res, next) {
    try {
      const authorFound = await author.findById(req.params.id);
      if (authorFound) {
        res.status(200).json(authorFound);
      } else {
        next(new NotFoundError("Autor não encontrado"));
      }
    } catch(error) {
      next(error);
    }
  }
  static async authorRegister(req, res, next) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(200).json({ message: "Autor criado com sucesso", author: newAuthor });
    } catch(error) {
      next(error);
    }
  }
  static async updateAuthor(req, res, next) {
    try {
      const foundAuthor = await author.findByIdAndUpdate(req.params.id, req.body);
      if (foundAuthor){
        res.status(200).json({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NotFoundError("Autor não encontrado"));
      }
    } catch(error) {
      next(error);
    }
  }
  static async deleteAuthor(req, res, next) {
    try {
      const foundAuthor = await author.findByIdAndDelete(req.params.id);
      if (foundAuthor){
        res.status(200).json({ message: "Autor excluído com sucesso", author: foundAuthor });
      } else {
        next(new NotFoundError("Autor não encontrado"));
      }
    } catch(error) {
      next(error);
    }
  }
}