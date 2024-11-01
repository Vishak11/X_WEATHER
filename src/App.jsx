import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: '3c35f9f7c0bb44fbb00145240240111', 
          q: city,
        },
      });
      setWeatherData(response.data.current);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Weather App</h1>
      
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        style={{ padding: '8px', marginRight: '10px', width: '200px' }}
      />
      <button onClick={fetchWeatherData} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
        Search
      </button>

      {loading && <p>Loading data…</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className="weather-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px',color:"black" }}>
          <div className="weather-card" style={cardStyle}>
            <h3>Temperature</h3>
            <p>{weatherData.temp_c}°C</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Humidity</h3>
            <p>{weatherData.humidity}%</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Condition</h3>
            <p>{weatherData.condition.text}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Wind Speed</h3>
            <p>{weatherData.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  width: '150px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

export default App;
