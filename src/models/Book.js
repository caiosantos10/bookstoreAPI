import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, "O título do livro é obrigatório"] },
  publisher: { 
    type: String, 
    required: [true, "A editora é obrigatória"],
    enum: { 
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido" 
    }
  },
  pages: { 
    type: Number, 
    min: [10, "O número de páginas deve estar entre 10 e 5000"], 
    max: [5000, "O número de páginas deve estar entre 10 e 5000"] 
  },
  price: { type: Number },
  author: { type: authorSchema, required: [true, "O(a) autor(a) é obrigatório"] }
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;