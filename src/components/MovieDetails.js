import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../smdb-api';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        api.get(`/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
            {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="img-fluid" />}
            {movie.trailerUrl && <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">Watch Trailer</a>}
        </div>
    );
};

export default MovieDetails;