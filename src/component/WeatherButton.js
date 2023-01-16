import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div className="button-box">
      <Button variant="warning">Current Location</Button>
      {cities.map((item) => (
        <Button variant="warning" onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
