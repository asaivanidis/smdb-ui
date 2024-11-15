import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import AddMovieForm from './components/AddMovieForm';

const App = () => {
    return (
        <div className="container">
            <nav className="my-4">
                <Link to="/" className="btn btn-primary me-2">Home</Link>
                <Link to="/add" className="btn btn-success">Add Movie</Link>
            </nav>
            <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="/add" element={<AddMovieForm />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </div>
    );
};

export default App;