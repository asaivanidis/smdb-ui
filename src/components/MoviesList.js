import React, { useState, useEffect } from 'react';
import api from '../smdb-api';

import { useNavigate } from 'react-router-dom';

// Using material-ui for the ui
import { Grid2, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';

const fallbackImage = 'https://fakeimg.pl/250x330'; // Fallback image URL

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

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

    const handleCardClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div style={{ padding: '30px' }}>
            
            <Grid2 container spacing={5}>
                {movies.map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.movieId}> {/* Adjust poster size based on screen size */}
                        <Card
                            sx={{ 
                                width: 250, // Fixed width
                                height: 450, // Fixed height for making sure all movies take up the same space
                                display: 'flex',
                                flexDirection: 'column',
                                
                            }}
                        >
                            <CardActionArea onClick={() => handleCardClick(movie.movieId)}>
                                {/* Movie Poster */}
                                <CardMedia  
                                    component="img"
                                    height="300"
                                    image={movie.imageUrl || fallbackImage} // If no url is stored in the database load the fallback image 
                                    alt={movie.title}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            filter: 'brightness(0.8)', // Darken the poster while hovering over
                                        }
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = fallbackImage; // If the image cannot be loaded load the fallback image
                                    }}    
                                />
                                </CardActionArea>
                            <CardContent>
                                {/* Movie Title */}
                                <Typography variant="h6" component="div" >
                                    {movie.title}
                                </Typography>
                                {/* Movie Description */}
                                <Typography variant="body2" color="text.secondary" noWrap> {/* Limit the description to one line */}
                                    {movie.description}
                                </Typography>
                            </CardContent>    
                            <CardContent sx={{ textAlign: 'center', paddingTop: 0 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteMovie(movie.movieId)}
                                    sx={{ marginTop: '10px' }}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
};

export default MoviesList;