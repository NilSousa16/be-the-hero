const request = require('supertest');
const app = require('../../src/app');
/**
 * Utilizado para executar as migrations
 */
const connection = require('../../src/database/connection')

describe('ONG', () => {
    /**
     * beforeEach - Executa antes de cada teste
     * Execução dos migrations para criação das tabelas
     */
    beforeEach(async () => {
        /**
         * rollback - para reiniciar o banco de dados antes dos testes  
         */
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    /**
     * afterAll - Executa depois de todos os teste
     * Encerra a conexão do banco após os testes
     */
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            /**
             * Para passar dados as solicitações de um teste
             * .set('Authorization', '<Valor>')
             */
            .send({
                name: "N2-Solidariedade",
                email: "n2solidariedade@n2.com.br",
                whatsapp: "73998170981",
                city: "Salvador",
                uf: "BA",
            });

        /**
         * O que deve se esperar como resultado do teste 
         */
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});