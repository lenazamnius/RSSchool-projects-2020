import './assets/styles/main.scss';

import {
  apiKeys,
  weatherDescription,
  locales,
  dateOptions,
} from './constants';

const { getName } = require('country-list');

const store = {
  lang: locales.en,
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

// const loader = document.getElementById('loader');
const btnSearch = document.getElementById('btn-search');
const input = document.getElementById('input');
const dropDownPanel = document.getElementById('dropdown-menu');
const switchLandBtn = document.getElementById('btnGroupDrop1');
const curTemp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherType = document.getElementById('weather-type');
const feelsTemp = document.getElementById('feels-like');
const feelsTempUnit = document.getElementById('feels-unit');
const windSpeed = document.getElementById('wind-speed');
const windSpeedUnit = document.getElementById('wind-unit');
const humidity = document.getElementById('humidity');
const weekDay = document.querySelectorAll('.week-day');
const futureTemps = document.querySelectorAll('.future-temp');
const futureWeatherIcons = document.querySelectorAll('.future-weather-icon');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const backgroundImageBtn = document.getElementById('background');

// get and set location
async function getCurLocation() {
  const response = await fetch(`https://ipinfo.io/?token=${apiKeys.curLocation}`);
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
  const locationString = `${store.locationCity}, ${store.locationCountry}`;

  document.getElementById('latitude').innerHTML = weatherUrlValuesObj.lat;
  document.getElementById('longitude').innerHTML = weatherUrlValuesObj.lon;
  document.getElementById('location').innerHTML = locationString.toUpperCase();
}

// set current date and time
function setDateClock(lang) {
  const now = new Date();
  const dateString = new Date(now).toLocaleString(lang, dateOptions);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if (hour.toString().length === 1) hour = `0${hour}`;
  if (minute.toString().length === 1) minute = `0${minute}`;
  if (second.toString().length === 1) second = `0${second}`;

  const curDate = dateString.toUpperCase();
  const curTime = `${hour}:${minute}:${second}`;
  const dateClockString = `${curDate} <span class="clock">${curTime}</span>`;

  return dateClockString;
}

setInterval(() => {
  const curTime = setDateClock(store.lang);
  document.getElementById('date-clock').innerHTML = curTime;
}, 500);

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
  } catch (e) { return e; }

  return forecast;
}

function setDataFromForecast(obj, index, lang) {
  const weatherCode = obj.weather_code.value;
  const tempValue = Math.round(obj.temp[1].max.value);

  if (index > 0) {
    weekDay.forEach((val, idx) => {
      const weekName = new Date(obj.observation_time.value).toLocaleString(lang, { weekday: 'long' });

      if (index === idx + 1) val.innerHTML = weekName;
    });
    futureTemps.forEach((val, idx) => {
      if (index === idx + 1) val.innerHTML = tempValue;
    });
    futureWeatherIcons.forEach((val, idx) => {
      if (index === idx + 1) val.src = `../src/assets/images/${weatherCode}.svg`;
    });
  } else {
    weatherType.innerHTML = weatherDescription[weatherCode];
    curTemp.innerHTML = tempValue;
    weatherIcon.src = `../src/assets/images/${weatherCode}.svg`;
    feelsTemp.innerHTML = Math.round(obj.feels_like[1].max.value);
    feelsTempUnit.innerHTML = obj.feels_like[1].max.units;
    windSpeed.innerHTML = obj.wind_speed[1].max.value;
    windSpeedUnit.innerHTML = obj.wind_speed[1].max.units;
    humidity.innerHTML = obj.humidity[1].max.value;
  }
}

async function getImage() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=pattern&client_id=${apiKeys.images}`);
    if (response.ok) {
      const image = await response.json();
      const imageUrl = image.urls.raw;
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, .65), rgba(0, 0, 0, 0.45)), url('${imageUrl}') center center no-repeat`;
      document.body.style.backgroundSize = 'cover';
    } else {
      throw Error('Rate Limit Exceeded');
    }
    // preload(imageUrl);
  } catch (e) {
    console.log(e);
  }
}

// get input city coordinates
async function getCoordinates(cityInput, lang) {
  const requestString = cityInput.split(' ').join(',');

  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${requestString}&language=${lang}&key=${apiKeys.coordinates}`);

    if (response.ok) {
      const resultsObj = await response.json();

      if (resultsObj.total_results) {
        const cityObj = resultsObj.results[0];
        const locationName = cityObj.formatted.split(', ');

        weatherUrlValuesObj.lat = cityObj.geometry.lat;
        weatherUrlValuesObj.lon = cityObj.geometry.lng;
        store.locationCity = locationName[0];
        store.locationCountry = locationName[locationName.length - 1];
      } else {
        console.log('No results for such a place. Try a different input.');
      }
    } else {
      const errorText = await response.json();
      throw (errorText.status.message);
    }
  } catch (e) { console.log(e); }
}

async function updateWeatherOnPage() {
  await getWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        setDataFromForecast(obj, index, store.lang);
      });
    })
    .catch((e) => e);
}

async function setPage() {
  store.locationCountry = '';
  // await getImage();
  await getCurLocation();
  setLocation();
  endForecastDateIso(3);
  updateWeatherOnPage();
}

async function updatePageOnRequest(inputString) {
  // await getImage();
  await getCoordinates(inputString, store.lang);
  setLocation();
  endForecastDateIso(3);
  updateWeatherOnPage();
}

// page initialization
setPage();

// events with input form
input.addEventListener('keypress', function eventFn(event) {
  if (!this.value) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    updatePageOnRequest(this.value);
  }
});

btnSearch.addEventListener('click', () => {
  if (!input.value) return;

  updatePageOnRequest(input.value);
});

// change weather forecast units
celsiusBtn.addEventListener('click', () => {
  if (weatherUrlValuesObj.unit === 'si') return;

  weatherUrlValuesObj.unit = 'si';
  updateWeatherOnPage();
});

fahrenheitBtn.addEventListener('click', () => {
  if (weatherUrlValuesObj.unit === 'us') return;

  weatherUrlValuesObj.unit = 'us';
  updateWeatherOnPage();
});

backgroundImageBtn.addEventListener('click', () => {
  // getImage();
});

// event on change lang button
dropDownPanel.addEventListener('click', (event) => {
  const selectedLang = event.target.innerHTML;

  switch (selectedLang.toLowerCase()) {
    case 'ru':
      store.lang = locales.ru;
      break;
    case 'ua':
      store.lang = locales.ua;
      break;
    default:
      store.lang = locales.en;
  }

  updateWeatherOnPage();
  switchLandBtn.innerHTML = selectedLang;
});
