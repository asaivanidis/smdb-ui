import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { addMovie } from '../smdb-api';

const AddMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [status, setStatus] = useState('idle'); // State to track status

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const newMovie = {
            title,
            description,
            releaseDate,
            imageUrl,
            trailerUrl,
        };

        try {
            console.log(newMovie) // log the movie object for debugging

            await addMovie(newMovie);
            // Movie added successfully
            setStatus('success'); 
            // Reset the form fields
            setTitle('');
            setDescription('');
            setReleaseDate('');
            setImageUrl('');
            setTrailerUrl('');

            // Hide success message after 2 seconds
            setTimeout(() => setStatus('idle'), 2000);
        }
        catch (error){
            setStatus('error');
            console.error('Error adding movie:', error);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Add a New Movie
            </Typography>
            <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: 'background.paper' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {/* Title Field */}
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={status === 'loading'}
                        />
                        {/* Description Field */}
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled={status === 'loading'}
                        />
                        {/* Release Date Field */}
                        <TextField
                            label="Release Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            slotProps={{inputLabel: {shrink : true}}}
                            required
                            disabled={status === 'loading'}
                        />
                        {/* Image URL Field */}
                        <TextField
                            label="Image URL"
                            fullWidth
                            margin="normal"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            disabled={status === 'loading'}
                        />
                        {/* Trailer URL Field */}
                        <TextField
                            label="Trailer URL"
                            fullWidth
                            margin="normal"
                            value={trailerUrl}
                            onChange={(e) => setTrailerUrl(e.target.value)}
                            disabled={status === 'loading'}
                        />
                        {/* Submit Button */}
                        <Box sx={{ marginTop: 2, position: 'relative' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color={
                                    status === 'success'
                                        ? 'success'
                                        : status === 'error'
                                        ? 'error'
                                        : 'primary'
                                }
                                fullWidth
                                disabled={status === 'loading'}
                                sx={{
                                    marginTop: 2,
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                {status === 'success'
                                    ? 'Movie Added!'
                                    : status === 'error'
                                    ? 'Adding Failed'
                                    : 'Add Movie'}
                            </Button>
                            {status === 'loading' && (
                                <CircularProgress // Add a spinner while waiting for the result
                                    size = {24}
                                    sx = {{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)', // Center the spinner
                                        pointerEvents: 'none', // Allow clicks to pass through
                                    }}
                                />
                            )}
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddMovieForm;
