import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY;
const units = 'metric';
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=${units}&q=`
console.log(api_key)

const getWeather = (cityName) => {
    const request = axios.get(`${baseUrl}${cityName}`)
    return request.then(response => response.data)
}

export default getWeather