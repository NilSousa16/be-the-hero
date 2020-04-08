/**
 * importando express
 */
const express = require('express');

/**
 * pacote de segurança para autorizar acesso
 */
const cors = require('cors'); 

/**
 * Utilizado para modificar identificação de erro 500 para as validações realizadas
 */
const { errors } = require('celebrate');

/**
 * ./ para identificar que não é um pacote (referência a mesma pasta do arquivo)
 */
const routes = require('./routes');

/**
 * criando aplicação
 */
const app = express();

/**
 * Paramêtro para identificar que tem acesso
 */
app.use(cors());

/**
 * informa que será utilizado o json no corpo das requisições
 */
app.use(express.json());

/**
 * executa o arquivo routes.js importando atráves do require
 */
app.use(routes);

/**
 * executa o tratamento da mensagem de erro
 */
app.use(errors());

/**
 * escuta porta
 * app.listen(3333);
 */ 
module.exports = app;