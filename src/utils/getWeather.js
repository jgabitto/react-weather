import URL from '../constants/constants';
import getLocation from './getLocation';

// Get weather data
const getWeather = async (city) => {
    try {
        const location = await getLocation(city);

        if (location.hasOwnProperty('coord')) {
            // Fetch call to weather api
            const response = await fetch(`${URL}/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`);

            return response.json();
        }
        
        return location;
    } catch (e) {
        console.log(e.message);
    }
} 


export default getWeather;