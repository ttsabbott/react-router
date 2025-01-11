import { useState } from 'react';

import './Weather.css';

import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import useFetch from "../../useFetch";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import WeatherAppBar from './WeatherAppBar';
import WeatherBody from './WeatherBody';

const Weather = () => {

  const [locations, setLocations] = useState([
    { title: 'Tucson, AZ', selected: true, lat: 32.3060372, long: -111.0592288 },
    { title: 'Sedona, AZ', selected: false, lat: 34.869712, long: -111.760902 },
    { title: 'Delray Beach, FL', selected: false, lat: 26.455965, long: -80.102383 },
  ]);

  const [currentLocation, setCurrentLocation] = useState(locations[0]); // Default to first entry of locations array

  return (
    <Paper>
      <Typography sx={{ textAlign: 'center', color: 'text.primary', }}>Weather for {currentLocation.title}</Typography>
      <WeatherAppBar locations={locations} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
    </Paper>
  );

};

export default Weather;
