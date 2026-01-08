import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

 const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch {
      setWeather(null);
      setError("City not found");
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-card">
        <h1 className="title">Weather Report</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="result">
            <h2>{weather.name}</h2>
            <p>🌡 {weather.main.temp} °C</p>
            <p>🌥 {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
