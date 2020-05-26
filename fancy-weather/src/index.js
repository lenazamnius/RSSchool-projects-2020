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

async function setPage() {
  store.locationCountry = '';
  await getLocation();
  await setLocation();
}

setPage();
