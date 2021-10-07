import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WeatherResponseObject, WeatherState } from "../../dtos/weather.dto";
import weatherService from "../../services/weather.service";
import { RootState } from "../store/store";
import { fetchForecastByCityAction, fetchForecastByCityAndStateAction } from "./forecast.slice";

export const fetchWeatherByCityAction = createAsyncThunk<WeatherResponseObject, string>(
    'weather/fetchbycity',
    async (payload: any, {rejectWithValue, getState, dispatch}) => {
        try {
             const data =await weatherService.getWeatherByCityName(payload);
             dispatch(fetchForecastByCityAction(payload))
             return data;
        } catch (error: any) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
        
    }
)
export const fetchWeatherByCityAndStateAction = createAsyncThunk<WeatherResponseObject, any>(
    'weather/fetchbycityandstate',
    async (payload: any, {rejectWithValue, getState, dispatch}) => {
        try {
            const {cityName, stateCode} = payload;
             const data = await weatherService.getWeatherByCityNameNdStateCode(cityName, stateCode);
             dispatch(fetchForecastByCityAndStateAction({cityName: cityName, stateCode: stateCode}))
             return data;
        } catch (error: any) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
        
    }
)
export const fetchWeatherByGeoLocationAction = createAsyncThunk<WeatherResponseObject, any>(
    'weather/FetchByGeoLocation',
    async (payload: any, {rejectWithValue, getState, dispatch}) => {
        try {
             const data =  await weatherService.getWeatherByGeographic(payload.lat, payload.lon);
             dispatch(fetchForecastByCityAction(data.name))

             return data;
        } catch (error: any) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
        
    }
)


const initialState: WeatherState = {
    loading: false,
    weather: undefined as WeatherResponseObject | undefined,
    error: undefined as string|undefined,
    searchText: ''
}
  

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchWeatherByCityAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherByCityAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(fetchWeatherByCityAction.rejected, (state, action) => {
            state.weather = undefined;
            state.loading = false;
            state.error = action.error.message;
        });

        // City State Location
        builder.addCase(fetchWeatherByCityAndStateAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherByCityAndStateAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(fetchWeatherByCityAndStateAction.rejected, (state, action) => {
            state.weather = undefined;
            state.loading = false;
            state.error = action.error.message;
        });

        // Geo Location
        builder.addCase(fetchWeatherByGeoLocationAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherByGeoLocationAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.searchText = state.weather.name;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(fetchWeatherByGeoLocationAction.rejected, (state, action) => {
            state.weather = undefined;
            state.loading = false;
            state.error = action.error.message;
        });
    },
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        }
    },
  });

  export const { setSearchText } = weatherSlice.actions
  export const getSearchText = (state: RootState) => state.weather.searchText;
  export default weatherSlice.reducer;