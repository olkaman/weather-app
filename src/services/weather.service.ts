import axios from 'axios'
import { CurrentWeatherData } from './models'

export async function getCords(location: string) {
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5a1adfc499e200023cd45fa041b63b95`
  const response = await axios.get(locationUrl)
  return response.data
}

export async function getWeatherData(latitude: string, longitude: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5a1adfc499e200023cd45fa041b63b95`
  const response = await axios.get(url)
  const data = response.data
  const weatherData: CurrentWeatherData = {
    temperature: data.main.temp,
    name: data.name,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    conditions: data.weather[0].main,
    conditionsDescription: data.weather[0].description,
    windSpeed: data.wind.speed,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max
  }
  return weatherData
}
