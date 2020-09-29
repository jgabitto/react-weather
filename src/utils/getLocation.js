import URL from '../constants/constants';

// Get location
const getLocation = async (city) => {
    try {
        // If there's an input value
        if (city) {
            // Make fetch call to weather api
            const response = await fetch(`${URL}/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            
            // If city searched is bad
            if (response.status === 404) {
                // Put warning
                return {message: 'Can\'t find city. Search again.'};
            }
    
            return response.json();
        }
    } catch (e) {
        console.log(e.message);
    }
}

export default getLocation;