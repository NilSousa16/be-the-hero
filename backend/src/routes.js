const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const SessionController = require('./controllers/SessionController');

const routes = express. Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create); 

routes.get('/incidents', IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);

/**
 * Exemplo de função
 * routes.post('/ongs', async (request, response) => {}); 
 */

// Disponibilizando rotas (exportando uma variável de um arquivo)
module.exports = routes;