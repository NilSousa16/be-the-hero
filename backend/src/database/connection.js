const knex = require('knex');
const configuration = require('../../knexfile');

/**
 * Acesso a variável de ambiente NODE_ENV criada em package.json
 * Escolhendo banco para execução
 */
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

/**
 * Setando a configuração development no arquivo knexfile
 */ 
const connection = knex(config);

/**
 * Exportando conexão
 *  */ 
module.exports = connection;