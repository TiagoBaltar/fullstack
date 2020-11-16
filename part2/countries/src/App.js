import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [capital, setCapital] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios //
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (capital !== "") {
      const API_KEY = process.env.REACT_APP_API_KEY;
      axios //
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [capital]);

  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleShowButton = (event) => {
    const capital = countries.find((x) => x.name === event.target.name).capital;
    setCapital(capital);
    setFilter(event.target.name);
  };

  return (
    <div>
      <Countries
        filter={filter}
        onChange={handleFilterChange}
        countries={countries}
        onClick={handleShowButton}
        weather={weather}
      />
    </div>
  );
};

export default App;
