import React, { Component } from "react";
import "./App.css";
import Conditions from "./Conditions";

export default class App extends Component {
  state = {
    location: "",
  };

  render() {
    const handleInputDisplay = () => {
      const apiKey = "e5b167da4cd6935ce06b32d85105271b";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            weather: data,
            cod: data.cod,
          });
        });
      reset();
    };

    const reset = () => {
      document.querySelector("input").value = "";
    };

    return (
      <div>
        <div className="main-header">
          <h1>WEATHER APP</h1>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Enter City"
              onChange={(e) => {
                this.setState({
                  location: e.target.value,
                });
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleInputDisplay();
                }
              }}
            ></input>
            <button onClick={handleInputDisplay}>SEARCH</button>
          </div>
        </div>
        <Conditions data={this.state.weather} cod={this.state.cod} />
      </div>
    );
  }
}
