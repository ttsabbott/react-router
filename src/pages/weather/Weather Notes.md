# How to create weather url:
<code>
  const [pointsUrl, setPointsUrl] = React.useState(import.meta.env.VITE_NOAAWEATHER_URL + '/points/' + currentLocation.lat + ',' + currentLocation.long);
 </code>

# Example URLs:
  - points: https://api.weather.gov/points/32.3060372,-111.0592288
  - forecast: https://api.weather.gov/gridpoints/TWC/88,53/forecast
  - forecastHourly: https://api.weather.gov/gridpoints/TWC/88,53/forecast/hourly

  - Sedona -> https://api.weather.gov/points/34.869712,-111.760902 --> FGZ 68 75
  - Delray Beach -> https://api.weather.gov/points/26.455965,-80.102383 --> MFL 110 81

  - https://www.weather.gov/documentation/services-web-api
  - https://weather-gov.github.io/api/general-faqs

  - https://api.weather.gov/gridpoints/TWC/92,55/forecast
  - https://api.weather.gov/gridpoints/TWC/92,55/forecast/hourly
  - https://api.weather.gov/gridpoints/TOP/32,81/forecast
  - https://api.weather.gov/gridpoints/TOP/32,81/forecast/hourly

# Try this method:
<pre>
  const [fetchError, result] ?= await fetch("https://example.com/data");
  if (fetchError) {
    console.error(fetchError);
    return < p>Error fetching data</ p>;
  }
  const [parseError, data] ?= await result.json();
  if (parseError) {
    console.error(parseError);
    return < p>Error parsing data</ p>;
  }
  return
    < div>
      < h2>Weather</ h2>
      < p>{data.weather}</ p>
    </ div>;
</pre>

# Or this method:
<code>
  async function getData() {

    const [fetchError, response] ?= await fetch("https://api.example.com/data");

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return;
    }

    const [jsonError, jsonData] ?= await response.json();

    if (jsonError) {
      console.error("JSON error:", jsonError);
      return;
    }

    return jsonData;

  }
</code>  
