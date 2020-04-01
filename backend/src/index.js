// importando express
const express = require('express');

// pacote de segurança para autorizar acesso
const cors = require('cors'); 

// ./ para identificar que não é um pacote (referência a mesma pasta do arquivo)
const routes = require('./routes');

// criando aplicação
const app = express();

// Paramêtro para identificar que tem acesso
app.use(cors());

// informa que será utilizado o json no corpo das requisições
app.use(express.json());

// excuta o arquivo routes.js importando atráves do require
app.use(routes);

/**
 * escutar porta
 */ 
app.listen(3333);