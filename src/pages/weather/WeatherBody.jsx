import useFetch from "../../useFetch";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

const WeatherBody = ({ currentLocation, pointsData }) => {

    const forecastUrl = import.meta.env.VITE_NOAAWEATHER_URL + '/gridpoints/' + pointsData.properties.gridId + '/' + pointsData.properties.gridX + ',' + pointsData.properties.gridY + '/forecast';
    const headers = { 'User-Agent': '(ttsabbott.com, ttsabbott@gmail.com)' };
    const { data: forecastData, isPending: forecastIsPending, error: forecastError } = useFetch(forecastUrl, headers);

    return (
        <Container sx={{ bgcolor: "tomato", pb: 1, }}>
            <Typography variant="h5">
                {currentLocation.title}
            </Typography>
            <Typography variant="h6">
                Location: {pointsData.properties.relativeLocation.properties.city}, {pointsData.properties.relativeLocation.properties.state} &raquo;
                Timezone: {pointsData.properties.timeZone}
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {forecastIsPending && <div>Loading forecast...</div>}
                {forecastError && <div>{forecastError}</div>}
                {forecastData &&
                    (forecastData.properties.periods.map((period, index, array) => {
                        if (index % 2 == 0) {
                            return (
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
                                            {period.isDaytime ? "Hi:" : "Lo:"} {period.temperature} {period.temperatureUnit}
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
                                            {array[index + 1].isDaytime ? "Hi:" : "Lo:"} {array[index + 1].temperature} {array[index + 1].temperatureUnit}
                                        </Typography>
                                        <Typography component="div" sx={{ p: 0, m: 1, color: 'text.primary', fontSize: 10, }}>
                                            Wind: {array[index + 1].windSpeed} {array[index + 1].windDirection}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia sx={{ p: 0, m: 0, height: 130, }} image={array[index + 1].icon} />
                                    <CardContent sx={{ p: 0, m: 0, height: 150, }}>
                                        <Typography component="div" sx={{ p: 1, color: 'text.secondary', fontSize: 10, }}>{array[index + 1].detailedForecast}</Typography>
                                    </CardContent>
                                </Card>
                            );
                        }
                    }))
                }
            </Grid>
            {/* {forecastData && <pre>{JSON.stringify(forecastData, null, 2)}</pre>} */}
        </Container>
    );
};

export default WeatherBody;
