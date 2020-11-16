import React from "react";
import Weather from "./Weather";

const Country = ({ data, weather }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>capital {data.capital}</p>
      <p>population {data.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {data.languages.map((x) => (
          <li key={x.name}>{x.name}</li>
        ))}
      </ul>
      <img src={data.flag} width="100" alt="Flag" />
      <h2>Weather in {data.capital}</h2>
      <Weather data={weather} />
    </div>
  );
};

export default Country;
