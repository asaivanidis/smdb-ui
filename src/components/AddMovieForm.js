import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import api from '../smdb-api';

const AddMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [status, setStatus] = useState('idle'); // State to track status


    // Function to upload images
    const handleCoverUpload = async (event) => {
        const file = event.target.files[0];
    
        try {
          const response = await api.uploadFile(file);
          setCoverImage(response.url);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    };

      // Handle additional images upload
    const handleAdditionalUpload = async (event) => {
        const files = event.target.files;
        const newImages = [...additionalImages];

        try {
            for (const file of files) {
                const response = await api.uploadFile(file);
                newImages.push(response.url);
            }
            setAdditionalImages(newImages);
        } catch (error) {
            console.error('Error uploading additional images:', error);
            setStatus('error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const newMovie = {
            title,
            description,
            releaseDate,
            coverImageUrl: coverImage,
            unageUrls: additionalImages,
            trailerUrl,
        };

        try {
            console.log(newMovie) // log the movie object for debugging

            await api.addMovie(newMovie);
            // Movie added successfully
            setStatus('success'); 
            // Reset the form fields
            setTitle('');
            setDescription('');
            setReleaseDate('');
            setCoverImage('');
            setAdditionalImages('');
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
                        {/* Cover Image Upload */}
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ marginTop: 2 }}
                            disabled={status === 'loading'}
                        >
                            Upload Cover Image
                            <input
                                type="file"
                                hidden
                                onChange={handleCoverUpload}
                            />
                        </Button>
                        {coverImage && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography>Uploaded Cover Image:</Typography>
                                <img
                                    src={coverImage}
                                    alt="Cover"
                                    style={{ width: '100%', maxHeight: '300px' }}
                                />
                            </Box>
                        )}
                        {/* Additional Images Upload */}
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ marginTop: 2 }}
                            disabled={status === 'loading'}
                        >
                            Upload Additional Images
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={handleAdditionalUpload}
                            />
                        </Button>
                        {additionalImages.length > 0 && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography>Uploaded Additional Images:</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {additionalImages.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Additional ${index + 1}`}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
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
