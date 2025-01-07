import * as React from 'react';

import './Weather.css';

import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import useFetch from "../../useFetch";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import WeatherAppBar from './WeatherAppBar';
import WeatherBody from './WeatherBody';

const Weather = () => {

  // const [searchTerm, setSearchTerm] = React.useState('');
  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  //   console.log('inside App.handleSearch, event.target.value: ' + event.target.value);
  // };
  // const handleClear = (event) => {
  //   setSearchTerm('');
  // };

  const locations = [
    { title: 'Tucson, AZ', selected: true, lat: 32.3060372, long: -111.0592288, },
    { title: 'Sedona, AZ', selected: false, lat: 34.869712, long: -111.760902, },
    { title: 'Delray Beach, FL', selected: false, lat: 26.455965, long: -80.102383, },
  ];

  const [currentLocation, setCurrentLocation] = React.useState(locations[0]); // Default to first entry of locations array

  const [pointsUrl, setPointsUrl] = React.useState(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + currentLocation.lat + ',' + currentLocation.long);
  const headers = { 'User-Agent': '(ttsabbott.com, ttsabbott@gmail.com)' };
  const { data: pointsData, isPending, error } = useFetch(pointsUrl, headers);

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here, e.g., send data to API
  //   console.log('Form submitted:', formData);
  // };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   ...theme.applyStyles('dark', {
  //     backgroundColor: '#1A2027',
  //   }),
  // }));

  return (
    <div className="weather">

      {/* <h2>Weather</h2> */}

      <WeatherAppBar locations={locations} setCurrentLocation={setCurrentLocation} setPointsUrl={setPointsUrl} pointsData={pointsData} />

      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {pointsData &&
        <WeatherBody currentLocation={currentLocation} pointsData={pointsData} />
      }

      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Item>size=8</Item>
          </Grid>
          <Grid size={4}>
            <Item>size=4</Item>
          </Grid>
          <Grid size={4}>
            <Item>size=4</Item>
          </Grid>
          <Grid size={8}>
            <Item>size=8</Item>
          </Grid>
        </Grid>
      </Box> */}

      {/* <hr /> */}

      {/* <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container> */}

      {/* <hr /> */}

      {/* <Search onSearch={handleSearch} /> */}
      {/* <Search onSearch={handleSearch} search={searchTerm} onClear={handleClear} /> */}
      {/* list={searchedStories} /> */}

      {/* <hr /> */}

      {/* {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {pointsData &&
        <div className="data">
          <article>
            <pre>{JSON.stringify(pointsData, null, 2)}</pre>
          </article>
        </div>
      } */}

    </div>
  );

};

{/* another way to define the Search, thus eliminating the function's block body */ }
const Search = ({ search, onSearch, onClear, props }) => {

  // const { classes } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Email:', email, 'Password: ', password);
    // You should see email and password in console.
    // ..code to submit form to backend here...
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"
        value={search}
        onChange={onSearch}
      />
      <button id="clear" onClick={onClear}>Clear</button>
      <p>
        Searching for <strong>{search}</strong>
      </p>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div>
            {/* <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            /> */}
            {/* <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            /> */}
            {/* <TextField
              required
              id="outlined-number"
              label="Enter Zip Code"
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            /> */}
            <TextField id="outlined-search" label="Search field" type="search" />
            {/* <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            /> */}
            <Button variant="contained">Search</Button>
          </div>
          {/* <div>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue="Hello World"
              variant="filled"
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="filled"
            />
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
            <TextField
              id="filled-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              variant="filled"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="filled-number"
              label="Number"
              type="number"
              variant="filled"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
            />
            <TextField
              id="filled-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="filled"
            />
          </div> */}
          {/* <div>
            <TextField
              required
              id="standard-required"
              label="Required"
              defaultValue="Hello World"
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              variant="standard"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
            />
            <TextField
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="standard"
            />
          </div> */}
        </Box>
      </Container>
      <Paper elevation={3}>
        {/* className={classes.root}> */}
        <form
          //  className={classes.container}
          onSubmit={handleSubmit}
        >
          <TextField
            // ....
            value={email}
            onInput={e => setEmail(e.target.value)}
          // .....

          />
          <TextField
            // ....
            value={password}
            onInput={e => setPassword(e.target.value)}
          // ....
          />
          <Typography />
          {/* className={classes.divider} /> */}
          <Button
            type="submit"
          //  ....
          // className={classes.button}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

/*
const Search = (props) => {
  // const [searchTerm, setSearchTerm] = React.useState('');
  //let searchTerm = '';
  // const handleChange = (event) => {
  //   // setSearchTerm(event.target.value);
  //   // C
  //   props.onSearch(event);
  //   // searchTerm = event.target.value;
  //   // synthetic event
  //   // console.log('inside Search.handleChange, event: ' + JSON.stringify(event));
  //   // value of target (here: input HTML element)
  //   console.log('inside Search.handleChange, event.target.value: ' + event.target.value);
  //   // event.preventDefault();
  // };
  const handleBlur = (event) => {
    // synthetic event
    // console.log('inside Search.handleBlur, event: ' + JSON.stringify(event));
    // value of target (here: input HTML element)
    console.log('inside Search.handleBlur, event.target.value: ' + event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"
        //onChange={handleChange}
        onChange={props.onSearch}
        onBlur={handleBlur} />
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  );
};
*/

export default Weather;
