
import axios from "axios";
import { ForecastResponseObject } from "../dtos/forecast.dto";

const API_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";
const WeatherKey = '093c63d1d6dd2f0f77c6f14d91a19042' || process.env.WEATHER_KEY;


class ForecastService {

    getForecastByCityName(cityName: string): Promise<ForecastResponseObject> {
        return axios.get(API_URL + `?q=${cityName}&appid=${WeatherKey}`)
        .then(response => {
            return response.data;
        });
    }
    getForecastByCityNameNdStateCode(cityName: string, stateCode: string):Promise<ForecastResponseObject> {
        return axios.get(API_URL + `?q=${cityName},${stateCode}&appid=${WeatherKey}`)
        .then(response => {
            return response.data;
        });
    }
}


export default new ForecastService();