import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CityWeather from './components/CityWeather';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Weather App
        </Typography>
        <CityWeather />
      </Box>
    </Container>
  );
};

export default App;
