import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MoviesList from './components/MoviesList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetails from './components/MovieDetails';

// Import logo icon
import Logo from './media/smdb-icon.png';

// Create a dark theme using Material UI
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Primary color
        },
        secondary: {
            main: '#03dac6', // Secondary color
        },
        background: {
            default: '#252626', // Background color for the app
            paper: '#2b2b2b', // Background color for components
        },
        text: {
            primary: '#ffffff', // Primary text color
            secondary: '#b3b3b3', // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* Apply dark theme to the entire app */}
            
            {/* Navigation Bar */}
            <AppBar position="static" sx={{ backgroundColor: darkTheme.palette.background.paper }}>
                <Toolbar>
                    {/* Clickable Icon and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        marginRight: '10px',
                                    }}
                                />
                                <Typography variant="h6">Simple Movie Database</Typography>
                            </Box>
                        </Link>
                    </Box>
                    {/* Add movie button */}
                    <Button color="inherit" component={Link} to="/add">
                        Add Movie
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ padding: 3 }}>
                <Routes>
                    <Route path="/" element={<MoviesList />} />
                    <Route path="/add" element={<AddMovieForm />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
