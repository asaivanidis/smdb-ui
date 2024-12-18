import React, { useState, useEffect } from 'react';
import api from '../smdb-api';

import { useNavigate } from 'react-router-dom';

// Using material-ui for the ui
import { Grid2, Card, CardActionArea, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';

const fallbackImage = 'https://res.cloudinary.com/dfc8ghhcu/image/upload/v1731904682/sans-affiche_gxtbcf.png'; // Fallback image URL

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false); // State to track confirmation dialog
    const [movieToDelete, setMovieToDelete] = useState(null); // State to track which movie to delete
    const navigate = useNavigate();

    // Fetch movies
    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const response = await api.fetchMovies();
                setMovies(response);
            }
            catch (error){
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies()
    }, []);

    // Handle click to navigate to movie details page
    const handleCardClick = (id) => {
        navigate(`/movie/${id}`);
    };

    // Open confirmation dialog before deleting a movie
    const openConfirmDialog = (movieId) => {
        setMovieToDelete(movieId);
        setConfirmOpen(true);
    };

    // Handle delete
    const handleDelete = async () => {
        if (movieToDelete) {
            try {
                await api.deleteMovie(movieToDelete);
                setMovies((prevMovies) =>
                    prevMovies.filter((movie) => movie.movieId !== movieToDelete)
                );
                setConfirmOpen(false);
                setMovieToDelete(null);
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };

    // Close confirmation dialog
    const closeConfirmDialog = () => {
        setConfirmOpen(false);
        setMovieToDelete(null);
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
                                justifyContent: 'space-between', // Ensures proper spacing for the delete button
                                flexDirection: 'column',
                                
                            }}
                        >
                            <CardActionArea onClick={() => handleCardClick(movie.movieId)}>
                                {/* Movie Poster */}
                                <CardMedia  
                                    component="img"
                                    height="300"
                                    image={movie.coverImageUrl || fallbackImage} // If no url is stored in the database load the fallback image 
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
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingBottom: '8px', // Extra space for button
                                }}
                            >

                                {/* Movie Title */}
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {movie.title}
                                </Typography>

                                {/* Movie Description */}
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2, // Limit to 2 lines
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {movie.description}
                                </Typography>

                            {/* Delete Button */}
                            </CardContent>    
                            <CardContent sx={{ textAlign: 'center', paddingTop: 0 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => openConfirmDialog(movie.movieId)}
                                    sx={{ marginTop: '10px', width: '90%' }} // Button styling
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            {/* Confirmation Dialog */}
            <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Are you sure you want to delete this movie?</DialogTitle>
                <DialogActions>
                    <Button onClick={closeConfirmDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MoviesList;