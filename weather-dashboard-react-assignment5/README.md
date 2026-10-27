# React Weather Dashboard — Assignment 5
## Features

- Search any city (submit with the button or the Enter key)
- Input validation: empty searches show "Please enter a city name." and surrounding spaces are trimmed
- Current weather: city, country, icon, temperature and condition
- Details: feels like, humidity, wind speed and rain
- 3-day forecast with icons and max / min temperatures
- Loading state with a spinner, and the Search button is disabled while loading
- Friendly error messages ("City not found…" / "Couldn't reach the server…") with a **Retry** button
- Older requests are cancelled when a new search starts, so a slow response can never replace a newer result
- Responsive layout for desktop, tablet and phone

## Technologies

- **React 19**: function components and hooks (`useState`, `useEffect`)
- **Vite**: dev server and build tool
- **JavaScript (JSX)** and **CSS** (Flexbox, Grid, media queries)
- **[Open-Meteo API](https://open-meteo.com/)**: free and needs **no API key**
  - Geocoding: `https://geocoding-api.open-meteo.com/v1/search` (city → latitude/longitude)
  - Forecast: `https://api.open-meteo.com/v1/forecast` (current weather + 3-day forecast)

Because Open-Meteo needs no key, the project has no `.env` file and no secrets.

## Project structure

'''
weather-app/
├── index.html              # HTML shell with the #root div
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # Mounts <App /> into #root
    ├── App.jsx             # Owns the state + the data-fetching effect
    ├── App.css             # Layout and component styles
    ├── index.css           # Color tokens and base element styles
    ├── api/
    │   └── weather.js      # fetchWeather(), getWeatherInfo(), getErrorMessage()
    └── components/
        ├── SearchBar.jsx
        ├── LoadingSpinner.jsx
        ├── ErrorMessage.jsx
        ├── WeatherCard.jsx
        ├── WeatherDetails.jsx
        └── Forecast.jsx
```

 How to run the project


 check if we have node installed by using the command node -v

### Step 1: Get the project


```

### Step 1: Install the dependencies

npm install

### Step 2: Start the dev server


npm run dev


After a few seconds, the terminal shows a link,`http://localhost:5173/`.
Open this link in my browser and the app will be there. When I change the code and save,
the page updates by itself.

To stop the server, go back to the terminal and press `Ctrl + C`.

**Note:** The app needs internet to get the weather, so no API keys are required

