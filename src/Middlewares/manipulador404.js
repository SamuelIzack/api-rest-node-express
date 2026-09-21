import NaoEncontrado from "../Erros/NaoEncontrado.js";

function manipulador404(req, res, next){
     
    const erro404 = new NaoEncontrado("Rota não encontrada.");
    next(erro404)

}

export default manipulador404;