import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import moment from "moment";


function Forecast() {
    const state = useSelector((state: RootState) => state.forecast);
    const { forecast, loading, error } = state;


    return(
        <div className="d-flex col-md-8 col-sm-12 pt-12 px-4 mb-20 mx-auto text-center" style={{overflow: 'auto'}}>
            {
            loading ? (
                <h1 className="text-graytext-center">
                  Loading please wait...
                </h1>
              ): error ? (
                <h1 className="text-danger text-center">
                  {error}
                </h1>
              ): (
                forecast && forecast.list.map((item, index) => {
                    return (

                      <div className="col-md-4" key={index}>
                        <div className="card mx-1">
                            <div className="card-body">
                                <div className="d-flex flex-row justify-content-between">
                                    {item.weather && 
                                        <img style={{width:'30%'}}
                                            src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                                            alt="/"
                                        />
                                    }

                                    <div className="d-flex flex-column">
                                        <h6>{moment.unix(item.dt).format('dddd, MMM Do')}</h6>
                                        <h6>{item.weather[0]?.description}</h6>
                                    </div>
                                </div>
                            {/* <h4 className="card-title">{item?.temp?.min}&deg; / {item?.temp?.max}&deg;</h4> */}
                            <div className="d-flex flex-column">
                                <div className="text-muted">{item?.temp?.min}&deg; / {item?.temp?.max}&deg;</div>
                                <div className="text-muted">humidity: {item?.humidity}%</div>
                                <div className="text-muted">speed: {item?.speed}mps</div>
                                {/* <div className="text-muted">Feel Like</div> */}
                                {/* <br /> */}
                                <div className="text-muted">day: {item.feels_like.day}&deg;</div>
                                <div className="text-muted">morning: {item.feels_like.morn}&deg;</div>
                                <div className="text-muted">evening: {item.feels_like.eve}&deg;</div>
                                <div className="text-muted">night: {item.feels_like.night}&deg;</div>
                            </div>
                            {/* <a href="#" className="btn btn-primary">See Profile</a> */}
                            </div>
                        </div>
                    </ div> 
                    )
                  })
              )

            }
        
        </div>
    )
}

export default Forecast;