import { book, author } from "../models/index.js";
import NotFoundError from "../errors/notFoundError.js";

export default class BookController {
    
  static async listBooks(req, res, next) {
    try {
      const books = book.find().populate("author");
      req.result = books;
      next();
    } catch(error) {
      next(error);
    }
  }

  static async listBookByQuery(req, res, next) { 
    try {
      const search = await filterBuilder(req);
      if (search) {
        const books = book.find(search).populate("author");
        req.result = books;
        next();
      } else {
        res.status(200).json([]);
      }
    } catch(error) {
      next(error);
    }
  }

  static async listBookById(req, res, next) {
    try {
      const foundBook = await book.findById(req.params.id);
      if (foundBook){
        res.status(200).json(foundBook);
      } else {
        next(new NotFoundError("Livro não encontrado"));
      }
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
      const foundBook = await book.findByIdAndUpdate(req.params.id, req.body);
      if (foundBook){
        res.status(200).json({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NotFoundError("Livro não encontrado"));
      }
    } catch(error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const foundBook = await book.findByIdAndDelete(req.params.id);
      if (foundBook){
        res.status(204).json( {message: "Livro excluído com sucesso" });
      } else {
        next(new NotFoundError("Livro não encontrado"));
      }
    } catch(error) {
      next(error);
    }
  }
}

async function filterBuilder(req) {
  const { publisher, title, minPages, maxPages, authorName } = req.query;
  let search = {};

  if (publisher) search.publisher = { $regex: publisher, $options: "i"};
  if (title) search.title = { $regex: title, $options: "i"};

  // Filter by pages
  if (minPages) search.pages = { $gte: minPages };
  if (maxPages) search.pages = { ...search.pages, $lte: maxPages };

  // Filter by authorName
  if (authorName) {
    const authorObj = await author.findOne({ name: authorName });

    authorObj === null ? search = null : search.author = authorObj._id;
  }
        
  return search;
}