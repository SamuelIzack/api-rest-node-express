import livro from "../models/livros.js"
import { autor } from "../models/autor.js"

class LivroController {

    // Busca todos os livros cadastros no banco de dados 
    static async listarLivros (req, res) {
        try{
            const listaLivros = await livro.find({}); 
            res.status(200).json(listaLivros);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Erro ao listar livros`});
        }
    }

    // Busca um livro especifico pelo ID informado na URL 
    static async listarLivrosID(req, res){
        try{
            const id = req.params.id;
            const livroPorId = await livro.findById(id); 

            if (!livroPorId){
                return res.status(404).json({ mensagem: "Livro não encontrado." }); 
            }

            res.status(200).json(livroPorId);

        }catch(erro){
            res.status(400).json({message: `${erro.message} - ID do livro inválido.`});
        }
    }

    // Cria um novo livro usando os dados no body da requisição
    static async cadastrarLivro(req, res){
        const novoLivro = req.body;

        try{
            const autorDoLivro = await autor.findById(novoLivro.autor);
            if (!autorDoLivro) {
                return res.status(404).json({
                     mensagem: "Autor não encontrado."
                });
            }

            const livroCompleto = { ...novoLivro, autor: { ...autorDoLivro._doc}};
            const livroCriado = await livro.create(livroCompleto);

            res.status(201).json({mensagem: "Livro criado com sucesso", livro: livroCriado});
            
        } catch (erro){
            res.status(400).json({message: `${erro.message} - Dados do livro inválidos.`});
        }
    }

    // Atualiza um livro existente usando o ID e os dados enviados na requisição
    static async atualizarLivro(req, res){
        try{
            const id = req.params.id;
            
            const livroAtualizado = await livro.findByIdAndUpdate( id, req.body, { new: true } );  

            if (!livroAtualizado){
                return res.status(404).json({ mensagem: "Livro não encontrado." }); 
            }

            res.status(200).json({mensagem: "Livro atualizado com sucesso.", livro: livroAtualizado});

        }catch(erro){
            res.status(400).json({message: `${erro.message} - ID ou dados do livro inválidos.`});
        }
    }

    // Remove um livro do banco de dados utilizando o ID informado na URL
    static async deletarLivro(req, res){

        try{
            const id = req.params.id;

            const livroDeletado = await livro.findByIdAndDelete(id);

            if (!livroDeletado){
                return res.status(404).json({ mensagem: "Livro não encontrado." }); 
            }

            res.status(200).json({mensagem: "Livro Deletado com sucesso."});

        }catch(erro){
            res.status(500).json({message: `${erro.message} - ID do livro inválido`});
        }


    }

    // Filtra livros pela editora e exibe
    static async buscarLivroEditor(req, res){
        const editora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({editora: editora});
            res.status(200).json(livrosPorEditora);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Não foi possível buscar os livros do autor.`});
        }
    }

    static async buscarLivroAutor(req, res){
        const nomeDoAutor = req.query.autor;
        try{

            const autorEncontrado = await autor.findOne({ nome: nomeDoAutor})

            if(!autorEncontrado){
                return res.status(404).json({message: `Autor não encontrado`})
            }

            const livrosDoAutor = await livro.find({ "autor._id": autorEncontrado._id});

            if(livrosDoAutor.length === 0 ){
                return res.status(404).json({message: `O Autor não contém livros`})
            }    

            res.status(200).json(livrosDoAutor);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Não foi possivel achar nenhum livro associado a essa editora`});
        }
    }

};

export default LivroController;  