export function setDateClock(lang, options) {
  const now = new Date();
  const dateString = new Date(now).toLocaleString(lang, options);
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

// get forecast end date
function endForecastDate(date, endDay) {
  const copy = new Date(Number(date));

  copy.setDate(date.getDate() + endDay);

  return copy;
}

export function endForecastDateIso(endDay) {
  const todayDAte = new Date();
  const endDate = endForecastDate(todayDAte, endDay);
  const andDateIso = endDate.toISOString().split('T');

  return andDateIso[0];
}
