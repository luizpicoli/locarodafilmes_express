const knex = require("../database/dbconfig");

module.exports = {
  async index(req, res) {
    try {
      const consulta = await knex("filmes")
        .count({ quantidade: "*" })

        .sum({ valorTotal: "preco" })

        .min({ maisBarato: "preco" })

        .max({ maisCaro: "preco" })

        .avg({ media: "preco" });

      // desestruturação do objeto retornado em consulta[0] (json)
      const { quantidade, valorTotal, maisBarato, maisCaro, media } = consulta[0];
      res.status(200).json({
        quantidade,
        valorTotal,
        maisBarato,
        maisCaro,
        media: Number(media).toFixed(2),
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};