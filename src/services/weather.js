import axios from 'axios';

export async function getCords(location) {
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5a1adfc499e200023cd45fa041b63b95`;
  const response = await axios.get(locationUrl);
  return response.data;
}

export async function getWeatherData(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5a1adfc499e200023cd45fa041b63b95`;
  const response = await axios.get(url);
  return response.data;
}
