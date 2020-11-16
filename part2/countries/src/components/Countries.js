import React from "react";
import Country from "./Country";
import Filter from "./Filter";

const Countries = ({ filter, onChange, countries, onClick, weather }) => {
  const newList = countries.filter((x) => {
    return x.name.toLowerCase().includes(filter.toLowerCase());
  });

  const tooManyResults = newList.length > 10;
  const singleResult = newList.length === 1;

  if (tooManyResults) {
    return (
      <div>
        <Filter value={filter} onChange={onChange} />
        <p>Too many countries</p>
      </div>
    );
  } else if (singleResult) {
    return (
      <div>
        <Filter value={filter} onChange={onChange} />
        <Country data={newList[0]} weather={weather} />
      </div>
    );
  } else {
    return (
      <div>
        <Filter value={filter} onChange={onChange} />
        {newList.map((x) => (
          <p key={x.name}>
            {x.name}{" "}
            <button name={x.name} onClick={onClick}>
              show
            </button>
          </p>
        ))}
      </div>
    );
  }
};

export default Countries;
