import './assets/styles/main.scss';

import en from './assets/translations/en';
import ru from './assets/translations/ru';
import ua from './assets/translations/ua';
import { apiKeys, locales, dateOptions } from './constants';
import { loadWeather, setDataFromForecast } from './weather';
import { setDateClock, endForecastDateIso } from './time-date';

const { getName } = require('country-list');

const store = {
  tempUnit: localStorage.getItem('unit') || 'si',
  langMessage: localStorage.getItem('message') || '',
  translate: en,
  lang: locales.en,
  locationCity: '',
  locationCountry: '',
  alertsCount: 0,
};

const weatherUrlValuesObj = {
  time: 'daily',
  endTime: '',
  lat: '',
  lon: '',
  unit: store.tempUnit,
  values: 'temp%2Cfeels_like%2Cwind_speed%2Chumidity%2Cweather_code',
  apiKey: apiKeys.weather,
};

const body = document.querySelector('body');
const appBody = document.querySelector('.app-wrapper');
const bgElement = document.querySelector('.bg-lazy');
const btnSearch = document.getElementById('btn-search');
const input = document.getElementById('input');
const dropDownPanel = document.getElementById('dropdown-menu');
const switchLangBtn = document.getElementById('btnGroupDrop1');
const alertBox = document.getElementById('alert');
const langMessage = localStorage.getItem('message');
const alertDismiss = document.getElementById('alert-close');
const tempUnitsPanel = document.getElementById('temp-units');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const backgroundImageBtn = document.getElementById('background');
const spinnerImg = document.getElementById('spinner-img');
const textToTranslate = document.querySelectorAll('[data-i18n]');
let queryImgString;

function clearHideAlertBox() {
  alertBox.classList.add('hidden');
  document.querySelectorAll('.alert-text').forEach((val) => {
    val.remove();
  });
  store.alertsCount = 0;
}

function createErrorText(message, apiName) {
  const newErrorMessage = document.createElement('p');

  store.alertsCount += 1;
  newErrorMessage.classList.add('alert-text');
  newErrorMessage.innerText = apiName ? `${apiName}: ${message}` : `${message}`;
  alertBox.appendChild(newErrorMessage);
}

function setPreloadAnimation() {
  const loader = document.createElement('div');

  loader.classList.add('loader');
  body.appendChild(loader);
}

function removePreloadAnimation() {
  const loader = document.querySelector('.loader');

  body.removeChild(loader);
  appBody.style.removeProperty('opacity');
}

// load and set background image
function getQueryWords() {
  const hour = new Date().getHours();
  const month = new Date().getMonth();
  let dayPeriod;
  let season;

  if (hour <= 6) {
    dayPeriod = 'night';
  } else if (hour > 6 && hour <= 12) {
    dayPeriod = 'morning';
  } else if (hour > 12 && hour <= 18) {
    dayPeriod = 'afternoon';
  } else {
    dayPeriod = 'evening';
  }

  if (month > 1 && month <= 4) {
    season = 'spring';
  } else if (month >= 5 && month < 8) {
    season = 'summer';
  } else if (month === 11 || month === 0 || month === 1) {
    season = 'winter';
  } else if (month <= 8 && month < 11) {
    season = 'autumn';
  }

  return `${season},${dayPeriod},nature`;
}

function preloadImage(url) {
  spinnerImg.classList.add('spin');
  bgElement.classList.add('bg-loading');
  let preloaderImg = document.createElement('img');
  preloaderImg.src = url;

  preloaderImg.addEventListener('load', () => {
    bgElement.classList.remove('bg-loading');
    bgElement.style.background = `linear-gradient(rgba(5, 40, 49, 0.85), rgba(0, 0, 0, .65)), url('${url}') center center no-repeat`;
    document.body.style.backgroundSize = 'cover';
    preloaderImg = null;
    spinnerImg.classList.remove('spin');
  });
}

