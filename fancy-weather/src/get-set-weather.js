const curTemp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherType = document.getElementById('weather-type');
const feelsTemp = document.getElementById('feels-temp');
const feelsTempUnit = document.getElementById('feels-unit');
const windSpeed = document.getElementById('wind-speed');
const windSpeedUnit = document.getElementById('wind-unit');
const humidity = document.getElementById('humidity');
const weekDay = document.querySelectorAll('.week-day');
const futureTemps = document.querySelectorAll('.future-temp');
const futureWeatherIcons = document.querySelectorAll('.future-weather-icon');
const alertBox = document.getElementById('alert');

export async function loadWeather(requestWeatherObj) {
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
    const newErrorMessage = document.createElement('p');

    newErrorMessage.classList.add('alert-text');
    newErrorMessage.innerText = `Weather Api: ${e}`;
    alertBox.appendChild(newErrorMessage);
  }

  return forecast;
}

export function setDataFromForecast(obj, index, lang, weatherDescription) {
  const weatherCode = obj.weather_code.value;
  const tempValue = Math.round(obj.temp[1].max.value);

  if (index > 0) {
    weekDay.forEach((val, idx) => {
      const weekName = new Date(obj.observation_time.value).toLocaleString(lang, { weekday: 'long' });

      if (index === idx + 1) val.innerHTML = weekName.toUpperCase();
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
    feelsTemp.innerHTML = Math.round(obj.feels_like[0].min.value);
    feelsTempUnit.innerHTML = obj.feels_like[1].max.units;
    windSpeed.innerHTML = obj.wind_speed[1].max.value;
    windSpeedUnit.innerHTML = obj.wind_speed[1].max.units;
    humidity.innerHTML = obj.humidity[1].max.value;
  }
}
