const express = require('express');

/**
 * Utilizado para realização de validação
 */
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const SessionController = require('./controllers/SessionController');

const ProfileController = require('./controllers/ProfileController');

const routes = express. Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

/**
 * Validação deve ser antes do OngController.create para ser executado primeiro
 */
routes.post('/ongs', celebrate({
    /**
     * [] utilizado na sintaxe do javascript para passar chaves
     * cada parâmetro possui os requisito de validação necessários
     */
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })

}), OngController.create); 

/**
 * Validação do Headers através do celebrate deve considerar que nem todos os parâmetro deverão ser validados
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

/**
 * Validação do número da paginação através do celebrate
 */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,IncidentController.delete);

/**
 * Exemplo de função
 * routes.post('/ongs', async (request, response) => {}); 
 */

/**
 * Disponibilizando rotas (exportando uma variável de um arquivo)
 */
module.exports = routes;