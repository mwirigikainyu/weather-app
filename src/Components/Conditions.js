import "./App.css";

export default function Conditions(props) {
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
            It is currently {Math.floor(props.data.main.temp)}°c with
            {props.data.weather[0].description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
