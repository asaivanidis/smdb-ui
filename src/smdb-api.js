import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7021/api/movies', // Replace with your API URL
});

export default api;