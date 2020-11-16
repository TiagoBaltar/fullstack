import React from "react";

const Weather = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return <div> Gathering data... </div>;
  } else {
    return (
      <div>
        <p>
          <b>Temperature</b> {data.current.temperature} celsius
        </p>
        <p>
          <img
            src={data.current.weather_icons}
            alt={data.current.weather_descriptions}
          ></img>
        </p>
        <p>
          <b>Wind</b> {data.current.wind_speed} mph, direction{" "}
          {data.current.wind_dir}
        </p>
      </div>
    );
  }
};

export default Weather;
