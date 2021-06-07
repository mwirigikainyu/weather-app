import React, { Component } from "react";
import styled from "styled-components";

export default class App extends Component {
  state = {
    location: "",
  };

  render() {
    console.log(process.env);
    const handleInputDisplay = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            weather: data,
            cod: data.cod,
            weatherId: data.weather[0].id,
            iconUrl: data.weather[0].icon,
          });
        });
      reset();
    };

    const reset = () => {
      document.querySelector("input").value = "";
    };

    const link = `http://openweathermap.org/img/wn/${this.state.iconUrl}@4x.png`;

    return (
      <Wrapper>
        <Header>
          <Logo>
            <p>weather.app</p>
          </Logo>
          {this.state.cod === 200 && (
            <Weather>
              <h1>
                {this.state.weather.name}, {this.state.weather.sys.country}{" "}
              </h1>
              <img src={link} alt="icon" />
              <div>
                <p>{Math.floor(this.state.weather.main.temp)}°C </p>
                <p>{this.state.weather.weather[0].description}</p>
              </div>
            </Weather>
          )}
        </Header>

        <Panel>
          <Search>
            <input
              type="text"
              placeholder="Enter City..."
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
            />
          </Search>
          <Cities>
            <p>Nairobi</p>
            <p>Amsterdam</p>
            <p>Manchester</p>
            <p>Kigali</p>
            <p>Pretoria</p>
          </Cities>
          <h2>Weather Details</h2>
          {this.state.cod === 200 && (
            <Details>
              <li>
                Humidity: <span>{this.state.weather.main.humidity}%</span>
              </li>
              <li>
                Clouds: <span>{this.state.weather.clouds.all}%</span>
              </li>
              <li>
                Pressure: <span>{this.state.weather.main.pressure}hPa</span>
              </li>
              <li>
                Wind: <span>{this.state.weather.wind.speed}m/s</span>
              </li>
            </Details>
          )}
        </Panel>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.section`
  margin: 50px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Panel = styled.section`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  width: 40%;
  min-height: 100vh;
  color: grey;
  padding: 50px;
  h2 {
    border-top: 2px solid rgba(255, 255, 255, 0.25);
    padding-top: 30px;
  }
  @media (min-width: 760px) {
  }
`;

const Logo = styled.h2`
  font-weight: 100;
  p {
    padding-bottom: 10px;
    text-decoration: underline;
  }
`;
const Details = styled.ul`
  margin: 50px 0;
  li {
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    list-style: none;
    padding: 20px 0;
  }
`;

const Search = styled.div`
  text-align: center;
`;

const Cities = styled.div`
  color: #5a5a5a;
  font-size: 20px;
  margin: 30px;
  p {
    padding: 20px 50px;
  }
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid white;
  text-align: center;
  h1 {
    font-size: 120px;
  }
  img {
    margin: 0 20px;
  }
  p {
    font-size: 40px;
  }
  @media (min-width: 760px) {
    h1 {
      font-size: 80px;
    }
  }
`;
