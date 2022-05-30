import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import {OpenWeatherApiKey} from "../../pages/firebase/firebase"


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
      <>
        
      <div className="bg-gray-100 p-6">
         
          <h2 className="font-semibold text-lg pb-2 pl-2 text-zinc-700"> Infos pratiques</h2>
        
        
        <div className="flex flex-row text-sm ">
       
          {/* <div className="basis-8/9 pt-3"> */}
            {/* {temperature && (
              <p>
              Il fait actuellement <b>{temperature}°C</b> dans ce lieu avec un
              ressenti de {feelTemperature}°C.
              </p>
            )} */}
            {/* <div>
              Heure du coucher de soleil :{" "}
              <b>{`${hourOfSunset} h ${minuteOfSunset} min`}</b>
              </div>
              <div>
              Heure du lever de soleil :{" "}
              <b>{`${hourOfSunrise} h ${minuteOfSunrise} min`}</b>
            </div> */}
          {/* </div> */}
        </div>
        {temperature && (
          
          
          
          <div class="table w-full ...">
 
 <div class="table-row-group">
   <div class="table-row">
     <div class="table-cell ">Météo actuellement</div>
     <div class="table-cell "> <img
            src={`http://openweathermap.org/img/wn/${weather}.png`}
            alt="picto-meteo"
            className="w-8 h-8 "
            
            /></div>
   </div>
   <div class="table-row">
     <div class="table-cell">Température</div>
     <div class="table-cell">{temperature}°C</div>
   </div>
   <div class="table-row">
         <div class="table-cell">Ressenti</div>
         <div class="table-cell">{feelTemperature}°C</div>
   </div>
   <div class="table-row">
     <div class="table-cell">Heure coucher de soleil</div>
     <div class="table-cell">{`${hourOfSunset} h ${minuteOfSunset} min`}</div>
   </div>
   <div class="table-row">
     <div class="table-cell">Heure lever de soleil</div>
     <div class="table-cell">{`${hourOfSunrise} h ${minuteOfSunrise} min`}</div>
   </div>
   <div class="table-row">
     <div class="table-cell">Moment idéal pour une photo</div>
     <div class="table-cell">{ perfectMoment }</div>
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