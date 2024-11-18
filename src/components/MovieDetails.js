import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardMedia, CircularProgress, Button, Grid2 } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import api from '../smdb-api';

const fallbackImage = 'https://fakeimg.pl/250x330'; // Fallback image URL

const MovieDetails = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true); // To show loading screen while fetching movie
    const [errorFetching, setErrorFetching] = useState(false); // Track if the movie is found

    const navigate = useNavigate();


    // Fetch movie details
    useEffect(() => {
        const fetchMovieById = async () => {
        try{
            const response = await api.fetchMovieById(id);
            if(response){
                setMovie(response);
            }
            else{
                setErrorFetching(true);
            }
            setLoading(false);
        }
        catch (error){
            setErrorFetching(true);
            setLoading(false);
            console.error(`Error fetching the movie with id ${id}`, error);
        }
    }
    fetchMovieById(id);

    }, [id]);

    // Show a loading icon while fetching results
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // if movie is not found or there is a network error show this instead
    if (errorFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6">Movie not found.</Typography>
            </Box>
        );
    }

    // Navigate to the edit movie page
    const handleEdit = () => {
        navigate(`/edit/${id}`, { state: { movie } });
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={12} sm={4}>
                        {/* Movie Poster */}
                        <CardMedia
                            component="img"
                            image={movie.coverImageUrl || fallbackImage} // If no url is stored in the database load the fallback image
                            alt={movie.title}
                            sx={{
                                width: { xs: '100%', sm: '300px' },
                                height: 'auto',
                                borderRadius: 2,
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackImage; // If the image cannot be loaded load the fallback image
                            }} 
                        />
                    </Grid2>
                
                 
                    {/* Movie Details */}
                    <Grid2 item xs={12} sm={8}>
                        {/* Movie Title */}
                        <Typography variant="h5" gutterBottom>
                            {movie.title}
                        </Typography>

                        {/* Movie Description */}
                        <Typography variant="body1" color="text.secondary" component="p" style={{whiteSpace: 'pre-line'}}>
                            {movie.description}
                        </Typography>

                        {/* Release Date */}
                        <Typography variant="body2" color="text.secondary">
                            <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
                        </Typography>

                        {/* Trailer Link */}
                        {movie.trailerUrl && (
                            <Typography variant="body2" sx={{ marginTop: 2 }}>
                                <a
                                    href={movie.trailerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: '#03dac6' }}
                                >
                                    Watch Trailer
                                </a>
                            </Typography>
                        )}
                        
                    </Grid2>
                </Grid2>
                
                {/* Images Carousel */}
                {movie.imageUrls?.length > 0 && (
                    <Box sx={{ marginTop: 5, paddingLeft: 10, paddingRight: 10 }}> 
                        <Carousel
                            autoPlay={true}
                            animation="slide"
                            indicators={true}
                            navButtonsAlwaysVisible={true}
                            sx={{ borderRadius: 2 }}
                        >
                            {movie.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '20px',
                                    }}
                                />
                            ))}
                        </Carousel>
                    </Box>
                )}
                {/* Edit Button */}
                <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                            <Button variant="contained" color="primary" onClick={handleEdit}>
                                Edit Movie
                            </Button>
                        </Box>
            </Card>
        </Box>
    );
};

export default MovieDetails;



