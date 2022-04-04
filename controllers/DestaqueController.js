const knex = require("../database/dbconfig");

module.exports = {

  async index(req, res) { 

    const destaques = await knex
      .select("f.id", "f.nomefilme", "g.nome as genero", "f.ano", "f.preco", "f.foto")
      .from("filmes as f")
      .leftJoin("generos as g", "f.genero_id", "g.id")
      .where("destaque",true)
      .orderBy("f.id", "desc");

    res.status(200).json(destaques);
  },

  
  
};
