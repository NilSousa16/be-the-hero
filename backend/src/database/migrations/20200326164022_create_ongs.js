// Rotina a ser executada pela migration
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });    
};

// Rotina a ser executada caso ocorra um erro
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
