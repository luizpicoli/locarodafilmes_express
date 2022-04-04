const knex = require('../database/dbconfig');

module.exports = {
  async index(req, res) {
    const propostas = await knex
      .select("p.id", "p.comprador", "p.proposta", "f.nomefilme as filmes")
      .from("propostas as p")
      .leftJoin("filmes as f", "p.id", "f.id")
      .orderBy("p.id", "desc");

    res.status(200).json(propostas);
  },

  async store(req, res) {
    const { comprador, proposta, filmes_id } = req.body;

    if (!comprador || !proposta || !filmes_id) {
      res.status(400).json({ erro: "Dados inválidos" });
      return;
    }

    try {
      const novaProposta = await knex("propostas").insert({
        comprador,
        proposta,
        filmes_id,
      });
      res.status(201).json({ id: novaProposta[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};
