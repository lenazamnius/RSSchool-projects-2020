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

const weatherDescription = {
  rain_heavy: 'Substantial rain',
  rain: 'Rain',
  rain_light: 'Light rain',
  freezing_rain_heavy: 'Substantial freezing rain',
  freezing_rain: 'Freezing rain',
  freezing_rain_light: 'Light freezing rain',
  freezing_drizzle: 'Light freezing rain falling in fine pieces',
  drizzle: 'Light rain falling in very fine drops',
  ice_pellets_heavy: 'Substantial ice pellets',
  ice_pellets: 'Ice pellets',
  ice_pellets_light: 'Light ice pellets',
  snow_heavy: 'Substantial snow',
  snow: 'Snow',
  snow_light: 'Light snow',
  flurries: 'Flurries',
  tstorm: 'Thunderstorm conditions',
  fog_light: 'Light fog',
  fog: 'Fog',
  cloudy: 'Cloudy',
  mostly_cloudy: 'Mostly cloudy',
  partly_cloudy: 'Partly cloudy',
  mostly_clear: 'Mostly clear',
  clear: 'Clear, sunny',
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

const curTemp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherType = document.getElementById('weather-type');
const feelsTemp = document.getElementById('feels-like');
const feelsTempUnit = document.getElementById('feels-unit');
const windSpeed = document.getElementById('wind-speed');
const windSpeedUnit = document.getElementById('wind-unit');
const humidity = document.getElementById('humidity');
const weekDay = document.querySelectorAll('.week-day');
const futureTemp = document.querySelectorAll('.future-temp');
const futureWeatherIcon = document.querySelectorAll('.future-weather-icon');

function setDataFromForecast(obj, index) {
  const weatherCode = obj.weather_code.value;
  const tempValue = Math.round(obj.temp[1].max.value);

  if (index > 0) {
    weekDay.forEach((val, idx) => {
      const weekName = new Date(obj.observation_time.value).toLocaleString('en-US', { weekday: 'long' });

      if (index === idx + 1) val.innerHTML = weekName;
    });
    futureTemp.forEach((val, idx) => {
      if (index === idx + 1) val.innerHTML = tempValue;
    });
    futureWeatherIcon.forEach((val, idx) => {
      if (index === idx + 1) val.src = `/src/assets/images/${weatherCode}.svg`;
    });
  } else {
    weatherType.innerHTML = weatherDescription[weatherCode];
    curTemp.innerHTML = tempValue;
    weatherIcon.src = `/src/assets/images/${weatherCode}.svg`;
    feelsTemp.innerHTML = Math.round(obj.feels_like[1].max.value - 2);
    feelsTempUnit.innerHTML = obj.feels_like[1].max.units;
    windSpeed.innerHTML = obj.wind_speed[1].max.value;
    windSpeedUnit.innerHTML = obj.wind_speed[1].max.units;
    humidity.innerHTML = obj.humidity[1].max.value;
  }
}

// get input city coordinates
async function getCoordinates(cityInput) {
  const requestString = cityInput.split(' ').join(',');
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${requestString}&key=${apiKeys.coordinates}`);
    const resultsObj = await response.json();
    const cityObj = resultsObj.results[0];
    const locationName = cityObj.formatted.split(', ');

    weatherUrlValuesObj.lat = cityObj.geometry.lat;
    weatherUrlValuesObj.lon = cityObj.geometry.lng;
    store.locationCity = locationName[0];
    store.locationCountry = locationName[locationName.length - 1];
    console.log(cityObj);
  } catch (e) {
    console.log(e);
  }
}


async function setPage() {
  store.locationCountry = '';
  await getLocation();
  setLocation();
  endForecastDateIso(3);
  await getWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        setDataFromForecast(obj, index);
      });
    })
    .catch((e) => console.log(e));
}

async function updatePage(inputString) {
  await getCoordinates(inputString);
  setLocation();
  endForecastDateIso(3);
  await getWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        setDataFromForecast(obj, index);
      });
    })
    .catch((e) => console.log(e));
}

setPage();

const btnSearch = document.getElementById('btn-search');
const input = document.getElementById('input');

input.addEventListener('keypress', function eventFn(event) {
  if (!this.value) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    updatePage(this.value);
  }
});

btnSearch.addEventListener('click', () => {
  if (!input.value) return;

  updatePage(input.value);
});
