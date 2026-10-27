import { useEffect, useState } from 'react';
import { fetchWeather, getErrorMessage } from './api/weather.js';
import SearchBar from './components/SearchBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import Forecast from './components/Forecast.jsx';
import './App.css';

function App() {
  // The submitted search, e.g. { city: 'Beirut' }. A new object on every
  // search/retry, so the effect re-runs even when the city name is the same.
  const [query, setQuery] = useState(null);
  const [weather, setWeather] = useState(null);
  // 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSearch(city) {
    setQuery({ city });
    setStatus('loading');
  }

  function handleRetry() {
    setQuery({ city: query.city });
    setStatus('loading');
  }

  // Fetch the weather whenever a new query is submitted
  useEffect(() => {
    if (query === null) return;

    // Lets us cancel this request if a newer search starts before it finishes
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const data = await fetchWeather(query.city, controller.signal);
        setWeather(data);
        setStatus('success');
      } catch (err) {
        // Cancelled on purpose by the cleanup below: ignore it
        if (err.name === 'AbortError') return;
        setErrorMessage(getErrorMessage(err));
        setStatus('error');
      }
    }

    loadWeather();

    // Cleanup: runs before the next search (and when the app unmounts)
    return () => controller.abort();
  }, [query]);

  return (
    <main className="app">
      <p className="label">WEATHER <span>APP</span></p>
      <h1>Check the weather anywhere</h1>

      <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />

      <div className="status-row" aria-live="polite">
        {status === 'idle' && <p className="status">Search for a city</p>}
        {status === 'loading' && <LoadingSpinner city={query.city} />}
        {status === 'error' && (
          <ErrorMessage message={errorMessage} onRetry={handleRetry} />
        )}
        {status === 'success' && (
          <p className="status" data-state="success">Done!</p>
        )}
      </div>

      {status === 'success' && weather && (
        <div className="result">
          <WeatherCard weather={weather} />
          <Forecast daily={weather.daily} />
        </div>
      )}
    </main>
  );
}

export default App;
