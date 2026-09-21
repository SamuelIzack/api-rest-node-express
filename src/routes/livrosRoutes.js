import express from "express";

import LivroController from "../controllers/livroController.js";

import paginar from "../Middlewares/manipuladorDePagina.js";

const routes = express.Router();

// Centraliza as operações de livros e direciona cada requisição 
// para o método correspondente no controller
routes.get("/livros/busca", LivroController.buscarLivroFiltro, paginar);
routes.get("/livros/autor/busca", LivroController.buscarLivroAutor);
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/:id", LivroController.listarLivrosID);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;

