import axios from 'axios';

const api = axios.create({
    // parte da url mantida em todas as chamadas
    baseURL: 'http://localhost:3333',
})

export default api;