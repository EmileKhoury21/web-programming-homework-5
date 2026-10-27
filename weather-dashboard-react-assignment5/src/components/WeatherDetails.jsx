// The four small boxes under the temperature
function WeatherDetails({ current }) {
  const details = [
    { label: 'Feels like', value: Math.round(current.apparent_temperature) + '°C' },
    { label: 'Humidity', value: current.relative_humidity_2m + '%' },
    { label: 'Wind', value: current.wind_speed_10m + ' km/h' },
    { label: 'Rain', value: current.precipitation + ' mm' },
  ];

  return (
    <div className="details">
      {details.map((detail) => (
        <div className="box" key={detail.label}>
          <p className="muted">{detail.label}</p>
          <p className="value">{detail.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;
