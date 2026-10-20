import RequisicaoIncorreta from "../Erros/RequisicaoIncorreta.js";
import responder from "../utils/responder.js";

// Quantidade máxima de itens por página, evita requisições como ?limite=1000000
const LIMITE_MAXIMO = 50;

async function paginar (req, res, next){
  try{
        const limite = parseInt(req.query.limite ?? 5);
        const pagina = parseInt(req.query.pagina ?? 1);
        const ordenacao = req.query.ordenacao || "_id:1";

        let [campoOrdem, ordem = "1"] = ordenacao.split(":");

        ordem = parseInt(ordem);

        if(!(limite > 0) || !(pagina > 0) || (ordem !== 1 && ordem !== -1)){
            return next(new RequisicaoIncorreta("Parâmetros de paginação inválidos."));
        }

        if(limite > LIMITE_MAXIMO){
            return next(new RequisicaoIncorreta(`O limite máximo por página é ${LIMITE_MAXIMO}.`));
        }

        // Query do Mongoose (com filtros já aplicados) preparada pelo controller
        const resultado = req.resultado;

        // Conta todos os documentos que atendem ao filtro, ignorando skip e limit
        const total = await resultado.model.countDocuments(resultado.getFilter());

        const lista = await resultado
        .sort({ [campoOrdem]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite);

        const paginacao = {
            pagina,
            limite,
            total,
            totalPaginas: Math.ceil(total / limite)
        };

        return responder(res, 200, lista, {mensagem: "Resultados encontrados.", paginacao})

    }catch(erro){
        next(erro)
    }
}

export default paginar;
