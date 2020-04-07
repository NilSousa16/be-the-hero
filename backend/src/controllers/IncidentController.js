const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const { page = 1 } = request.query; // para realizar paginação
                                            // valor padrão de 1 caso não seja informado
                                            // ex: incidents?page=5
        
        const [count] = await connection('incidents').count(); //conta o total de elementos
        
        //const incidents = await connection('incidents').select('*'); // sem paginação
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // limite total de resgistros retornados
            .offset((page - 1) * 5) // total de registros a serem pulados
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);  //dados que serão retornados
        
        response.header('X-Total-Count', count['count(*)']); //retorna o total de registro no cabeçalho da requisição

        return response.json(incidents);
    },
    
     async create(request, response) {
         const { title, description, value } = request.body;         
         // recupera o id do cabeçalho da requisição
         const ong_id = request.headers.authorization;
         // a inserção retorna o id dos elementos inseridos, neste caso só um id
         const [id] = await connection('incidents').insert({
             title,
             description,
             value,
             ong_id,
         });

         return response.json({ id });
     },

     async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //retorna apenas um resultado

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.' }); //código de não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //resposta de sucesso sem conteúdo - send para enviar resposta sem corpo

     }
};