async function loadImage(queryString) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${queryString}&client_id=${apiKeys.images}`);
    
    if (response.ok) {
      const image = await response.json();
      const imageUrl = image.urls.regular;
      preloadImage(imageUrl);
    } else {
      if (response.status === 403) {
        const errorText = 'Image limit exceeded. Try it at the beginning of the next hour.';

        throw (errorText);
      }
      const errorText = await response.json();

      throw (errorText.errors);
    }
  } catch (e) {
    createErrorText(e, 'Image API');
  }
}

async function updateBackgroundImage() {
  queryImgString = getQueryWords();
  await loadImage(queryImgString);
  if (store.alertsCount) alertBox.classList.toggle('hidden');
}

// set map
function initMap(lat, lng) {
  const location = { lat: Number(lat), lng: Number(lng) };
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: location,
  });
  // eslint-disable-next-line no-undef
  const marker = new google.maps.Marker({
    map,
    position: location,
  });

  return marker;
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
        await initMap(cityObj.geometry.lat, cityObj.geometry.lng);
      } else {
        const errorText = 'No results for such a place. Try a different input.';

        createErrorText(errorText, 'Opencagedata API');
      }
    } else {
      const errorText = await response.json();
      throw (errorText.status.message);
    }
  } catch (e) {
    createErrorText(e, 'Opencagedata API');
  }
}

// translate page
function translateDefault() {
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

        createErrorText(errorText, 'Opencagedata API');
      }
    } else {
      const errorText = await response.json();
      throw (errorText.status.message);
    }
  } catch (e) {
    createErrorText(e, 'Opencagedata API');
  }
}

async function updateWeatherOnPage() {
  await loadWeather(weatherUrlValuesObj)
    .then((resData) => {
      if (resData) {
        resData.forEach((obj, index) => {
          setDataFromForecast(obj, index, store.lang, store.translate);
        });
      } else {
        const errorText = 'Something went wrong.';
        throw (errorText);
      }
    })
    .catch((e) => {
      createErrorText(e, 'Weather Api');
    });
}

async function translatePage() {
  await translateLocationName(store.locationCity, store.lang);
  await updateWeatherOnPage();
  await translateDefault();
  if (store.alertsCount) alertBox.classList.toggle('hidden');
}

function setDefault() {
  const storageValLang = localStorage.getItem('lang');
  const storageValUnit = localStorage.getItem('unit');

  if (storageValUnit && storageValUnit === 'si') weatherUrlValuesObj.unit = 'si';
  if (storageValUnit && storageValUnit === 'us') weatherUrlValuesObj.unit = 'us';

  if (store.tempUnit === 'si') {
    celsiusBtn.classList.add('active');
  } else {
    fahrenheitBtn.classList.add('active');
  }

  if (storageValLang && storageValLang === 'ru') {
    store.translate = ru;
    store.lang = locales.ru;
    switchLangBtn.innerHTML = 'Ru';
  }
  if (storageValLang && storageValLang === 'ua') {
    store.translate = ua;
    store.lang = locales.ua;
    switchLangBtn.innerHTML = 'Ua';
  }
}

async function setPage() {
  if (!langMessage) {
    createErrorText('Беларуский язык был заменён на мой родной украинский. Прошу не считать ошибкой, а эквивалентной заменой. :)');
    localStorage.setItem('message', 'shown');
  }

  setPreloadAnimation();
  setDefault();
  await getCurLocation();
  setLocation(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
  await translateLocationName(store.locationCity, store.lang);
  translateDefault();
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
  await updateWeatherOnPage();
  await initMap(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
  updateBackgroundImage();
  removePreloadAnimation();
}

async function updatePageOnRequest(inputString) {
  await getCoordinates(inputString, store.lang);
  weatherUrlValuesObj.endTime = endForecastDateIso(3);
  await updateWeatherOnPage();
  await setLocation(weatherUrlValuesObj.lat, weatherUrlValuesObj.lon);
  if (store.alertsCount) { alertBox.classList.toggle('hidden'); }
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
tempUnitsPanel.addEventListener('click', (event) => {
  tempUnitsPanel.querySelectorAll('.btn-success').forEach((element) => {
    element.classList.remove('active');
  });
  event.target.classList.add('active');
});

celsiusBtn.addEventListener('click', () => {
  if (weatherUrlValuesObj.unit === 'si') return;

  weatherUrlValuesObj.unit = 'si';
  localStorage.setItem('unit', 'si');
  updateWeatherOnPage();
});

fahrenheitBtn.addEventListener('click', () => {
  if (weatherUrlValuesObj.unit === 'us') return;

  weatherUrlValuesObj.unit = 'us';
  localStorage.setItem('unit', 'us');
  updateWeatherOnPage();
});

// event on change background image button
backgroundImageBtn.addEventListener('click', () => {
  updateBackgroundImage();
});

// event on change language button
dropDownPanel.addEventListener('click', (event) => {
  const selectedLang = event.target.innerHTML;

  switch (selectedLang.toLowerCase()) {
    case 'ru':
      store.lang = locales.ru;
      store.translate = ru;
      localStorage.setItem('lang', 'ru');
      break;
    case 'ua':
      store.lang = locales.ua;
      store.translate = ua;
      localStorage.setItem('lang', 'ua');

      break;
    default:
      store.lang = locales.en;
      store.translate = en;
      localStorage.setItem('lang', 'en');
  }

  translatePage();
  switchLangBtn.innerHTML = selectedLang;
});

// dismiss and clear alert box
alertDismiss.addEventListener('click', () => {
  clearHideAlertBox();
});

document.body.addEventListener('click', () => {
  const alertText = document.querySelector('.alert-text');
  if (!alertText) return;

  clearHideAlertBox();
});
