import React, { useState } from 'react';
import cities from '../data/cities.json';
import { City } from '../utils/types';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface Props {
  onSelectCity: (city: City) => void;
}

const CitySelector: React.FC<Props> = ({ onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  };

  const handleSubmit = () => {
    const city = cities.find(c => c.city === selectedCity) || null;
    if (city) {
      onSelectCity(city);
    }
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel>Select a city</InputLabel>
      <Select
        value={selectedCity}
        onChange={handleChange}
        label="Select a city"
      >
        {cities.map(city => (
          <MenuItem key={city.city} value={city.city}>
            {city.city}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default CitySelector;
