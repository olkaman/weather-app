import { useCurrentWeatherData } from 'stores/weatherStore'

function CuurentWeatherInfo(props: { locationNotFound: boolean }) {
  const { locationNotFound } = props
  const currentWeather = useCurrentWeatherData()

  return (
    <>
      {locationNotFound ? (
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
export default CuurentWeatherInfo
