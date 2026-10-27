import { useState } from 'react';

// The search form. It owns the text being typed and only tells
// the parent (App) about the city once the form is submitted.
function SearchBar({ onSearch, isLoading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setText(e.target.value);
    if (error) setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const city = text.trim();

    if (city === '') {
      setError('Please enter a city name.');
      return;
    }

    onSearch(city);
  }

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label htmlFor="city-input" className="visually-hidden">City name</label>
      <input
        id="city-input"
        type="text"
        placeholder="Enter a city"
        value={text}
        onChange={handleChange}
        aria-invalid={error !== ''}
        aria-describedby={error ? 'city-error' : undefined}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && (
        <p id="city-error" className="field-error">{error}</p>
      )}
    </form>
  );
}

export default SearchBar;
