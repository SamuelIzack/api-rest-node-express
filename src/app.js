import express from  "express"; 
import manipuladorDeErros from "./Middlewares/manipuladorDeErros.js";
import conectaNaDB from "./config/dbConnect.js"; 
import routes from "./routes/index.js";
import manipulador404 from "./Middlewares/manipulador404.js";


const conexão = await conectaNaDB();
//Monitora possíveis erros durante a conexão com o banco 
conexão.on("error", (error) =>{
    console.error("Erro conexão", error)
});

// Confirma quando a conexão com o banco é estabelecida
conexão.once("open", () => {
    console.log("Conexão com banco feita com sucesso");
});

const app = express();

//Registras as rotas na aplicação Express
routes(app);

//Caso a rota seja inexistente cria um erro 404 e envia pro manipulador de erros
app.use(manipulador404)


//Interceptador de erros
app.use(manipuladorDeErros)




export default app;