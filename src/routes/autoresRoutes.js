import express from "express";

import AutorController from "../controllers/autorController.js";
import paginar from "../Middlewares/manipuladorDePagina.js";

const routes = express.Router();

// Centraliza as operações de autores e direciona as requisições
// para os métodos correspondentes do controller
routes.get("/autor", AutorController.listarAutores, paginar);
routes.get("/autor/:id", AutorController.listarAutorId);
routes.post("/autor", AutorController.cadastrarAutor);
routes.put("/autor/:id", AutorController.atualizarAutor);
routes.delete("/autor/:id", AutorController.deletarAutor);
    
export default routes; 