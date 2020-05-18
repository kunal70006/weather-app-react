import React, { useState } from "react";

const api = {
  url: `https://api.openweathermap.org/data/2.5/weather?q=`,
  key: "ab350d04ca358d5361ca121f7424efa2",
};

const dateBuilder = (d) => {
  let dd = String(d.getDate()).padStart(2, "0");
  let mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = d.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const response = await fetch(
        `${api.url}${query}&units=metric&APPID=${api.key}`
      );
      const data = await response.json();
      setWeather(data);
      setQuery("");
      console.log(data);
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? Math.round(weather.main.temp) > 20
            ? "warm app"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="humid">Humidity: {weather.main.humidity}%</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
