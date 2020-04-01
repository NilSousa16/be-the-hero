const knex = require('knex');
const configuration = require('../../knexfile');

// Setando a configuração development no arquivo knexfile
const connection = knex(configuration.development);

// exportando conexão
module.exports = connection;