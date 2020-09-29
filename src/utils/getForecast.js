import getWeather from './getWeather';

export const getForecastData = async (location) => {
    const response = await getWeather(location);
    
    const forecast = response.daily.map(day => {
        return { 'day': day.dt, 'tempHumidity': `${day.temp.min}\u00B0/ ${day.temp.max}\u00B0/ ${day.humidity}%`, 'feelsLike': `${day.feels_like.day}\u00B0`,'icon': `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`, 'description': day.weather[0].description
     };
    })

    return forecast;
}
