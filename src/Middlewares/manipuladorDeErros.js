import mongoose from "mongoose";
import ErroBase from "../Erros/ErroBase.js"
import RequisicaoIncorreta from "../Erros/RequisicaoIncorreta.js";
import ErroDeValidacao from "../Erros/ErroDeValidacao.js";

// O parâmetro "next" é obrigatório na assinatura para o Express reconhecer o middleware de erros.
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next ){

    if(erro instanceof mongoose.Error.CastError){
        new RequisicaoIncorreta().enviarResposta(res);
    }
    else if(erro instanceof mongoose.Error.ValidationError){
        new ErroDeValidacao(erro).enviarResposta(res);
    }
    else if(erro instanceof ErroBase){
        erro.enviarResposta(res);
    }
    else {
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;