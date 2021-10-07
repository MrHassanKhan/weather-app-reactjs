import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWeatherByCityAction, fetchWeatherByCityAndStateAction, fetchWeatherByGeoLocationAction, setSearchText } from "../redux/slices/weather.slice";
import { RootState } from "../redux/store/store";
import Forecast from "./Forecast";


function Home() {
    // const searchText = useSelector(getSearchText);
    const state = useSelector((state: RootState) => state.weather);
    const { weather, loading, error, searchText } = state;
    const dispatch = useDispatch();
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos) =>{
        console.log(pos.coords.latitude + " " + pos.coords.longitude) // display VALUE
        dispatch(fetchWeatherByGeoLocationAction({lat: pos.coords.latitude, lon:pos.coords.longitude}));
      }, (err) => {
            console.log(err);
      });
      
    }, [dispatch])

    function handleLocation() {
      if(searchText) {
        const splittedText = searchText.split(',');
        if(splittedText.length > 1) {
          dispatch(fetchWeatherByCityAndStateAction({cityName: splittedText[0], stateCode: splittedText[1]}));
        } else {
          dispatch(fetchWeatherByCityAction(searchText));
        }
        
      }
    }
    // console.log('Home')
    return (
      <div className="d-flex flex-column">
        <div className="container pt-12 px-4 mb-20 mx-auto text-center">
          
          <h2 className="mt-8 mb-8 font-semibold">
            Weather App
          </h2>
          <p className="max-w-3xl mx-auto opacity-50">
            Find out the current weather situation around the world
          </p>
        </div>
        <div className="col-md-6 col-sm-12 pt-12 px-4 mb-20 mx-auto text-center">
          <input
              // onClick={() => dispatch(fetchWeatherAction(city))}
              value={searchText}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
              placeholder="Search City, State"
              className="form-control bg-transparent px-3 py-2 mr-4 rounded-2 border-2 text-primary"
            ></input>
            {/* Button */}
            <button
              type="button" onClick={handleLocation}
              className="text-center border-2 btn-primary rounded-2 px-2 py-1 mt-3"
            >
              Search
            </button>
        </div>
        {/* Content goes here */}
        <div className="col-md-6 col-sm-12 pt-12 px-4 mb-20 mx-auto text-center">
          {loading ? (
            <h1 className="text-graytext-center">
              Loading please wait...
            </h1>
          ) : error ? (
            <h1 className="text-danger text-center">
              {error}
            </h1>
          ) : (
            <div className="px-4 mx-auto py-2">
              <div className="d-flex flex-column flex-wrap justify-content-center">
                <div className="col-md-12">
                  <div className="p-8 border border-blue-800 rounded-lg">
                    <div className="d-flex flex-column justify-content-start  items-center">
                      {weather && 
                        <span className="d-flex items-center justify-center w-16 h-16 rounded-full border-2">
                        <img
                          className="col-md-4"
                            src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                            alt="/"
                          />
                        </span>
                      }
                      
                      <h1 className="text-gray pl-5">
                        {weather?.weather[0].main}
                      </h1>{' '}
                    </div>
                    <h1 className="text-gray-300 text-center text-4xl mb-10">
                      {Math.ceil(Number(weather?.main.temp))}{' '}
                      <span className="text-warning text-4xl">°C</span>
                    </h1>
                    <h3 className="mb-6 text-xl font-semibold">
                      {weather?.name}, {weather?.sys?.country}
                    </h3>
                    <p className="mb-8 text-gray px-4">
                      The weather condition in {weather?.name},{' '}
                      {weather?.sys?.country} is described as :{' '}
                      {weather?.weather[0].description} with a temperature of{' '}
                      {Math.ceil(Number(weather?.main.temp))} °C and a humidity of{' '}
                      {weather?.main?.humidity} %
                    </p>
                    <Link
                      className="ml-auto d-flex items-center justify-content-end rounded-circle"
                      to="/"
                    >
                      {weather && <span className="d-flex items-center justify-content-end col-md-3">
                        
                        <img
                          className="col-md-8"
                          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`}
                          alt="/"
                        />
                      </span>}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Forecast />
      </div>
       
    );
  }
  
  export default Home;