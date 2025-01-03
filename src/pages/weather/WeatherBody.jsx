import * as React from 'react';

import useFetch from "../../useFetch";

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AcUnit from '@mui/icons-material/AcUnit';
import AdbIcon from '@mui/icons-material/Adb';
import Add from '@mui/icons-material/Add';

// import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
// import { green, orange } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material';

const WeatherBody = ({ pointsData }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#013e87",
            },
            secondary: {
                main: "#2e74c9",
            },
        },
        // status: {
        //   danger: orange[500],
        // },
    });

    const baseUrl = import.meta.env.VITE_NOAAWEATHER_URL;
    //const pointsUrl = baseUrl + '/points/32.3060372,-111.0592288';
    //const forecastUrl = baseUrl + '/gridpoints/TWC/88,53/forecast';
    const forecastUrl = baseUrl + '/gridpoints/' + pointsData.properties.gridId + '/' + pointsData.properties.gridX + ',' + pointsData.properties.gridY + '/forecast';
    //const forecastHourlyUrl = baseUrl + '/gridpoints/TWC/88,53/forecast/hourly';
    const headers = { 'User-Agent': '(ttsabbott.com, ttsabbott@gmail.com)' };
    const { data: forecastData, isPending, error } = useFetch(forecastUrl, headers);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ bgcolor: "tomato", p: 2 }}>
                <Typography variant="h5" sx={{ p: 1 }}>
                    Location: {pointsData.properties.relativeLocation.properties.city}, {pointsData.properties.relativeLocation.properties.state}
                </Typography>
                <Typography variant="h6" sx={{ p: 1 }}>
                    Timezone: {pointsData.properties.timeZone}
                </Typography>
                <Box
                    sx={{
                        // flexGrow: 1,
                        // width: { xs: '100%', sm: '50%', md: '25%' },
                        // maxWidth: 'md',
                        // width: 1,
                        pb: 2, // pb = padding-bottom
                        // display: "flex",
                        // flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        gap: 4,
                    }}>
                    <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {isPending && <div>Loading forecast...</div>}
                        {error && <div>{error}</div>}
                        {forecastData &&
                            (forecastData.properties.periods.map((period, index, array) => (
                                <>
                                    {
                                        index % 2 == 0 ? (
                                            <>
                                                <Card key={period.number} sx={{ width: 140, }} elevation={12}>
                                                    <CardHeader
                                                        title={period.startTime.substring(0, 10)}
                                                        titleTypographyProps={{ p: 1, color: 'text.secondary', bgcolor: 'grey', fontSize: 14, }}
                                                        subheader={period.name}
                                                        subheaderTypographyProps={{ p: 1, color: 'text.secondary', bgcolor: 'lightgrey', fontSize: 12, }}
                                                        sx={{ p: 0, m: 0, }}
                                                    />
                                                    <CardContent sx={{ p: 0, m: 0, }}>
                                                        <Typography component="div" sx={{ p: 0, m: 1, color: 'text.primary', fontSize: 12, }}>
                                                            Hi: {period.temperature} {period.temperatureUnit}
                                                            {/* / Lo: {array[index + 1].temperature} {array[index + 1].temperatureUnit} */}
                                                        </Typography>
                                                        <Typography component="div" sx={{ p: 0, m: 1, color: 'text.primary', fontSize: 10, }}>
                                                            Wind: {period.windSpeed} {period.windDirection}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardMedia sx={{ p: 0, m: 0, height: 130, }} image={period.icon} />
                                                    <CardContent sx={{ p: 0, m: 0, height: 150, }}>
                                                        <Typography component="div" sx={{ p: 1, color: 'text.secondary', fontSize: 10, }}>{period.detailedForecast}</Typography>
                                                    </CardContent>
                                                    <CardHeader
                                                        subheader={array[index + 1].name}
                                                        subheaderTypographyProps={{ p: 1, color: 'text.secondary', bgcolor: 'lightgrey', fontSize: 12, }}
                                                        sx={{ p: 0, m: 0, }}
                                                    />
                                                    <CardContent sx={{ p: 0, m: 0, }}>
                                                        <Typography component="div" sx={{ p: 0, m: 1, color: 'text.primary', fontSize: 12, }}>
                                                            Lo: {array[index + 1].temperature} {array[index + 1].temperatureUnit}
                                                        </Typography>
                                                        <Typography component="div" sx={{ p: 0, m: 1, color: 'text.primary', fontSize: 10, }}>
                                                            Wind: {array[index + 1].windSpeed} {array[index + 1].windDirection}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardMedia sx={{ p: 0, m: 0, height: 130, }} image={array[index + 1].icon} />
                                                    <CardContent sx={{ p: 0, m: 0, height: 150, }}>
                                                        {/* <Typography component="div" sx={{ p: 1, color: 'text.secondary', fontSize: 14, }}>{array[index + 1].name}</Typography> */}
                                                        <Typography component="div" sx={{ p: 1, color: 'text.secondary', fontSize: 10, }}>{array[index + 1].detailedForecast}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </>
                            )))
                        }
                    </Grid>
                </Box>
                {/* {forecastData &&
                    <>
                        <pre>
                            {JSON.stringify(forecastData, null, 2)}
                        </pre>
                    </>
                } */}
            </Container>
        </ThemeProvider >
    );
};

export default WeatherBody;
