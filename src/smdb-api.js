import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/movies`; //api url running asp.net REST service (smdb)
const TIMEOUT = 10000; // 10 seconds timout limit

const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT
});


const api = {

    // Fetch all movies
    fetchMovies : async () => {
        try {
            const response = await client.get('/');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching movies from backend:', error);
            throw error;
        }
    },

    // Fetch movie by id
    fetchMovieById: async (id) => {
        try {
            const response = await client.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movie by ID:', error);
            throw error;
        }
    },
    
    // Add a new movie
    addMovie : async (movie) => {
        try {
            const response = await client.post('/', movie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        }
        catch (error){
            console.error('Error adding movie:', error);
            throw error; //send the error to the caller
        }
    },

    // Update movie
    updateMovie: async (id, movie) => {
        try {
            const response = await client.put(`/${id}`, movie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error;
        }
    },

    // Delete movie
    deleteMovie: async (id) => {
        try {
            const response = await client.delete(`/${id}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting movie by ID:', error);
            throw error;
        }
    },

    // Upload file
    uploadFile : async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await client.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}

export default api;


// Fetch all movies

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

