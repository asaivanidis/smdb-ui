import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';
import api from '../smdb-api';

const fallbackImage = 'https://fakeimg.pl/250x330'; // Fallback image URL

const MovieDetails = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true); // To show loading screen while fetching movie
    const [error, setError] = useState(false); // Track if the movie is found

    useEffect(() => {
        // Fetch movie details
        api.get(`/${id}`)
            .then((response) => {
                if(response.data){
                    setMovie(response.data)
                }
                else{
                    setError(true); // if the response does not contain data set the error to true
                }
                setLoading(false);
            })
            // Catch network error
            .catch((error) => {
                console.error('Error fetching movie details:', error);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    // Show a loading icon while fetching results
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // if movie is not found or there is a network error show this instead
    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Movie not found.</Typography>
            </Box>
        );
    }

    return (
        <Card
            sx={{
                maxWidth: 800,
                margin: '0 auto',
                backgroundColor: 'background.paper',
                padding: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
                gap: 2,
            }}
        >
            {/* Movie Poster */}
            <CardMedia
                component="img"
                image={movie.imageUrl || fallbackImage} // If no url is stored in the database load the fallback image
                alt={movie.title}
                sx={{
                    width: { xs: '100%', sm: '300px' },
                    height: 'auto',
                    borderRadius: 1,
                }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage; // If the image cannot be loaded load the fallback image
                }} 
            />
            <CardContent>
                {/* Movie Title */}
                <Typography variant="h5" gutterBottom>
                    {movie.title}
                </Typography>
                {/* Movie Description */}
                <Typography variant="body1" color="text.secondary" paragraph>
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
            </CardContent>
        </Card>
    );
};

export default MovieDetails;
