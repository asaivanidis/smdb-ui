import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7021/api/movies', // local api url running asp.net REST service (smdb)
});

export default api;