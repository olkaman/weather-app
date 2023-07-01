import { create } from 'zustand'
import { CurrentWeatherData } from '../services/models'
import { devtools } from 'zustand/middleware'

type CurrentWeatherState = {
  currentWeatherData: CurrentWeatherData
}

type CurrentWeatherActions = {
  setCurrentWeather: (currentWeather: CurrentWeatherData) => void
}

const initialState = {
  currentWeatherData: {
    temperature: 0,
    name: ' ',
    country: ' ',
    sunrise: '',
    sunset: '',
    conditions: '',
    conditionsDescription: '',
    windSpeed: 0,
    feelsLike: 0,
    humidity: 0,
    temp_min: 0,
    temp_max: 0
  }
}

export const useWeatherStore = create<CurrentWeatherState & CurrentWeatherActions>()(
  devtools((set) => ({
    ...initialState,
    setCurrentWeather: (currentWeather: CurrentWeatherData) => {
      set(setCurrentWeather(currentWeather))
    }
  }))
)

export const useCurrentWeatherData = () => useWeatherStore((state) => state.currentWeatherData)

function setCurrentWeather(currentWeather: CurrentWeatherData): (state: CurrentWeatherState) => CurrentWeatherState {
  return (state) => ({ ...state, currentWeatherData: currentWeather })
}
