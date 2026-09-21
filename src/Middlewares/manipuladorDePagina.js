import RequisicaoIncorreta from "../Erros/RequisicaoIncorreta.js";

async function paginar (req, res, next){
  try{
        const limite = parseInt(req.query.limite ?? 5);
        const paginas = parseInt(req.query.paginas ?? 1);
        const ordenacao = req.query.ordenacao || "_id:1";

        let [campoOrdem, ordem = "1"] = ordenacao.split(":");

        ordem = parseInt(ordem);

        if(!(limite > 0) || !(paginas > 0) || (ordem !== 1 && ordem !== -1)){
            return next(new RequisicaoIncorreta("Parâmetros de paginação inválidos."));
        }

        // Query do Mongoose (com filtros já aplicados) preparada pelo controller
        const resultado = req.resultado;

        const lista = await resultado
        .sort({ [campoOrdem]: ordem })
        .skip((paginas - 1) * limite)
        .limit(limite);

        if(lista.length === 0){
            return res.status(200).json({mensagem: "Nenhum resultado encontrado."});
        }

        res.status(200).json(lista);
    }catch(erro){
        next(erro)
    }
}

export default paginar;