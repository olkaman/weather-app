import { useEffect, useState } from 'react';
import { getCords, getWeatherData } from './services/weather';

function App() {
  const [data, setData] = useState({ temperature: 20, name: 'Rohrbach-Berg', country: 'Austria' });
  const [location, setLocation] = useState('Rohrbach-Berg');
  const [value, setValue] = useState('Rohrbach-Berg');
  const [latitude] = useState(48.57);
  const [longitude] = useState(13.97);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeLocation = (e) => {
    e.preventDefault();
    setLocation(value);
    setError(false);
    getCords(value)
      .then((response) => {
        if (response[0].lat === undefined || response[0].lon === undefined) {
          Promise.reject();
        }
        const lat = response[0].lat;
        const lon = response[0].lon;

        getWeatherData(lat, lon)
          .then((response) => {
            const weatherData = response;
            setData({ ...data, temperature: weatherData.main.temp, name: location, country: weatherData.sys.country });
          })
          .catch(() => {
            setError(true);
          });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setValue('');
      });
  };

  useEffect(() => {
    getWeatherData(latitude, longitude)
      .then((response) => {
        const weatherData = response;
        setData({ ...data, temperature: weatherData.main.temp, name: weatherData.name, country: weatherData.sys.country });
      })
      .catch((e) => {
        if (e.response.data.cod === '400') {
          setError(true);
        }
      });
  }, []);

  return (
    <>
      <div>Weather app</div>
      <form>
        <input type='search' value={value} placeholder='Enter location' onChange={handleChange} />
        <button type='submit' onClick={onChangeLocation}>
          Find
        </button>
      </form>

      {error ? (
        <span>No such location</span>
      ) : (
        <>
          <div>
            {location}, {data.country}
          </div>
          <div>{data && data.temperature}</div>
        </>
      )}
    </>
  );
}

export default App;
