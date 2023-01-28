import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, handleCityChange }) => {
  return (
    <div className="button-box">
      <Button variant="warning" onClick={() => handleCityChange("current")}>
        Current Location
      </Button>
      {cities.map((city) => (
        <Button variant="warning" onClick={() => handleCityChange(city)}>
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
