import book from "../models/Book.js";
import { author } from "../models/Author.js";

export default class BookController {
    
  static async listBooks(req, res, next) {
    try {
      const booksList = await book.find({});
      res.status(200).json(booksList);
    } catch(error) {
      next(error);
    }
  }

  static async listBookByPublisher(req, res, next) { 
    try {
      const books = await book.find({ publisher : req.query.publisher });
      res.status(200).json({ books });
    } catch(error) {
      next(error);
    }
  }

  static async listBookById(req, res, next) {
    try {
      const bookFound = await book.findById(req.params.id);
      res.status(200).json(bookFound);
    } catch(error) {
      next(error);
    }
  }

  static async bookRegister(req, res, next) {
    const body = req.body;
    const authorFound = await author.findById(body.author);
    try {
      const newBook = await book.create({ ...body, author: authorFound });
      res.status(201).json({ message: "Criado com sucesso", livro: newBook });
    } catch(error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json( {message: "Livro atualizado com sucesso" });
    } catch(error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      await book.findByIdAndDelete(req.params.id);
      res.status(204).json( {message: "Livro excluído com sucesso" });
    } catch(error) {
      next(error);
    }
  }
}