import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ForecastResponseObject, ForeCastState } from "../../dtos/forecast.dto";
import forecastService from "../../services/forecast.service";

export const fetchForecastByCityAction = createAsyncThunk<ForecastResponseObject, string>(
    'forecast/fetchbycity',
    async (payload: any, {rejectWithValue, getState, dispatch}) => {
        try {
             return await forecastService.getForecastByCityName(payload);
        } catch (error: any) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
        
    }
)
export const fetchForecastByCityAndStateAction = createAsyncThunk<ForecastResponseObject, any>(
    'forecast/fetchbycityandstate',
    async (payload: any, {rejectWithValue, getState, dispatch}) => {
        try {
             return await forecastService.getForecastByCityNameNdStateCode(payload.cityName, payload.stateCode);
        } catch (error: any) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
        
    }
)


const initialState: ForeCastState = {
    loading: false,
    forecast: undefined as ForecastResponseObject | undefined,
    error: undefined as string|undefined,
}
  

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchForecastByCityAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchForecastByCityAction.fulfilled, (state, action) => {
            state.forecast = action?.payload;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(fetchForecastByCityAction.rejected, (state, action) => {
            state.forecast = undefined;
            state.loading = false;
            state.error = action.error.message;
        });

        // City State Location
        builder.addCase(fetchForecastByCityAndStateAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchForecastByCityAndStateAction.fulfilled, (state, action) => {
            state.forecast = action?.payload;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(fetchForecastByCityAndStateAction.rejected, (state, action) => {
            state.forecast = undefined;
            state.loading = false;
            state.error = action.error.message;
        });
    },
    reducers: {
    },
  });
  export default forecastSlice.reducer;