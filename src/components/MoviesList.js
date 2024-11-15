import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../smdb-api';

// Using material-ui for the ui
import { Card, CardContent, Button, Typography } from '@mui/material';


const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const deleteMovie = (id) => {
        api.delete(`/${id}`)
            .then(() => {
                setMovies(movies.filter(movie => movie.movieId !== id));
            })
            .catch(error => console.error('Error deleting movie:', error));
    };

    return (
        <div className="container">
            {movies.map(movie => (
                <Card key={movie.movieId} variant="outlined" className="mb-4">
                    <CardContent>
                        <Typography variant="h5" component="div">{movie.title}</Typography>
                        <Typography color="text.secondary">{movie.description}</Typography>
                        <div className="mt-2">
                            <Link to={`/movie/${movie.movieId}`}>
                                <Button variant="contained" color="primary">View Details</Button>
                            </Link>
                            <Button variant="outlined" color="error" onClick={() => deleteMovie(movie.movieId)}>Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default MoviesList;