import fetch from 'isomorphic-unfetch';
import { APP_ID } from '../config/index';

export default {
  getWeatherByLocation: async function (latitude, longitude) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_ID}&units=metric`);
    const response = await data.json();
    return response;
  },
  getLocationsByQuery: async function (debouncedSearchQuery) {
    const data = await fetch(`https://cors-anywhere.herokuapp.com/https://get-cities-ids.herokuapp.com?q=${debouncedSearchQuery}`);
    const response = await data.json();
    return response;
  },
  getSavedLocationById: async function (id) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?&id=${id}&appid=${APP_ID}&units=metric`);
    const response = await data.json();
    return response;
  },
  getWeeklyWeather: async function (id) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?&id=${id}&appid=${APP_ID}&units=metric`);
    const response = await data.json();
    return response;
  }
}