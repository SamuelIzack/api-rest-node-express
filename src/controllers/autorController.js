import { autor }  from "../models/autor.js";

class AutorController {

    // Lista todos os autores cadastrados.
    static async listarAutores(req, res){
        try{
            const listaDeAutores = await autor.find({});

            res.status(200).json(listaDeAutores);
        }catch(erro){
            res.status(500).json({message: `Erro ao listar os autores.`});    
        }
    }


    // Busca um autor pelo ID informado na URL.
    static async listarAutorId(req, res){
        try{
            const id = req.params.id;
            
            const autorEncontrado = await autor.findById(id);

            if (!autorEncontrado){
                return res.status(404).json({ mensagem: "Autor não encontrado." }); 
            }

            res.status(200).json(autorEncontrado); 
        }catch(erro){
            res.status(400).json({message: `ID do autor inválido.`})
        }
    }


    // Cadastra um novo autor com os dados enviados na requisição.
    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body)

            res.status(201).json({message: `Autor cadastrado com sucesso`, autor: novoAutor});
        }catch(erro){
            res.status(400).json({message: `Dados do autor inválidos.`});
        }
    }


    // Atualiza um autor existente pelo ID.
    static async atualizarAutor(req, res){
        try{
            const id = req.params.id;

            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body, {new: true});

            if (!autorAtualizado){
                return res.status(404).json({ mensagem: "Autor não encontrado." }); 
            }

            res.status(200).json({message: `Autor atualizado com sucesso.`, autor: autorAtualizado})


        }catch(erro){
            res.status(400).json({message: `ID ou dados do autor inválidos.`})
        }
    }


    // Remove um autor pelo ID informado na URL.
    static async deletarAutor(req, res){
        try{
            const id = req.params.id;

            const autorDeletado = await autor.findByIdAndDelete(id);

            if (!autorDeletado){
                return res.status(404).json({ mensagem: "Autor não encontrado." }); 
            }

            res.status(200).json({message: `Autor removido com sucesso`});
            
        }catch(erro){
            res.status(500).json({message: `ID do autor inválido `})
        }
    }
    
}

export default AutorController; 
