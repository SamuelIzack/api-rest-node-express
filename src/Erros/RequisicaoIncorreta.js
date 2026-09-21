import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
    constructor(mensagemDeErro = "Um ou mais dados fornecidos são inválidos."){
        super(mensagemDeErro, 400);
    }
}

export default RequisicaoIncorreta;