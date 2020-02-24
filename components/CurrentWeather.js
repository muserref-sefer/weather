import { useEffect, useState } from 'react'
import api from "../api";
import { setWeather } from "../actions";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import MainWeather from './MainWeather';

export default function CurrentWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableLocation, setIsDisableLocation] = useState(false);
  const dispatch = useDispatch();
  const currentWeather = useSelector(state => state.weatherState);

  useEffect(() => {
    const fetchCurrentWeather = async (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      const weather = await api.getWeatherByLocation(latitude,longitude);

      setIsLoading(false);
      setIsDisableLocation(false);
      dispatch(setWeather(weather));
    }

    function error() {
      setIsLoading(false);
      setIsDisableLocation(true);
    }

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(fetchCurrentWeather, error);
    }
  }, []);

  return(
    <>
      {isDisableLocation && <span>Konumu etkinleştirmeniz gerekir.</span>}

      {isLoading ? (
        <div className="loader">
          <div className="one"></div>
          <div className="two"></div>
        </div>
      ) : (currentWeather &&
        <MainWeather weather={currentWeather} />
      )}

      <style jsx>{`
        .dot {
          margin: 0 5px;
        }
      `}
      </style>
    </>
  );
}

