import axios from "axios";
import { WeatherResponseObject } from "../dtos/weather.dto";


const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const WeatherKey = '093c63d1d6dd2f0f77c6f14d91a19042' || process.env.WEATHER_KEY;


class WeatherService {
    
  getWeatherByCityName(cityName: string): Promise<WeatherResponseObject> {
    return axios.get(API_URL + `?q=${cityName}&appid=${WeatherKey}`)
    .then(response => {
        return response.data;
    });
  }
  getWeatherByCityNameNdStateCode(cityName: string, stateCode: string):Promise<WeatherResponseObject> {
    return axios.get(API_URL + `?q=${cityName},${stateCode}&appid=${WeatherKey}`)
    .then(response => {
        return response.data;
    });
  }
  getWeatherByCityNameNdStateCodeNdCountryCode(cityName: string, stateCode: string, countryCode: string): Promise<WeatherResponseObject> {
    return axios.get(API_URL + `?q=${cityName},${stateCode},${stateCode}&appid=${WeatherKey}`)
    .then(response => {
        return response.data;
    });
  }

  getWeatherByGeographic(lat: number, lon: number): Promise<WeatherResponseObject> {
    return axios.get(API_URL + `?lat=${lat}&lon=${lon}&appid=${WeatherKey}`)
    .then(response => {
        return response.data;
    });
  }
 
}

export default new WeatherService();
