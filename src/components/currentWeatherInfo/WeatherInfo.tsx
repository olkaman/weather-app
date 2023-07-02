import { useEffect, useState } from 'react'
import { getCords, getCurrentWeatherData } from 'services/weather.service'
import { useCurrentWeatherData, useLocation, useWeatherStore } from 'stores/weatherStore'

import SearchField from './SearchField'

function WeatherInfo() {
  // const [location, setLocation] = useState<string>('')
  const setLocation = useWeatherStore((state) => state.setLocation)
  const location1 = useLocation()
  const [latitude, setLatitude] = useState<string>()
  const [longitude, setLongitude] = useState<string>()
  const [error, setError] = useState(false)
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather)
  const currentWeather = useCurrentWeatherData()

  const onChangeLocation = (value: string) => {
    setLocation(value)
    setError(false)
    getCords(value)
      .then((response) => {
        if (response[0].lat === undefined || response[0].lon === undefined) {
          Promise.reject()
        }
        const lat = response[0].lat
        const lon = response[0].lon

        getCurrentWeatherData(lat, lon)
          .then((weatherData) => {
            setCurrentWeather({ ...weatherData, name: value })
          })
          .catch(() => {
            setError(true)
          })
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <>
      <SearchField setEnteredLocation={onChangeLocation} />
      {error ? (
        <span>No such location</span>
      ) : (
        <>
          <div>
            {currentWeather.name}, {currentWeather.country}
          </div>
          <div>{currentWeather && currentWeather.temperature}</div>
          <div>Sunrise: {currentWeather.sunrise}</div>
          <div>Sunset: {currentWeather.sunset}</div>
          <div>Conditions description: {currentWeather.conditionsDescription}</div>
          <div>Wind speed: {currentWeather.windSpeed}</div>
          <div>Feel like: {currentWeather.feelsLike}</div>
          <div>Humidity: {currentWeather.humidity}</div>
          <div>Temp max: {currentWeather.temp_max}</div>
          <div>Temp min: {currentWeather.temp_min}</div>
        </>
      )}
    </>
  )
}
export default WeatherInfo
