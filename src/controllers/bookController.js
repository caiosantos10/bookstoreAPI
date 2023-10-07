import book from "../models/Book.js";
import { author } from "../models/Author.js";

export default class BookController {
    
    static async listBooks(req, res) {
        try {
            const booksList = await book.find({});
            res.status(200).json(booksList);
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` })
        }
    };

    static async listBookByPublisher(req, res) { 
        try {
            const books = await book.find({ publisher : req.query.publisher });
            res.status(200).json({ books });
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na busca` })
        }
    };

    static async listBookById(req, res) {
        try {
            const bookFound = await book.findById(req.params.id);
            res.status(200).json(bookFound);
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` })
        }
    };

    static async bookRegister(req, res) {
        const body = req.body;
        const authorFound = await author.findById(body.author);
        try {
            const newBook = await book.create({ ...body, author: authorFound });
            res.status(201).json({ message: "Criado com sucesso", livro: newBook });
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro` });
        }
    };

    static async updateBook(req, res) {
        try {
            await book.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json( {message: "Livro atualizado com sucesso" });
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização` })
        }
    };

    static async deleteBook(req, res) {
        try {
            await book.findByIdAndDelete(req.params.id);
            res.status(204).json( {message: "Livro excluído com sucesso" });
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na exclusão` })
        }
    };
};