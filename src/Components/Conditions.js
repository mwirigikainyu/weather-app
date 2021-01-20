import "./App.css";
import React, { useEffect } from "react";

export default function Conditions(props) {
  useEffect(() => {
    console.log("useEffect running...");
  });
  return (
    <div>
      {props.cod === 200 ? (
        <div className={"card"}>
          <p>
            <strong>
              {props.data.name}, {props.data.sys.country}
            </strong>
          </p>
          <p>
            It is currently {Math.floor(props.data.main.temp)}°c with{"  "}
            {props.data.weather[0].description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
