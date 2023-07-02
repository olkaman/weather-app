import { create } from 'zustand'
import { CurrentWeatherData } from '../services/models'
import { devtools } from 'zustand/middleware'

type CurrentWeatherState = {
  currentWeatherData: CurrentWeatherData
  latitude: string
  longitude: string
  location: string
}

type CurrentWeatherActions = {
  setCurrentWeather: (currentWeather: CurrentWeatherData) => void
  setLatitude: (latidude: string) => void
  setLongitude: (longitude: string) => void
  setLocation: (location: string) => void
}

const initialState = {
  latitude: '',
  longitude: '',
  location: '',
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
      set(() => ({ currentWeatherData: currentWeather }), false, 'Set current weather data')
    },
    setLatitude: (latitude: string) => {
      set(() => ({ latitude }), false, 'Set latitude')
    },
    setLongitude: (longitude: string) => {
      set(() => ({ longitude }), false, 'Set longitude')
    },
    setLocation: (location: string) => {
      set(() => ({ location }), false, 'Set location')
    }
  }))
)

export const useCurrentWeatherData = () => useWeatherStore((state) => state.currentWeatherData)
export const useLatitude = () => useWeatherStore((state) => state.latitude)
export const useLongitude = () => useWeatherStore((state) => state.longitude)
export const useLocation = () => useWeatherStore((state) => state.location)

// function setCurrentWeather(currentWeather: CurrentWeatherData): (state: CurrentWeatherState) => CurrentWeatherState {
//   return (state) => ({ ...state, currentWeatherData: currentWeather })
// }

// function setLatitude(latitude: string): (state: CurrentWeatherState) => CurrentWeatherState {
//   return (state) => ({ ...state, latitude })
// }

// function setLongitude(longitude: string): (state: CurrentWeatherState) => CurrentWeatherState {
//   return (state) => ({ ...state, longitude })
// }

// function setLocation(location: string): (state: CurrentWeatherState) => CurrentWeatherState {
//   return (state) => ({ ...state, location })
// }
