
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('filmes').del()
    .then(function () {
      // Inserts seed entries
      return knex('filmes').insert([
        { nomefilme: "minha mae e uma peça", genero_id: 1, ano: 2018, preco: 32, foto: "https://i.pinimg.com/originals/6f/67/ab/6f67abef54d0f5871d8669d0069fa2ea.jpg" },
        { nomefilme: "Em Ritmo de Fuga", genero_id: 2, ano: 2017, preco: 37, foto: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcinegarimpo.com.br%2Ffilmes%2Fem-ritmo-de-fuga%2F&psig=AOvVaw2Pch19tI6jVBRh1qhX9ntn&ust=1621601990016000&source=images&cd=vfe&ved=0CAIQjRxqFwoThttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jornalismo.ufv.br%2Fcinecom%2Frevista-curta-edicao-no38-junho-2019%2F&psig=AOvVaw2Pch19tI6jVBRh1qhX9ntn&ust=1621601990016000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjmqamo2PACFQAAAAAdAAAAABA3CMjmqamo2PACFQAAAAAdAAAAABAy" },
        { nomefilme: "Um Sonho de Liberdade", genero_id: 3, ano: 2019, preco: 45, foto: "https://play.google.com/store/movies/details/Um_Sonho_De_Liberdade?id=o1axrUg2hlU&hl=en&gl=BR" }
        
      ]);
    });
};
