import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map((item) => item.name.common))
}

const getCountry = (countryName) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    return request.then(response=> response.data)
}


export default {getAll, getCountry}