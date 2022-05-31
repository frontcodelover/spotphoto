import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import {OpenWeatherApiKey} from "../../pages/firebase/firebase"


function SunsetAndSunriseTime({ latitude, longitude, perfectMoment }) {
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataFromOpenWeather, setDataFromOpenWeather] = useState([{}]);
  const [timeZone, setTimeZone] = useState(null);
  const [temperature, setTemperature] = useState(null);

  const [weather, setWeather] = useState(null);


  
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${OpenWeatherApiKey}`
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
      <>
        
      <div className="p-6 bg-zinc-100 text-zinc-600 border-t-4 border-green-500">
         
          <h2 className="font-semibold text-lg pb-2 pl-2"> Infos pratiques</h2>
        
        
        <div className="flex flex-row text-sm ">
       

        </div>
        {temperature && (
          
          
          
          <div className="table w-full ...">
 
 <div className="table-row-group">
   <div className="table-row">
     <div className="table-cell ">Météo actuellement</div>
     <div className="table-cell "> <img
            src={`http://openweathermap.org/img/wn/${weather}.png`}
            alt="picto-meteo"
            className="w-8 h-8"
            
            /></div>
   </div>
   <div className="table-row">
     <div className="table-cell">Température</div>
     <div className="table-cell font-semibold">{temperature}°C</div>
   </div>
   <div className="table-row">
     <div className="table-cell">Heure lever de soleil</div>
     <div className="table-cell text-orange-500 font-semibold">{`${hourOfSunrise} h ${minuteOfSunrise} min`}</div>
   </div>
   <div className="table-row">
     <div className="table-cell">Heure coucher de soleil</div>
     <div className="table-cell text-orange-500 font-semibold">{`${hourOfSunset} h ${minuteOfSunset} min`}</div>
   </div>
   <div className="table-row">
     <div className="table-cell">Moment idéal pour une photo</div>
     <div className="table-cell font-semibold">{ perfectMoment }</div>
   </div>
 </div>
</div>
 )}

      </div>
 </>
    );
  }
}

export default SunsetAndSunriseTime;