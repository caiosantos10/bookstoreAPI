import { author } from "../models/Author.js";

export default class AuthorController {
    static async listAuthors(req, res) {
        try {
            const authors = await author.find({});
            res.status(200).json(authors);
        } catch(error) {
            res.status(500).json({ message:`${error} - Erro na requisição` });
        }
    }
    static async listAuthorById(req, res) {
        try {
            const authorFound = await author.findById(req.params.id);
            res.status(200).json(authorFound);
        } catch(error) {
            res.status(500).json({ message:`${error} - Erro na requisição` });
        }
    }
    static async authorRegister(req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(200).json({ message: "Autor criado com sucesso", author: newAuthor });
        } catch(error) {
            res.status(500).json({ message:`${error} - Erro na requisição` });
        }
    }
    static async updateAuthor(req, res) {
        try {
            await author.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso" });
        } catch(error) {
            res.status(500).json({ message:`${error} - Erro na requisição` });
        }
    }
    static async deleteAuthor(req, res) {
        try {
            const authorFound = await author.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Autor excluído com sucesso", author: authorFound });
        } catch(error) {
            res.status(500).json({ message:`${error} - Erro na requisição` });
        }
    }
}