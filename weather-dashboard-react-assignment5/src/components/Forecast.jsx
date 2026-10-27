import { getWeatherInfo } from '../api/weather.js';

const DAY_NAMES = ['Today', 'Tomorrow', 'Day 3'];

// The 3-day forecast list
function Forecast({ daily }) {
  return (
    <section className="card">
      <h3 className="muted">3-day forecast</h3>
      <ul className="forecast">
        {daily.time.map((date, i) => {
          const { label, icon } = getWeatherInfo(daily.weather_code[i]);
          const max = Math.round(daily.temperature_2m_max[i]);
          const min = Math.round(daily.temperature_2m_min[i]);

          return (
            <li key={date}>
              <strong>{DAY_NAMES[i] ?? date}</strong>
              <div className="emoji" role="img" aria-label={label}>{icon}</div>
              {max}° / {min}°
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Forecast;
