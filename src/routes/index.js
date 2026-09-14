import express from "express";

import livros from "./livrosRoutes.js";

import autor from "./autoresRoutes.js";

// Centraliza e registra as rotas da aplicação
const routes = (app) => {

    // Define a rota principal da API
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    
    // Habilita o recebimento de JSON e registra as rotas 
    // relacionadas a livros e autores na aplicação
    app.use(express.json(), livros, autor);
};

export default routes;

