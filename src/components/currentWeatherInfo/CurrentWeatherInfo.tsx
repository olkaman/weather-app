import { useEffect, useState } from 'react'
import { CurrentWeatherData } from 'services/models'
import { getCords, getWeatherData } from 'services/weather.service'
import SearchField from './SearchField'

function CurrentWeatherInfo() {
  const [data, setData] = useState<CurrentWeatherData>({
    temperature: 0,
    name: ' ',
    country: ' ',
    sunrise: 0,
    sunset: 0,
    conditions: '',
    conditionsDescription: '',
    windSpeed: 0,
    feelsLike: 0,
    humidity: 0,
    temp_min: 0,
    temp_max: 0
  })
  const [location, setLocation] = useState<string>('')
  const [latitude, setLatitude] = useState<string>()
  const [longitude, setLongitude] = useState<string>()
  const [error, setError] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude.toFixed(2)
      const lat = position.coords.latitude.toFixed(2)
      setLatitude(lat)
      setLongitude(lon)

      getWeatherData(lat, lon)
        .then((weatherData) => {
          setLocation(weatherData.name)
          setData(weatherData)
        })
        .catch((e) => {
          if (e.response.data.cod === '400') {
            setError(true)
          }
        })
    })
  }, [latitude, longitude])

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

        getWeatherData(lat, lon)
          .then((weatherData) => {
            setData(weatherData)
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
      <div>Hallo</div>
      {error ? (
        <span>No such location</span>
      ) : (
        <>
          <div>
            {location}, {data.country}
          </div>
          <div>{data && data.temperature}</div>
          <div>Sunrise: {data.sunrise}</div>
          <div>Sunset: {data.sunset}</div>
          <div>Conditions{data.conditions}</div>
          <div>Conditions description: {data.conditionsDescription}</div>
          <div>Wind speed{data.windSpeed}</div>
          <div>Feel like: {data.feelsLike}</div>
          <div>Humidity{data.humidity}</div>
          <div>Temp max{data.temp_max}</div>
          <div>Temp min{data.temp_min}</div>
        </>
      )}
    </>
  )
}
export default CurrentWeatherInfo
