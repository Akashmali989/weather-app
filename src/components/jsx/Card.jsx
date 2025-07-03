import React from "react";
import { useWeather } from "../../context/Weather";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";
import "../css/Card.css";

const Card = (props) => {
  const Weather = useWeather();

  // Generate 100 star elements for a denser effect
  const stars = Array.from({ length: 100 }, (_, index) => (
    <div key={index} className="star" style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${1 + Math.random() * 3}px`,
      height: `${1 + Math.random() * 3}px`,
      animationDelay: `${Math.random() * 3}s`
    }}></div>
  ));



  const getWeatherIcon = (condition) => {
    const text = condition?.text?.toLowerCase();
    if (text?.includes("sunny") || text?.includes("clear")) return <WiDaySunny size={80} />;
    if (text?.includes("cloud")) return <WiCloud size={80} />;
    if (text?.includes("rain")) return <WiRain size={80} />;
    if (text?.includes("snow")) return <WiSnow size={80} />;
    return <WiFog size={80} />;
  };

  return (
    <div className='container'>
      {stars}
      <h1>Weather Forcasting</h1>
      <div className="search">
        <input
          className="input-field"
          placeholder="Enter City Name"
          value={Weather.city || ""}
          onChange={(e) => Weather.setCity(e.target.value)}
        />
        <button className="btn" onClick={props.onClick}>
          {props.value}
        </button>
      </div>
      {Weather.error ? (
        <div className="error">
          <h3>Error: {Weather.error}</h3>
        </div>
      ) : (
        <div className="card">
          {Weather?.data?.current?.condition ? (
            getWeatherIcon(Weather.data.current.condition)
          ) : (
            <WiDaySunny size={80} />
          )}
          <h3>{Weather?.data?.current?.condition?.text || "Weather Condition"}</h3>
          <h3>Temperature ~ {Weather.data?.current?.temp_c ? `${Weather.data.current.temp_c}°C` : "N/A"}</h3>
          <h3>Temperature ~ {Weather.data?.current?.temp_f ? `${Weather.data.current.temp_f}°F` : "N/A"}</h3>
          <h3>Humidity ~ {Weather.data?.current?.humidity}%</h3>
          <h4>
            City ~ {Weather.data?.location?.name || "City"},<br />
            Region ~ {Weather.data?.location?.region || "Region"},<br />
            Country ~ {Weather.data?.location?.country || "Country"}.
          </h4>
        </div>
      )}
    </div>
  );
};

export default Card;