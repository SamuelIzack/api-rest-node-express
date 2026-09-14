import express from  "express"; 

import conectaNaDB from "./config/dbConnect.js"; 
import routes from "./routes/index.js";


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

export default app;