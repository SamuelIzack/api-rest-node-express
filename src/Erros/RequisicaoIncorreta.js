import ErroBase from "./ErroBase.js";

class ResquisicaoIncorreta extends ErroBase {
    constructor(mensagemDeErro = `Um ou mais dados fornecidos são inválidos.`){
        super(mensagemDeErro, 400);
    }
}

export default ResquisicaoIncorreta;