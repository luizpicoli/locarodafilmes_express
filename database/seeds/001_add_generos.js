
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('generos').del()
    .then(function () {
      // Inserts seed entries
      return knex('generos').insert([
        {nome: 'comedia'},
        {nome: 'ação'},
        {nome: 'drama'},
        {nome: 'aventura'},
        {nome: 'terror'},
        {nome: 'ficção'},
        {nome: 'musical'},
        {nome: 'guerra'},
        {nome: 'policial'}
      ]);
    });
};
