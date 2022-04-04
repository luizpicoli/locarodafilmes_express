const knex = require("../database/dbconfig");
module.exports = {

    async index(req, res) {

        const generos = await knex("generos").orderBy("nome");

        res.status(200).json(generos);

    },
    async generos_filmes(req, res) {
        const generos = await knex
            .select("g.nome")
            .count("f.id as num")
            .from("generos as g")
            .leftOuterJoin("filmes as f", "g.id", "f.genero_id")
            .groupBy("g.nome")
            .having("num", ">", 0)

        res.status(200).json(generos);
    }

};