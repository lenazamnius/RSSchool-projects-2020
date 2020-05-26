import './assets/styles/main.scss';

const { getName } = require('country-list');

const apiKeys = {
  weather: 'qztMuAVTzLn0I1nWyyB7S0PMiGRt24ls',
  coordinates: '5e1ed30a88d24dd2a60ea5bfbb8bd5ec',
  images: 'gGuVte5R6MvjxTzaSgS0RqB0iiyKb9QXr0kjIZPZnFM',
};

const store = {
  lang: 'en',
  locationCity: '',
  locationCountry: '',
};

const weatherUrlValuesObj = {
  time: 'daily',
  endTime: '',
  lat: '',
  lon: '',
  unit: 'si',
  values: 'temp%2Cfeels_like%2Cwind_speed%2Chumidity%2Cweather_code',
  apiKey: apiKeys.weather,
};

// get and set location
async function getLocation() {
  const response = await fetch('http://ipinfo.io/?token=f8a9f65202941f');
  const location = await response.json();
  const coordinatesArr = location.loc.split(',');

  weatherUrlValuesObj.lat = coordinatesArr[0];
  weatherUrlValuesObj.lon = coordinatesArr[1];
  store.locationCity = location.city;
  store.locationCountry = !store.locationCountry
    ? getName(location.country)
    : location.country;
}

function setLocation() {
  const locationString = `${store.locationCity} ${store.locationCountry}`;

  document.getElementById('latitude').innerHTML = weatherUrlValuesObj.lat;
  document.getElementById('longitude').innerHTML = weatherUrlValuesObj.lon;
  document.getElementById('location').innerHTML = locationString.toUpperCase();
}

// set current date and time
function setDateClock() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  const locales = {
    en: 'en-US',
    ru: 'ru-Ru',
    be: 'be',
    ua: 'uk-UA',
  };
  const dateOptions = { month: 'long', day: 'numeric', weekday: 'long' };
  const dateString = new Intl.DateTimeFormat(locales.en, dateOptions).format(now);

  if (hour.toString().length === 1) hour = `0${hour}`;
  if (minute.toString().length === 1) minute = `0${minute}`;
  if (second.toString().length === 1) second = `0${second}`;

  const curDate = dateString.toUpperCase();
  const curTime = `${hour}:${minute}:${second}`;
  const dateClockString = `${curDate} <span class="clock">${curTime}</span>`;


  return dateClockString;
}

setInterval(() => {
  const curTime = setDateClock();
  document.getElementById('date-clock').innerHTML = curTime;
}, 1000);

// get forecast end date
function endForecastDate(date, endDay) {
  const copy = new Date(Number(date));

  copy.setDate(date.getDate() + endDay);

  return copy;
}

function endForecastDateIso(endDay) {
  const todayDAte = new Date();
  const endDate = endForecastDate(todayDAte, endDay);
  const andDateIso = endDate.toISOString().split('T');

  weatherUrlValuesObj.endTime = andDateIso[0];
}

// get weather
async function getWeather(requestWeatherObj) {
  const {
    time,
    endTime,
    lat,
    lon,
    unit,
    values,
    apiKey,
  } = requestWeatherObj;
  const url = `https://api.climacell.co/v3/weather/forecast/${time}?lat=${lat}&lon=${lon}&unit_system=${unit}&start_time=now&end_time=${endTime}&fields=${values}&apikey=${apiKey}`;
  let forecast;

  try {
    const response = await fetch(url);
    if (response.ok) {
      forecast = await response.json();
    } else {
      const errorText = await response.json();
      throw (errorText.message);
    }
  } catch (e) {
    console.log(e);
  }
  return forecast;
}

// function showForecastOnPage(responseObj) {
//   const feelsTemp = obj.feels_like[1].max;
//   const humidity = obj.humidity[1].max;
//   const temp = obj.temp[1].max;
//   const weatherCode = obj.weather_code.value;
//   const windSpeed = obj.wind_speed[1].max;

//   console.log(feelsTemp, 'feelsTemp');
//   console.log('------------------');
//   console.log(humidity, 'humidity');
//   console.log('------------------');
//   console.log(temp, 'temp');
//   console.log('------------------');
//   console.log(weatherCode, 'weatherCode');
//   console.log('------------------');
//   console.log(windSpeed, 'windSpeed');
// }
// const forecastDAtaArr = [];

function getDataFromForecast(obj, index) {
  let weatherCode;
  let feelsTemp;
  let humidity;
  let temp;
  let windSpeed;
  let observationDate;

  if (index > 0) {
    observationDate = obj.observation_time.value;
    weatherCode = obj.weather_code.value;
    temp = obj.temp[1].max;
  } else {
    feelsTemp = obj.feels_like[1].max;
    humidity = obj.humidity[1].max;
    temp = obj.temp[1].max;
    weatherCode = obj.weather_code.value;
    windSpeed = obj.wind_speed[1].max;
  }

  console.log(weatherCode, feelsTemp, humidity, temp, windSpeed, observationDate);
}

async function setPage() {
  store.locationCountry = '';
  await getLocation();
  setLocation();
  endForecastDateIso(3);
  await getWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        // forecastDAtaArr.push();
        getDataFromForecast(obj, index);

      });
    })
    .catch((e) => console.log(e));
}

setPage();
