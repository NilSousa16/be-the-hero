/**
 * Conexão com o banco
 *  */ 
const connection = require('../database/connection');

/**
 * Recurso de criptografia utilizado para gerar Id automático
 */
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        /**
         * const data = request.body;
         * Desestruturação { name, email, whatsapp, city, uf }
         *  */         
        const { name, email, whatsapp, city, uf } = request.body;
        /** 
         * Gera valor randômico hexadecimal
         * */ 
        const id = generateUniqueId();
        /**
         * Async - await => o node só continuará a execução após executar o script setado com await
         *  */ 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    }
}