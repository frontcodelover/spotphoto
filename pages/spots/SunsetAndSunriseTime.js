import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";


function SunsetAndSunriseTime({ latitude, longitude, perfectMoment }) {
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataFromOpenWeather, setDataFromOpenWeather] = useState([{}]);
  const [timeZone, setTimeZone] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [feelTemperature, setFeelTemperature] = useState(null);
  const [weather, setWeather] = useState(null);


  
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=f6ca0fae5f03a9383131aeb39f64ce87`
      )
        .then((response) => response.json())
        .then((response) => {
          setIsLoaded(true);
          const sunsetRes = response.sys;
          const timezone = response.timezone;
          const temperatureData = response.main;
          const weatherData = response.weather;

          setTemperature(temperatureData.temp);
          setTimeZone(timezone);
          setFeelTemperature(temperatureData.feels_like);
          setWeather(weatherData[0].icon);
          setDataFromOpenWeather(sunsetRes);
        })
        .catch((err) => console.error(err));
    }
  }, [latitude, longitude]);

  //* Transformation des datas en heure et minutes
  const sunsetTime = dataFromOpenWeather.sunset + timeZone;
  const sunset = new Date(sunsetTime * 1000);
  const hourOfSunset = sunset.getUTCHours();
  const minuteOfSunset =
    (sunset.getMinutes() < 10 ? "0" : "") + sunset.getMinutes();

  const sunriseTime = dataFromOpenWeather.sunrise + timeZone;
  const sunrise = new Date(sunriseTime * 1000);
  const hourOfSunrise = sunrise.getUTCHours();
  const minuteOfSunrise = sunrise.getUTCMinutes();

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      
      <div className="bg-orange-100">
        <h2 className="text-base pt-3 pl-6 text-orange-400 font-semibold flex">
        <span><FaRegClock className="text-lg flex mr-2 pt-1" /></span> Est-ce le bon moment pour faire une photo ?
        </h2>
        <p className="text-base pt-3 pl-6 text-orange-800">Le moment idéal : { perfectMoment }</p>
        <div className="flex flex-row text-sm ">
          <img
            src={`http://openweathermap.org/img/wn/${weather}@2x.png`}
            alt="picto-meteo"
            className="basis-1/9"
          />
          <div className="basis-8/9 pt-3">
            {temperature && (
              <p>
                Il fait actuellement <b>{temperature}°C</b> dans ce lieu avec un
                ressenti de {feelTemperature}°C.
              </p>
            )}
            <div>
              Heure du coucher de soleil :{" "}
              <b>{`${hourOfSunset} h ${minuteOfSunset} min`}</b>
            </div>
            <div>
              Heure du lever de soleil :{" "}
              <b>{`${hourOfSunrise} h ${minuteOfSunrise} min`}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SunsetAndSunriseTime;