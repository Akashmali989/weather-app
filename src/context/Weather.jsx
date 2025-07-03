import { createContext, useContext, useState } from "react";
import { getWeaterData, getWeaterDataForLocation } from "../api/First";

const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    const response = await getWeaterData(city);
    if (response.error) {
      setError(response.error);
      setData(null);
    } else {
      setData(response);
      setError(null);
    }
  };

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const response = await getWeaterDataForLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        if (response.error) {
          setError(response.error);
          setData(null);
        } else {
          setData(response);
          setError(null);
        }
      },
      (err) => {
        setError("Failed to get location: " + err.message);
      }
    );
  };

  return (
    <WeatherContext.Provider value={{ city, data, error, setCity, fetchData, fetchUserLocation }}>
      {props.children}
    </WeatherContext.Provider>
  );
};