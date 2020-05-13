import './styles/main.scss';

import mySwiper from './my-swiper';
import MovieSlide from './movie-slide';
import {
  createBoard,
  keyDownEvent,
  keyUpEvent,
  eventsOnMousedown,
  eventsOnMouseup} from './keyboard';

const yandexAPIKey = 'trnsl.1.1.20200504T064520Z.e1d33f74b883176a.a15696bdad0036d0f2f9a019f51db4f0ae1cf1b0';
const input = document.getElementById('input');
const btnSearch = document.getElementById('btn-search');
const inputMessage = document.getElementById('input-message');
const deleteInput = document.getElementById('delete-input');
const keyboardBtn = document.getElementById('keyboard');
const loader = document.getElementById('loader');

const config = {
  inputString: 'bicycle',
  requestPage: 1,
  message: false,
  massageTranslate: '',
};

let moviesArr = [];
let keyboardContainer;
let message;

function createNewSlide(id, title, poster, year, rating = 10) {
  const newSlideObj = new MovieSlide(id, title, poster, year, rating);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
}

function createInputMessage(string, errorText) {
  const p = document.createElement('p');
  const text = !config.massageTranslate
    ? `No results for "<span id="inputted-word">${string}.</span>" ${errorText}`
    : `Show results for "<span id="inputted-word">${string}</span>"`;

  p.setAttribute('id', 'inner-message');
  p.innerHTML = text;
  inputMessage.appendChild(p);
  config.message = true;
}

function deleteInputMessage() {
  const innerMessage = document.getElementById('inner-message');

  config.message = false;
  config.massageTranslate = '';
  innerMessage.remove();
}

async function translateInput(word) {
  const requestTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPIKey}&text=${word}&lang=en`;
  const responseTranslate = await fetch(`${requestTranslate}`);
  const translatedWord = await responseTranslate.json();

  return translatedWord;
}

async function fetchMovies(word, page) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${word}&page=${page}`);
  const movies = await response.json();
  config.requestPage += 1;

  return movies;
}

async function fillSwiper() {
  await Promise.all(moviesArr.map(async (movie) => {
    const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&i=${movie.imdbID}`);
    const rating = await movieResponse.json();
    const movieInfo = [movie.imdbID, movie.Title, movie.Poster, movie.Year];
    const newCard = createNewSlide(...movieInfo, rating.imdbRating);

    mySwiper.appendSlide(newCard);
    mySwiper.update();
  }));

  moviesArr = [];
}

async function appendSlides() {
  if (config.message) {
    message = document.getElementById('inner-message');
    message.classList.add('hidden');
  }

  loader.classList.remove('hidden');
  await fetchMovies(config.inputString, config.requestPage)
    .then((resMovie) => {
      if (resMovie.Response !== 'False') {
        resMovie.Search.forEach((val) => moviesArr.push(val));
      }
    })
    .catch((err) => { throw new Error(err); });

  await fillSwiper();
  loader.classList.add('hidden');
  if (config.message) message.classList.remove('hidden');
}

async function renderSwiper(inputStr) {
  if (config.message) deleteInputMessage();

  await translateInput(inputStr)
    .then((res) => {
      config.inputString = res.text[0];
      config.massageTranslate = res.lang === 'ru-en' ? 'ru' : '';
    });

  await fetchMovies(config.inputString, config.requestPage)
    .then((resMovie) => {
      if (resMovie.Response === 'False') {
        config.massageTranslate = '';
        loader.classList.add('hidden');
        createInputMessage(config.inputString, resMovie.Error);
      } else {
        resMovie.Search.forEach((val) => moviesArr.push(val));
        mySwiper.removeAllSlides();
      }
    })
    .catch((err) => { throw new Error(err); });

  await fillSwiper();
  loader.classList.add('hidden');

  if (config.massageTranslate === 'ru') createInputMessage(config.inputString);
}

function renderRequestResult(inputStr){
  loader.classList.remove('hidden');
  config.inputString = inputStr;
  config.requestPage = 1;
  renderSwiper(config.inputString);
}

// render swiper with first request on page load
renderSwiper(config.inputString);

// press event on enter key and on search button
input.addEventListener('keypress', function eventFn(event) {
  if (!config.message) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    renderRequestResult(this.value);
  }
});

btnSearch.addEventListener('click', () => {
  if (!config.message && !input.value) return;

  renderRequestResult(input.value);
});

deleteInput.addEventListener('click', () => {
  input.value = '';
  if (config.message) deleteInputMessage();
});

mySwiper.on('slideNextTransitionStart', () => {
  if (mySwiper.isEnd) {
    appendSlides();
  }
});

keyboardBtn.addEventListener('click', (event) => {
  
  const keyboardIcon = event.target.closest('.input-group-text');
  keyboard.classList.toggle('visible');
  if ([...keyboardIcon.classList].includes('visible')) {
    createBoard();
    keyboardContainer = document.querySelector('.keyboard-container');
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        renderRequestResult(input.value);
      }
      keyDownEvent(event)
    });
    document.addEventListener('keyup', (event) => keyUpEvent(event));
    keyboardContainer.addEventListener('mousedown', (event) => {
      if (event.target.innerHTML === 'enter') {
        event.preventDefault();
        renderRequestResult(input.value);
      }
      eventsOnMousedown(event)
    });
    keyboardContainer.addEventListener('mouseup', (event) => eventsOnMouseup(event));
  } else {
    const keyboardWrap = document.querySelector('.keyboard-wrapper');
    keyboardWrap.remove();
  }
})
