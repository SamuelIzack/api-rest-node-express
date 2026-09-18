import mongoose from "mongoose";
import { autor }  from "../models/autor.js";
import NaoEncontrado from "../Erros/NaoEncontrado.js";

class AutorController {

    // Lista todos os autores cadastrados.
    static async listarAutores(req, res, next){
        try{

            const listaDeAutores = await autor.find({});

            if(listaDeAutores.length === 0){
                return res.status(200).json({message: `Nenhum autor cadastrado.`});
            }

            res.status(200).json(listaDeAutores);

        }catch(erro){
            returnnext(erro);
        }
    }


    // Busca um autor pelo ID informado na URL.
    static async listarAutorId(req, res, next){
        try{
            const id = req.params.id;
            
            const autorEncontrado = await autor.findById(id);

            if (!autorEncontrado){
                return next(new NaoEncontrado(`Id do autor não encontrado`))
            };

            res.status(200).json(autorEncontrado);
             
        }catch(erro){
            next(erro);
        }
    }


    // Cadastra um novo autor com os dados enviados na requisição.
    static async cadastrarAutor(req, res, next){
        try{

            const autorCriado = await autor.create(req.body)

            // const recebeBody = req.body

            //     const criandoAutor = {
            //         ...recebeBody, nacionalidade: req.body.nacionalidade ?? "Não cadastrada"
            //     }

            //     await autor.create(criandoAutor);
            

            res.status(201).json({message: `Autor cadastrado com sucesso`, autor: autorCriado});

        }catch(erro){
            next(erro);
        }
    }


    // Atualiza um autor existente pelo ID.
    static async atualizarAutor(req, res, next){
        try{
            const id = req.params.id;

            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body, {new: true});

            if (!autorAtualizado){
                return next(new NaoEncontrado(`Id do autor não encontrado`))
            };

            res.status(200).json({message: `Autor atualizado com sucesso.`, autor: autorAtualizado});


        }catch(erro){
            next(erro);
        }
    }

    // Remove um autor pelo ID informado na URL.
    static async deletarAutor(req, res, next){
        try{
            const id = req.params.id;

            const autorDeletado = await autor.findByIdAndDelete(id);

            if (!autorDeletado){
                return next(new NaoEncontrado(`Id do autor não encontrado`))
            }

            res.status(200).json({message: `Autor removido com sucesso`});
            
        }catch(erro){
            next(erro);
        }
    }
    
}

export default AutorController; 
