const connection = require('../database/connection'); // conexão com o banco

const crypto = require('crypto'); // pacote de criptografia

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        // const data = request.body;
        // Desestruturação
        const { name, email, whatsapp, city, uf } = request.body;
        // Gera valor randômico hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
        // Async - await => o node só continuará a execução após executar o script setado com await
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