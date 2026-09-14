import mongoose from "mongoose";
import { autorSchema } from "./autor.js"

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: true},
    editora: {type: String},
    preco: {type: Number},
    paginas: {type: Number, required: true},
    autor: autorSchema
}, { versionKey: false});

// Cria o model que representa o livros no MongoDB
const livro = mongoose.model("livros", livroSchema);

export default  livro;
