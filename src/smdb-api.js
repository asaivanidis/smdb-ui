import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/movies`, // local api url running asp.net REST service (smdb)
    timeout: 10000, // 10 seconds timeout limit
});

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching movies from backend:', error);
        throw error;
    }
};


// Add a new movie
export const addMovie = async (movieData) => {
    try {
        const response = await api.post('/', movieData);
        return response.data;
    }
    catch (error){
        console.error('Error adding movie:', error);
    }
};

/* // Add a new movie with a simulated delay for testing the loading functionality
export const addMovie = async (movieData) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await api.post('/', movieData);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        }, 3000); // Simulate a 3-second delay
    });
}; */

export default api;