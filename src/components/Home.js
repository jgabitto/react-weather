import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Spinner from 'react-bootstrap/Spinner';

import getWeather from '../utils/getWeather';
import { getForecastData } from '../utils/getForecast';
import withAuthorization from './Session/withAuthorization';

const StyledWrap = styled.div`
    width: 70%;
    margin-top: 8rem;

    .message {
        color: red;
    }

`;

const StyledImg = styled.img`
    width: 40px;
`;

const ACTIONS = {
    SET_LOCATION: 'location',
    SET_WEATHER: 'weather',
    SET_ERROR: 'error'
}

const INITIAL_STATE = {
    location: '',
    weather: null,
    error: null
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOCATION:
            return { ...state, [action.payload.field]: action.payload.value }
        case ACTIONS.SET_WEATHER:
            return { ...state, [action.payload.field]: action.payload.value }
        case ACTIONS.SET_ERROR:
            return { ...state, [action.payload.field]: action.payload.value }
    }
}

const Home = ({ firebase }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { location, weather, error } = state;

    useEffect(() => {
        const userId = firebase.auth.currentUser.uid;
        
        const getZipcode = async () => {
            const zipcode = await firebase.getUserInfo(userId, 'zipcode');
            const forecast = await getForecastData(zipcode)
            dispatch({ type: ACTIONS.SET_LOCATION, payload: {
            field: ACTIONS.SET_LOCATION, value: zipcode
            }})
            dispatch({ type: ACTIONS.SET_WEATHER, payload: {
            field: ACTIONS.SET_WEATHER, value: forecast
            }})
        }
        getZipcode();
    }, [])
    
    const onSubmit = async (e) => {
        e.preventDefault()
        
        const response = await getWeather(location);
        
        if (response.hasOwnProperty('daily')) {
            const forecast = response.daily.map(day => {
                return { 'day': day.dt, 'tempHumidity': `${day.temp.min}\u00B0/ ${day.temp.max}\u00B0/ ${day.humidity}%`, 'feelsLike': `${day.feels_like.day}\u00B0`,'icon': `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`, 'description': day.weather[0].description
                 };
             })

             dispatch({ type: ACTIONS.SET_WEATHER, payload: {
                field: ACTIONS.SET_WEATHER, value: forecast
            }})
        }

        dispatch({ type: ACTIONS.SET_ERROR, payload: {
            field: ACTIONS.SET_ERROR, value: response.message
        }})
    }

    const onChange = (e) => {
        dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value }})
    }
    
    return (
        weather ?
        <StyledWrap className="container text-center">
            <h1 className="display-4">{location} Weather</h1>
            <div className="table-responsive">
          <table className="hidden table table-borderless table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Day</th>
                <th>Low/Hi/Humidity</th>
                <th>Feels Like</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
                {weather.map((day) => {
                   return (
                    <tr key={day.day}>
                        <th><Moment format="MMMM Do YYYY, h:mm:ss a" unix>{day.day}</Moment></th>
                        <th>{day.tempHumidity}</th>
                        <th>{day.feelsLike}</th>
                        <th><StyledImg src={day.icon} /> {day.description}</th>
                    </tr>
                   )
                })}
            </tbody>
          </table>
          <div className="input-group mb-3 justify-content-center container">
            <form onSubmit={onSubmit}>
                <input className="form-control mb-2" name="location" onChange={onChange} placeholder="City Name or Zipcode" required/>
                {error ? <div className="message pb-2">{error}</div> : null}
                <div className="input-group-append">
                    <button className="btn btn-outline-info" type="submit">Search</button>
                </div>
            </form>
            </div>
        </div>
        </StyledWrap>
        : <StyledWrap id="parent" className="container text-center">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </StyledWrap>
    )
};

// {/* <div className="">
// <h1 className="display-4">City Weather</h1>
// <p className="lead">This is a simple weather app. Enter the name of the city and will get all the information about the city's weather</p>
// {/* <hr className="my-4" /> */}
// <div className="input-group mb-3 justify-content-center container">
// <form onSubmit={onSubmit}>
//     <input className="form-control mb-2" name="location" value={location} onChange={onChange} placeholder="City Name or Zipcode" required />
//     {error ? <div className="message pb-2">{error}</div> : null}
//     <div className="input-group-append">
//         <button className="btn btn-outline-info" type="submit">Search</button>
//     </div>
// </form>
// </div>
// </div> */}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);