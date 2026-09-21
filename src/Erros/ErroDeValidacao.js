import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroDeValidacao extends RequisicaoIncorreta {
    constructor(erro){
        const mensagemErro = Object.values(erro.errors).map(erro => erro.message).join("; ") 
        super(`Erro de validação: ${mensagemErro}`);
    }    
}


export default ErroDeValidacao;