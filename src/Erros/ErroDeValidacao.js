import ResquisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroDeValidacao extends ResquisicaoIncorreta {
    constructor(erro){
        const mensagemErro = Object.values(erro.errors).map(erro => erro.message).join("; ") 
        super(`Erros encontrados: ${mensagemErro}`)
    }    
}


export default ErroDeValidacao;