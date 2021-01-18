import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    location: "",
  };

  render() {
    const handleInputDisplay = (e) => {
      const apiKey = "e5b167da4cd6935ce06b32d85105271b";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
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
      </div>
    );
  }
}
