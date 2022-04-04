const knex = require("../database/dbconfig");

module.exports = {
    // index: listagem
    // store/create: inclusão
    // update: alteração
    // show: obter 1 registro
    // destroy: exclusão

    async index(req, res) {
        // const carros = await knex("carros")
        //   .join("marcas", "carros.marca_id", "=", "marcas.id")
        //   .orderBy("carros.id", "desc");

        const filmes = await knex
            .select("f.id", "f.nomefilme", "g.nome as genero", "f.ano", "f.preco", "f.foto", "f.destaque")
            .from("filmes as f")
            .leftJoin("generos as g", "f.genero_id", "g.id")
            .orderBy("f.id", "desc");
        res.status(200).json(filmes);
    },

    async show(req, res) {
        const id = req.params.id; // ou:  const { id } = req.params

        const filme = await knex
            .select("f.id", "f.nomefilme", "g.nome as genero", "f.ano", "f.preco", "f.foto", "f.destaque")
            .from("filmes as f")
            .leftJoin("generos as g", "f.genero_id", "g.id")
            .where("f.id", id)
        res.status(200).json(filme[0]);
    },

    async search(req, res) {
        const palavra = req.params.palavra;

        const filmes = await knex
            .select("f.id", "f.nomefilme", "g.nome as genero", "f.ano", "f.preco", "f.foto", "f.destaque")
            .from("filmes as f")
            .leftJoin("generos as g", "f.genero_id", "g.id")
            .where("nomefilme", "like", "%" + palavra + "%")
            .orWhere("g.nome", "like", "%" + palavra + "%")
            .orderBy("f.id", "desc");
        res.status(200).json(filmes);
    },
    
    async store(req, res) {
        console.log(req.body)

        // desestruturação do objeto request
        const { nomefilme, genero_id, ano, preco, foto } = req.body;

        if (!nomefilme) {
            res.status(400).json({
                erro: "faltou modelo",
            });
            return;
        }

        // se algum dos atributos não for passado
        if (!nomefilme || !genero_id || !ano || !preco || !foto) {
            res.status(400).json({
                erro: "Enviar modelo, marca_id, ano, preco e foto do veículo",
            });
            return;
        }
        try {
            const novo = await knex("filmes").insert({
                nomefilme,
                genero_id,
                ano,
                preco,
                foto,
            });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async destaque(req, res) {
        const id = req.params.id; // ou:  const { id } = req.params
        dados = await knex("filmes").where({ id });
        //    console.log(dados[0]);

        if (dados[0].destaque) {
            try {
                await knex("filmes").update({ destaque: 0 }).where({ id });
                res.status(200).json({ ok: 1 });
            } catch (error) {
                res
                    .status(400)
                    .json({ ok: 0, msg: `Erro na alteração: ${error.message}` });
            }
        } else {
            try {
                await knex("filmes").update({ destaque: 1 }).where({ id });
                res.status(200).json({ ok: 1 });
            } catch (error) {
                res
                    .status(400)
                    .json({ ok: 0, msg: `Erro na alteração: ${error.message}` });
            }
        }
    },
    async update(req, res) {
        const id = req.params.id;
        const { nomefilme, genero_id, ano, preco, foto } = req.body;
        try {
          await knex("filmes")
            .update({ nomefilme, genero_id, ano, preco, foto })
            .where({ id });
          res.status(200).json();
        } catch (error) {
          res.status(400).json({ msg: error.message });
        }
      },

    async destaques(req, res) {
        const filmes = await knex
            .select("f.id", "f.nomefilme", "g.nome as genero", "f.ano", "f.preco", "f.foto", "f.destaque")
            .from("filmes as f")
            .leftJoin("generos as g", "f.genero_id", "g.id")
            .where("f.destaque", true)
            .orderBy("f.id", "desc");
        res.status(200).json(filmes);
    },
    async destroy(req, res) {
        const id = req.params.id; // ou:  const { id } = req.params
        try {
            await knex("filmes").del().where({ id });
            res.status(200).json({ ok: 1 });
        } catch (error) {
            res.status(400).json({ ok: 0, msg: `Erro na exclusão: ${error.message}` });
        }
    },
    async pesqDestaque(req, res) {
        const { palavra } = req.params;
        try {
          const pesqDest = await knex("filmes")
            .where("nomefilme", "like", `%${palavra}%`)
            .andWhere("destaque", "=", true);
          res.status(200).json(pesqDest);
        } catch (error) {
          res.status(400).json({ msg: error.message });
        }
      },
};