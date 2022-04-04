const express = require("express");
const routes = express.Router();
const cors = require("cors");

routes.use(cors());

const GeneroController = require('./controllers/GeneroController')
const FilmeController = require('./controllers/FilmeController')
const UsuarioController = require('./controllers/UsuarioController')
const login = require("./middleware/login")


routes.get("/generos", GeneroController.index)
    .get("/generos_filmes", GeneroController.generos_filmes);

routes.get("/filmes", FilmeController.index)
    .post("/filmes", FilmeController.store)
    .put("/filmes/destaques/:id", FilmeController.destaque)
    .get("/filmes/destaques", FilmeController.destaques)
    .get("/filmes/pesq/:palavra", FilmeController.search)
    .get("/filmes/:id", FilmeController.show)
    .delete("/filmes/:id", FilmeController.destroy)
    .put("/filmes/:id", FilmeController.update)
    .get("/filmes/destaques/pesq/:palavra", FilmeController.pesqDestaque)

routes.get("/usuarios", UsuarioController.index)
    .post("/usuarios", UsuarioController.store)
    .post("/login", UsuarioController.login);
//routes.get("/destaques", DestaqueController.index);

module.exports = routes;