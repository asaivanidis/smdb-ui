import React, { useState } from 'react';
import api from '../smdb-api';

const AddMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            title,
            description,
            releaseDate,
            imageUrl: imageUrl,
            trailerUrl: trailerUrl || null, // Allow trailer URL to be empty
        };

        console.log('Payload:', newMovie); // Log the request object for debugging

        api.post('/', newMovie)
            .then(() => {
                alert('Movie added successfully!');
                setTitle('');
                setDescription('');
                setReleaseDate('');
                setImageUrl('');
                setTrailerUrl('');
            })
            .catch(error => console.error('Error adding movie:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <h2>Add Movie</h2>
            <div className="mb-3">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Release Date</label>
                <input type="date" className="form-control" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Image URLs</label>
                <input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Trailer URL</label>
                <input type="text" className="form-control" value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success">Add Movie</button>
        </form>
    );
};

export default AddMovieForm;