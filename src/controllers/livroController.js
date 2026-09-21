import  livro  from "../models/livros.js"
import { autor } from "../models/autor.js"
import NaoEncontrado from "../Erros/NaoEncontrado.js";

// Escapa caracteres especiais para que o texto seja tratado literalmente numa RegExp
function escaparRegex(texto){
    return String(texto).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class LivroController {

    // Busca todos os livros cadastros no banco de dados 
    static async listarLivros (req, res, next) {
        try{
            const buscarLivros = livro.find();

            req.resultado = buscarLivros;

            next()

        }catch(erro){
            next(erro);
        }
    }

    // Busca um livro especifico pelo ID informado na URL 
    static async listarLivrosID(req, res, next){
        try{
            const id = req.params.id;
            const livroPorId = await livro.findById(id); 

            if (!livroPorId){
                return next(new NaoEncontrado("Livro não encontrado."))
            }

            res.status(200).json(livroPorId);

        }catch(erro){
            next(erro);
        }
    }

    // Cria um novo livro usando os dados no body da requisição
    static async cadastrarLivro(req, res, next){
        const novoLivro = req.body;

        try{
            const autorDoLivro = await autor.findById(novoLivro.autor);
            
            if (!autorDoLivro) {
                return next( new NaoEncontrado("Autor não encontrado. Não é possível cadastrar um livro sem o seu autor."))
            }

            const livroCompleto = { ...novoLivro, autor: { ...autorDoLivro._doc}};
            const livroCriado = await livro.create(livroCompleto);

            res.status(201).json({mensagem: "Livro cadastrado com sucesso.", livro: livroCriado});
            
        } catch (erro){
            next(erro);
        }
    }

    // Atualiza um livro existente usando o ID e os dados enviados na requisição
    static async atualizarLivro(req, res, next){
        try{
            const id = req.params.id;
            
            const livroAtualizado = await livro.findByIdAndUpdate( id, req.body, { new: true, runValidators: true } );  

            if (!livroAtualizado){
                return next( new NaoEncontrado("Livro não encontrado."))
            }

            res.status(200).json({mensagem: "Livro atualizado com sucesso.", livro: livroAtualizado});

        }catch(erro){
            next(erro);
        }
    }

    // Remove um livro do banco de dados utilizando o ID informado na URL
    static async deletarLivro(req, res, next){

        try{
            const id = req.params.id;

            const livroDeletado = await livro.findByIdAndDelete(id);

            if (!livroDeletado){
                return next( new NaoEncontrado("Livro não encontrado."))
            }

            res.status(200).json({mensagem: "Livro removido com sucesso."});

        }catch(erro){
            next(erro);
        }


    }

    // Filtra livros por editora e/ou título
    static async buscarLivroFiltro(req, res, next){
        try{
            const { editora, titulo } = req.query;

            const busca = {};

            if(editora) busca.editora = new RegExp(escaparRegex(editora), "i");
            if(titulo) busca.titulo = new RegExp(escaparRegex(titulo), "i");

            // Não executa a query aqui: o middleware de paginação aplica sort/skip/limit e executa
            req.resultado = livro.find(busca);

            next();
        }catch(erro){
            next(erro);
        }
    }

    static async buscarLivroAutor(req, res, next){
        const nomeDoAutor = req.query.autor;
        try{

            const autorEncontrado = await autor.findOne({ nome: nomeDoAutor})

            if(!autorEncontrado){
                return next( new NaoEncontrado("Autor não encontrado."))
            }

            const livrosDoAutor = await livro.find({ "autor._id": autorEncontrado._id});

            if(livrosDoAutor.length === 0 ){
                return res.status(200).json({mensagem: "O autor informado não possui livros cadastrados."});
            }    

            res.status(200).json(livrosDoAutor);
        }catch(erro){
            next(erro);
        }
    }

};

export default LivroController;  