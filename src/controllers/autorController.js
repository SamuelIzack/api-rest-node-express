import { autor }  from "../models/autor.js";
import NaoEncontrado from "../Erros/NaoEncontrado.js";
import responder from "../utils/responder.js";

class AutorController {

    // Lista todos os autores cadastrados.
    static async listarAutores(req, res, next){
        try{

            const listaDeAutores = autor.find();

            req.resultado = listaDeAutores;

            next();
        }catch(erro){
            return next(erro);
        }
    }


    // Busca um autor pelo ID informado na URL.
    static async listarAutorId(req, res, next){
        try{
            const id = req.params.id;
            
            const autorEncontrado = await autor.findById(id);

            if (!autorEncontrado){
                return next(new NaoEncontrado("Autor não encontrado."));
            };
            responder(res, 200, autorEncontrado, {mensagem: "Autor encontrado."})
            
             
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
            
            responder(res, 201, autorCriado, {mensagem: "Autor criado com sucesso."})


        }catch(erro){
            next(erro);
        }
    }


    // Atualiza um autor existente pelo ID.
    static async atualizarAutor(req, res, next){
        try{
            const id = req.params.id;

            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

            if (!autorAtualizado){
                return next(new NaoEncontrado("Autor não encontrado."));
            };

            responder(res, 200, autorAtualizado, {mensagem: "Autor atualizado com sucesso."})


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
                return next(new NaoEncontrado("Autor não encontrado."));
            }
            responder(res, 200, null, {mensagem: "Autor removido com sucesso."})
            
        }catch(erro){
            next(erro);
        }
    }
    
}

export default AutorController; 
