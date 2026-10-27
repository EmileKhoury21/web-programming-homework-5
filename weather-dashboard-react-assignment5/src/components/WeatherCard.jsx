import { getWeatherInfo } from '../api/weather.js';
import WeatherDetails from './WeatherDetails.jsx';

// The main card: city, icon, temperature, condition and the detail boxes
function WeatherCard({ weather }) {
  const { name, country, current } = weather;
  const { label, icon } = getWeatherInfo(current.weather_code);

  return (
    <section className="card">
      <div className="top">
        <div>
          <h2>{name}</h2>
          <p className="muted">{country}</p>
        </div>
        <div className="icon" role="img" aria-label={label}>{icon}</div>
      </div>

      <div className="temp">{Math.round(current.temperature_2m)}°C</div>
      <p className="condition">{label}</p>

      <WeatherDetails current={current} />
    </section>
  );
}

export default WeatherCard;
