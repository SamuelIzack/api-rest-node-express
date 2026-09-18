import mongoose from "mongoose";
import { autorSchema } from "./autor.js"

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {
        type: String, 
        required: [true, `O titulo é um campo obrigatório`]
    },
    editora: {
        type: String,
        required: [true, `A editora e um campo obrigatório`]
    },
    preco: {type: Number,},
    paginas: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 1 && valor <= 5000;
            }, 
        message: "O número de páginas deve estar entre 1 e 5000. Valor informado {VALUE}"
        }
    },
    autor: autorSchema
}, { versionKey: false});

// Cria o model que representa o livros no MongoDB
const livro = mongoose.model("livros", livroSchema);

export default  livro;
