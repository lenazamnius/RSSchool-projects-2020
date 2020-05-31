import './assets/styles/main.scss';

import en from './assets/translations/en';
import ru from './assets/translations/ru';
import ua from './assets/translations/ua';
import { apiKeys, locales, dateOptions } from './constants';
import { loadWeather, setDataFromForecast } from './get-set-weather';
import { setDateClock, endForecastDateIso } from './time-date';

const { getName } = require('country-list');

const store = {
  translate: en,
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
const bgElement = document.querySelector('.bg-lazy');
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
const textToTranslate = document.querySelectorAll('[data-i18n]');

function showAlert(message) {
  alertMessage.innerHTML = message;
  alertBox.classList.toggle('hidden');
}

function preloader(url) {
  bgElement.classList.add('bg-loading');
  let preloaderImg = document.createElement('img');
  preloaderImg.src = url;

  preloaderImg.addEventListener('load', () => {
    bgElement.classList.remove('bg-loading');
    bgElement.style.background = `linear-gradient(rgba(5, 40, 49, 0.85), rgba(0, 0, 0, .65)), url('${url}') center center no-repeat`;
    document.body.style.backgroundSize = 'cover';
    preloaderImg = null;
  });
}

async function getSetImage() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=pattern&client_id=${apiKeys.images}`);

    if (response.ok) {
      const image = await response.json();
      const imageUrl = image.urls.regular;

      preloader(imageUrl);
    } else {
      const errorText = 'Fetch image limit exceeded. Try it in an one hour.';

      showAlert(errorText);
    }
  } catch (e) { showAlert(e); }
}

// set map
function initMap(lat, lng) {
  const location = { lat: Number(lat), lng: Number(lng) };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: location,
  });
  const marker = new google.maps.Marker({
    map,
    position: location,
  });
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

function convertCoordinate(coordinate) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return `${degrees}° ${minutes}' ${seconds}"`;
}

function setLocation(lat, lng) {
  const locationString = `${store.locationCity}, ${store.locationCountry}`;
  const latitude = convertCoordinate(lat);
  const longitude = convertCoordinate(lng);
  const latitudeCardinal = lat >= 0 ? 'N' : 'S';
  const longitudeCardinal = lng >= 0 ? 'E' : 'W';

  document.getElementById('latitude').innerHTML = `${latitude} ${latitudeCardinal}`;
  document.getElementById('longitude').innerHTML = `${longitude} ${longitudeCardinal}`;
  document.getElementById('location').innerHTML = locationString.toUpperCase();
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
        const errorText = 'No results for such a place. Try a different input.';

        showAlert(errorText);
      }
    } else {
      const errorText = await response.json();

      throw (errorText.status.message);
    }
  } catch (e) { showAlert(e); }
}

function translatePage() {
  textToTranslate.forEach((val) => {
    if (val.dataset.i18n === 'placeholder') {
      val.setAttribute('placeholder', store.translate[val.dataset.i18n]);
    } else {
      val.innerHTML = store.translate[val.dataset.i18n];
    }
  });
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
  await loadWeather(weatherUrlValuesObj)
    .then((resData) => {
      resData.forEach((obj, index) => {
        setDataFromForecast(obj, index, store.lang, store.translate);
      });
    })
    .catch((e) => showAlert(e));
}


async function setPage() {
  store.locationCountry = '';
  await getSetImage();
  await getCurLocation();
  setLocation(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
  translatePage();
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
  updateWeatherOnPage();
  initMap(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
}

async function updatePageOnRequest(inputString) {
  await getSetImage();
  await getCoordinates(inputString, store.lang);
  setLocation(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
  updateWeatherOnPage();
  initMap(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
}

// set current date and time
setInterval(() => {
  const curTime = setDateClock(store.lang, dateOptions);
  document.getElementById('date-clock').innerHTML = curTime;
}, 500);

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
  getSetImage();
  updateWeatherOnPage();
});

fahrenheitBtn.addEventListener('click', () => {
  if (weatherUrlValuesObj.unit === 'us') return;

  weatherUrlValuesObj.unit = 'us';
  getSetImage();
  updateWeatherOnPage();
});

backgroundImageBtn.addEventListener('click', () => {
  getSetImage();
});

// event on change language button
dropDownPanel.addEventListener('click', (event) => {
  const selectedLang = event.target.innerHTML;

  switch (selectedLang.toLowerCase()) {
    case 'ru':
      store.lang = locales.ru;
      store.translate = ru;
      break;
    case 'ua':
      store.lang = locales.ua;
      store.translate = ua;
      break;
    default:
      store.lang = locales.en;
      store.translate = en;
  }

  translateLocationName(store.locationCity, store.lang);
  updateWeatherOnPage();
  getSetImage();
  translatePage();
  switchLandBtn.innerHTML = selectedLang;
});

alertDismiss.addEventListener('click', () => {
  alertBox.classList.toggle('hidden');
});
