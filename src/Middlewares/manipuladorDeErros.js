import mongoose, { mongo } from "mongoose";
import ErroBase from "../Erros/ErroBase.js"
import ResquisicaoIncorreta from "../Erros/RequisicaoIncorreta.js";
import ErroDeValidacao from "../Erros/ErroDeValidacao.js";
import NaoEncontrado from "../Erros/NaoEncontrado.js";

function manipuladorDeErros(erro, req, res, next ){

    if(erro instanceof mongoose.Error.CastError){
        new ResquisicaoIncorreta().enviarResposta(res);
    }
    else if(erro instanceof mongoose.Error.ValidationError){
        new ErroDeValidacao(erro).enviarResposta(res);
    }
    else if(erro instanceof NaoEncontrado){
        erro.enviarResposta(res);
    }
    else {
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;