import './Weather.css';

import { useState } from "react";

import useFetch from "../../useFetch";

import WeatherAppBar from './WeatherAppBar';
import WeatherBody from './WeatherBody';

const Weather = () => {

  const [locations, setLocations] = useState([
    { title: 'Tucson, AZ', selected: true, lat: 32.3060372, long: -111.0592288, },
    { title: 'Sedona, AZ', selected: false, lat: 34.869712, long: -111.760902, },
    { title: 'Delray Beach, FL', selected: false, lat: 26.455965, long: -80.102383, },
  ]);

  const [currentLocation, setCurrentLocation] = useState(locations[0]); // Default to first entry of locations array

  const [pointsUrl, setPointsUrl] = useState(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + currentLocation.lat + ',' + currentLocation.long);
  const headers = { 'User-Agent': '(ttsabbott.com, ttsabbott@gmail.com)' };
  const { data: pointsData, isPending: pointsIsPending, error: pointsError } = useFetch(pointsUrl, headers);

  return (
    <div className="weather">

      <WeatherAppBar locations={locations} setCurrentLocation={setCurrentLocation} setPointsUrl={setPointsUrl} pointsData={pointsData} pointsIsPending={pointsIsPending} pointsError={pointsError} />

      {pointsIsPending && <div>Loading points data...</div>}
      {pointsError && <div>{pointsError}</div>}
      {pointsData &&
        <WeatherBody currentLocation={currentLocation} pointsData={pointsData} />
      }

    </div>
  );

};

export default Weather;
