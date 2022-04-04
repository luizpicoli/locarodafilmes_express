exports.up = (knex) => {
  return knex.schema.createTable("propostas", (table) => {
    table.increments();
    table.string("comprador", 45).notNullable();
    table.decimal("proposta", 9.2).notNullable();

      table.integer("filmes_id").notNullable().unsigned();
      table.foreign("filmes_id").references("filmes.id").onUpdate("cascade");
  
      table.timestamps(true, true);
    });
  };
  
  exports.down = (knex) => knex.schema.dropTable("reservas");
  