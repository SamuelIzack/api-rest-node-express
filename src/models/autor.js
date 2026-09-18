import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {
        type: String, 
        required: [true,`O nome do(a) autor(a) é obrigatório`]
    },
    nacionalidade: {
        type: String,
        default: "Não cadastrada"
    }
}, { versionKey: false});

// Cria o model que representa o autor no MongoDB
const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };
