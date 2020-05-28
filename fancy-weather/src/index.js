import './assets/styles/main.scss';

import {
  apiKeys,
  weatherDescription,
  locales,
  dateOptions,
} from './constants';

import {
  getWeather,
  setDataFromForecast,
} from './get-set-weather';

import {
  setDateClock,
  endForecastDateIso,
} from './timeDate';

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
const alertBox = document.getElementById('alert');
const alertMessage = document.getElementById('error-message');
const alertDismiss = document.getElementById('alert-close');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const backgroundImageBtn = document.getElementById('background');

function showAlert(message) {
  alertMessage.innerHTML = message;
  alertBox.classList.toggle('hidden');
}

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
setInterval(() => {
  const curTime = setDateClock(store.lang, dateOptions);
  document.getElementById('date-clock').innerHTML = curTime;
}, 500);

// async function getImage() {
//   try {
//     const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=pattern&client_id=${apiKeys.images}`);
//     if (response.ok) {
//       const image = await response.json();
//       const imageUrl = image.urls.raw;
//       document.body.style.background = `linear-gradient(rgba(0, 0, 0, .65), rgba(0, 0, 0, 0.45)), url('${imageUrl}') center center no-repeat`;
//       document.body.style.backgroundSize = 'cover';
//     } else {
//       throw Error('Rate Limit Exceeded');
//     }
//     // preload(imageUrl);
//   } catch (e) { showAlert(e); }
// }

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
        const errorText = 'No results for such a place. Try a different input.';

        showAlert(errorText);
      }
    } else {
      const errorText = await response.json();

      throw (errorText.status.message);
    }
  } catch (e) { showAlert(e); }
}

async function translateLocationName(city, lang) {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&language=${lang}&key=${apiKeys.coordinates}`);

    if (response.ok) {
      const resultsObj = await response.json();

      if (resultsObj.total_results) {
        const cityObj = resultsObj.results[0];
        const locationName = cityObj.formatted.split(', ');
        const locationString = `${locationName[0]}, ${locationName[locationName.length - 1]}`;

        document.getElementById('location').innerHTML = locationString.toUpperCase();
      } else {
        const errorText = 'Something went wrong. Try a different input.';

        showAlert(errorText);
      }
    } else {
      const errorText = await response.json();
      throw (errorText.status.message);
    }
  } catch (e) { showAlert(e); }
}

async function updateWeatherOnPage() {
  await getWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        setDataFromForecast(obj, index, store.lang, weatherDescription);
      });
    })
    .catch((e) => e);
}

async function setPage() {
  store.locationCountry = '';
  // await getImage();
  await getCurLocation();
  setLocation();
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
  updateWeatherOnPage();
}

async function updatePageOnRequest(inputString) {
  // await getImage();
  await getCoordinates(inputString, store.lang);
  setLocation();
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
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

// event on change language button
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

  translateLocationName(store.locationCity, store.lang);
  updateWeatherOnPage();
  switchLandBtn.innerHTML = selectedLang;
});

alertDismiss.addEventListener('click', () => {
  alertBox.classList.toggle('hidden');
});
