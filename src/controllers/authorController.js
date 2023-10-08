import { author } from "../models/Author.js";

export default class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
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
        res.status(404).json({ message:"Id do Autor não encontrado" });
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
      await author.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } catch(error) {
      next(error);
    }
  }
  static async deleteAuthor(req, res, next) {
    try {
      const authorFound = await author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Autor excluído com sucesso", author: authorFound });
    } catch(error) {
      next(error);
    }
  }
}