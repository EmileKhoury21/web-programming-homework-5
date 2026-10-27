// Open-Meteo is free and needs no API key.
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

// Turn the weather code from Open-Meteo into a label and an icon
export function getWeatherInfo(code) {
  if (code === 0) return { label: 'Clear sky', icon: '☀️' };
  if (code <= 2) return { label: 'Partly cloudy', icon: '⛅' };
  if (code === 3) return { label: 'Cloudy', icon: '☁️' };
  if (code <= 48) return { label: 'Fog', icon: '🌫️' };
  if (code <= 67) return { label: 'Rain', icon: '🌧️' };
  if (code <= 77) return { label: 'Snow', icon: '❄️' };
  if (code <= 82) return { label: 'Showers', icon: '🌦️' };
  if (code <= 86) return { label: 'Snow showers', icon: '🌨️' };
  return { label: 'Thunderstorm', icon: '⛈️' };
}

// Fetch a URL and return the JSON. Throws if the status is not ok (404, 500...)
async function getJSON(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}

// City name -> latitude, longitude -> forecast.
// `signal` lets the caller cancel both requests (see the effect in App.jsx).
export async function fetchWeather(city, signal) {
  // 1. Find the city
  const geo = await getJSON(
    GEO_URL + '?name=' + encodeURIComponent(city) + '&count=1',
    signal,
  );

  if (!geo.results || geo.results.length === 0) {
    throw new Error('not-found');
  }

  const place = geo.results[0];

  // 2. Get the weather for that place
  const url = FORECAST_URL
    + '?latitude=' + place.latitude
    + '&longitude=' + place.longitude
    + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min'
    + '&forecast_days=3&timezone=auto';
  const data = await getJSON(url, signal);

  if (!data.current || !data.daily) {
    throw new Error('bad-response');
  }

  return {
    name: place.name,
    country: place.country ?? '',
    current: data.current,
    daily: data.daily,
  };
}

// Turn an error into a message a person understands
export function getErrorMessage(err) {
  if (err.message === 'not-found') {
    return 'City not found. Check the spelling.';
  }
  return "Couldn't reach the server. Check your connection and try again.";
}
