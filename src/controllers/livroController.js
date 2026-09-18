import  livro  from "../models/livros.js"
import { autor } from "../models/autor.js"
import NaoEncontrado from "../Erros/NaoEncontrado.js";

class LivroController {

    // Busca todos os livros cadastros no banco de dados 
    static async listarLivros (req, res, next) {
        try{
            const listaLivros = await livro.find({}); 

            if(listaLivros.length === 0){
                return res.status(200).json({message: `Nenhum livro cadastrado.`})
            }

            res.status(200).json(listaLivros);
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
                return next(new NaoEncontrado("Livro não encontrado." ))
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
                return next( new NaoEncontrado("Autor não encontrado. Não e possivel cadastrar um livro sem o seu autor"))
            }

            const livroCompleto = { ...novoLivro, autor: { ...autorDoLivro._doc}};
            const livroCriado = await livro.create(livroCompleto);

            res.status(201).json({mensagem: "Livro criado com sucesso", livro: livroCriado});
            
        } catch (erro){
            next(erro);
        }
    }

    // Atualiza um livro existente usando o ID e os dados enviados na requisição
    static async atualizarLivro(req, res, next){
        try{
            const id = req.params.id;
            
            const livroAtualizado = await livro.findByIdAndUpdate( id, req.body, { new: true } );  

            if (!livroAtualizado){
                return next( new NaoEncontrado("Livro não encontrado." ))
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
                return next( new NaoEncontrado("Livro não encontrado." ))
            }

            res.status(200).json({mensagem: "Livro Deletado com sucesso."});

        }catch(erro){
            next(erro);
        }


    }

    // Filtra livros pela editora e exibe
    static async buscarLivroEditor(req, res, next){
        const editora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({editora: editora});

            if(livrosPorEditora.length === 0){
                return next( new NaoEncontrado("Editora não encontrada" ))
            }

            res.status(200).json(livrosPorEditora);
        }catch(erro){
            next(erro);
        }
    }

    static async buscarLivroAutor(req, res, next){
        const nomeDoAutor = req.query.autor;
        try{

            const autorEncontrado = await autor.findOne({ nome: nomeDoAutor})

            if(!autorEncontrado){
                return next( new NaoEncontrado("Autor não encontrado" ))
            }

            const livrosDoAutor = await livro.find({ "autor._id": autorEncontrado._id});

            if(livrosDoAutor.length === 0 ){
                return res.status(200).json({message: "O Autor não contém livros"});
            }    

            res.status(200).json(livrosDoAutor);
        }catch(erro){
            next(erro);
        }
    }

};

export default LivroController;  