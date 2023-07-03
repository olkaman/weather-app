import Container from 'components/Container'
import { useEffect, useState } from 'react'
import { getCords, getCurrentWeatherData } from 'services/weather.service'
import { useLatitude, useLongitude, useWeatherStore } from 'stores/weatherStore'
import CuurentWeatherInfo from './components/CuurentWeatherInfo'
import 'styles/appStyles.scss'
import 'styles/globalStyles.scss'
import FeedbackMessage from 'components/FeedbackMessage'
import SearchField from 'components/currentWeatherInfo/SearchField'

function App() {
  const [showToast, setShowToast] = useState(false)
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
            setShowToast(true)
          }
        })
        .finally(() => {})
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

        getCurrentWeatherData(lat, lon)
          .then((weatherData) => {
            setCurrentWeather({ ...weatherData, name: value })
          })
          .catch(() => {
            setShowToast(true)
            setError(true)
          })
      })
      .catch(() => {
        setShowToast(true)
        setError(true)
      })
  }

  return (
    <Container>
      <>
        <div className='red'>Weather app</div>
        <SearchField setEnteredLocation={onChangeLocation} />
        <CuurentWeatherInfo locationNotFound={error} />
        <FeedbackMessage type='danger' message={'Current location was not found'} showToast={showToast} setShowToast={() => setShowToast(false)} />
      </>
    </Container>
  )
}

export default App
