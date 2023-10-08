import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: [true, "O nome do(a) autor(a) é obrigatório"] },
  nationality: { type: String }
}, { versionKey: false });

const author = mongoose.model("author", authorSchema);

export { author, authorSchema };