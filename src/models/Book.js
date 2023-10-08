import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, "O título do livro é obrigatório"] },
  publisher: { type: String, required: [true, "O título do livro é obrigatório"] },
  pages: { type: Number },
  price: { type: Number },
  author: { type: authorSchema, required: [true, "O título do livro é obrigatório"] }
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;