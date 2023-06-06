import React, { useState, useEffect } from "react";
import getWeather from "../services/weather"

const WeatherContainer = ({cityName}) => {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        getWeather(cityName).then(returnedObject => {
          setWeatherData(returnedObject);
        });
      }, [cityName]);
      if (!weatherData) {
        return <div>Loading...</div>;
      }

      return (
        <div>
            <h1>Weather in {cityName}</h1>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      );
    };    

export default WeatherContainer