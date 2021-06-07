import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTint, faCloud, faSortAmountUpAlt, faWind } from '@fortawesome/free-solid-svg-icons'

export default class App extends Component {
  state = {
    location: "",
  };

  render() {
    const reset = () => {
      document.querySelector("input").value = "";
    };

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

    const link = `http://openweathermap.org/img/wn/${this.state.iconUrl}@4x.png`;

    return (
      <Wrapper>
        <Logo>
          <h1><span>☁️ </span>Weather.app</h1>
        </Logo>

        <Search>
          <input
            type="text"
            placeholder="Search for Location..."
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

        {this.state.cod === 200 && (
          <Weather>
            <Icons>
              <h2>
                {this.state.weather.name}, {this.state.weather.sys.country}{" "}
              </h2>
              <img src={link} alt="icon" />
              <div>
                <span>{Math.floor(this.state.weather.main.temp)}° </span>
                <p>{this.state.weather.weather[0].description}</p>
              </div>
            </Icons>
            <Details>
              <ul>
                <li>
                  <span><FontAwesomeIcon icon={faTint} /> Humidity:</span>{this.state.weather.main.humidity}%
                </li>
                <li>
                  <span><FontAwesomeIcon icon={faCloud} /> Clouds:</span> {this.state.weather.clouds.all}%
                </li>
                <li>
                  <span><FontAwesomeIcon icon={faSortAmountUpAlt} /> Pressure:</span>{this.state.weather.main.pressure}hPa
                </li>
                <li>
                  <span><FontAwesomeIcon icon={faWind} /> Wind:</span> {this.state.weather.wind.speed}m/s
                </li>
              </ul>
            </Details>
          </Weather>
        )}

        <footer><FontAwesomeIcon icon={faCoffee} /> Developed by Michelle Kainyu</footer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
@media only screen and (min-width: 800px){
  width: 800px;
}
@media (max-width: 900px) and (min-width: 800px){
  width: 700px;
}
@media only screen and (max-width: 800px){
  width: 450px;
}
@media only screen and (max-width: 500px){
  width: 300px;
}
@media only screen and (max-width: 350px){
  width: 100%;
}

width: 1000px;
`;

const Logo = styled.nav`
color: #3c94faa7;
text-align: center;
padding: 10px 20px;
margin: 10px 0;
`;
const Search = styled.div`
display: flex;
justify-content: center;
input{
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  background-color: white;
  font-size: medium;
  &:focus{
    outline: none;
    border: 2px solid #3c94faa7;
  }
}
`;
const Weather = styled.div`
color: #3c94faa7;
padding: 20px;
background-color: white;
border-radius: 10px;
margin: 10px 0;
display: flex;
justify-content: space-evenly;
@media only screen and (max-width: 800px){
  display: grid;
}
span{
  font-size: 100px;
}
`;
const Icons = styled.div`
@media only screen and (max-width: 500px){
  img{
    width: 50%;
  }
  span{
    font-size: 50px;
  }
}
@media only screen and (max-width: 350px){
  flex-direction: column;
}
position: relative;
display: flex;
align-items: center;
h2{
  font-weight: bold;
  position: absolute;
  top: 0;
  font-size: 20px;
}
`;
const Details = styled.div`
font-size: 20px;
padding: 20px;
ul{
  list-style: none;
  li{
    margin: 10px;
    span{
      font-size: inherit;
      color: gray;
      margin-right: 0 10px;
    }
  }
}
`;