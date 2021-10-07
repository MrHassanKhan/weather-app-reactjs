import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../slices/weather.slice';
import forecastReducer from '../slices/forecast.slice';
export const store = configureStore({
  reducer: {
    weather :weatherReducer,
    forecast :forecastReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch