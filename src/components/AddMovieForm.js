import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import api from '../smdb-api';

const AddMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [status, setStatus] = useState('idle'); // State to track status

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            title,
            description,
            releaseDate,
            imageUrl,
            trailerUrl,
        };
        console.log(newMovie)
        api.post('/', newMovie)
            .then(() => {
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
            })
            .catch((error) => {
                setStatus('error');
                console.error('Error adding movie:', error);
                setTimeout(() => setStatus('idle'), 2000);
            });
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
                        />
                        {/* Image URL Field */}
                        <TextField
                            label="Image URL"
                            fullWidth
                            margin="normal"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        {/* Trailer URL Field */}
                        <TextField
                            label="Trailer URL"
                            fullWidth
                            margin="normal"
                            value={trailerUrl}
                            onChange={(e) => setTrailerUrl(e.target.value)}
                        />
                        {/* Submit Button */}
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
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddMovieForm;
