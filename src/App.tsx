import Container from 'components/Container'
import { useEffect, useState } from 'react'
import { getCurrentWeatherData } from 'services/weather.service'
import { useLatitude, useLocation, useLongitude, useWeatherStore } from 'stores/weatherStore'
import WeatherInfo from './components/currentWeatherInfo/WeatherInfo'

function App() {
  const [error, setError] = useState(false)
  const setLatitude = useWeatherStore((state) => state.setLatitude)
  const setLongitude = useWeatherStore((state) => state.setLongitude)
  const setLocation = useWeatherStore((state) => state.setLocation)
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather)
  const latitude = useLatitude()
  const longitude = useLongitude()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude.toFixed(10)
      const lat = position.coords.latitude.toFixed(10)

      setLatitude(lat)
      setLongitude(lon)
      getCurrentWeatherData(lat, lon)
        .then((weatherData) => {
          setLocation(weatherData.name)
          setCurrentWeather(weatherData)
        })
        .catch((e) => {
          if (e.response.data.cod === '400') {
            setError(true)
          }
        })
    })
  }, [latitude, longitude])

  return (
    <Container>
      <>
        <div>Weather app</div>
        <WeatherInfo />
      </>
    </Container>
  )
}

export default App
