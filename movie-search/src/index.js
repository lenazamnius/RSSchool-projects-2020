import './assets/styles/main.scss';
import mySwiper from './my-swiper';
import MovieSlide from './movie-slide';
import {
  createBoard,
  keyDownEvent,
  keyUpEvent,
  eventsOnMousedown,
  eventsOnMouseup,
} from './keyboard';

const btnSearch = document.getElementById('btn-search');
const inputMessage = document.getElementById('input-message');
const deleteInput = document.getElementById('delete-input');
const keyboardBtn = document.getElementById('keyboard');
const loader = document.getElementById('loader');
const input = document.getElementById('input');

const store = {
  inputString: 'bicycle',
  requestPage: 1,
  isMessage: false,
  massageTranslate: '',
};

let moviesArr = [];
let keyboardContainer;
let message;

function createNewSlide(movieInfo) {
  const {
    id,
    title,
    poster,
    year,
    movRating,
  } = movieInfo;
  const newSlideObj = new MovieSlide(id, title, poster, year, movRating);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
}

function createInputMessage(string, errorText) {
  const p = document.createElement('p');
  const text = !store.massageTranslate
    ? `No results for "<span id="inputted-word">${string}.</span>" ${errorText}`
    : `Show results for "<span id="inputted-word">${string}</span>"`;

  p.setAttribute('id', 'inner-message');
  p.innerHTML = text;
  inputMessage.appendChild(p);
  store.isMessage = true;
}

function deleteInputMessage() {
  const innerMessage = document.getElementById('inner-message');

  store.isMessage = false;
  store.massageTranslate = '';
  innerMessage.remove();
}

async function fetchMovies(word, page) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${word}&page=${page}`);
  const movies = await response.json();
  store.requestPage += 1;

  return movies;
}

async function fillSwiper() {
  await Promise.all(moviesArr.map(async (movie) => {
    const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&i=${movie.imdbID}`);
    const rating = await movieResponse.json();
    const movieInfo = {
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      movRating: rating.imdbRating,
    };
    const newCard = createNewSlide(movieInfo);

    mySwiper.appendSlide(newCard);
    mySwiper.update();
  }));

  moviesArr = [];
}

async function appendSlides() {
  if (store.isMessage) {
    message = document.getElementById('inner-message');
    message.classList.add('hidden');
  }

  loader.classList.remove('hidden');
  await fetchMovies(store.inputString, store.requestPage)
    .then((resMovie) => {
      if (resMovie.Response !== 'False') {
        resMovie.Search.forEach((val) => moviesArr.push(val));
      }
    })
    .catch((err) => {
      throw new Error(err);
    });

  await fillSwiper();
  loader.classList.add('hidden');
  if (store.isMessage) message.classList.remove('hidden');
}

async function renderSwiper(inputStr) {
  if (store.isMessage) deleteInputMessage();

  // yandex translator doesn't work in Ukraine now

  // await translateInput(inputStr)
  //   .then((res) => {
  //     store.inputString = res.text[0];
  //     store.massageTranslate = res.lang === 'ru-en' ? 'ru' : '';
  //   });

  await fetchMovies(inputStr, store.requestPage)
    .then((resMovie) => {
      if (resMovie.Response === 'False') {
        store.massageTranslate = '';
        loader.classList.add('hidden');
        createInputMessage(store.inputString, resMovie.Error);
      } else {
        resMovie.Search.forEach((val) => moviesArr.push(val));
        mySwiper.removeAllSlides();
      }
    })
    .catch((err) => {
      throw new Error(err);
    });

  await fillSwiper();
  loader.classList.add('hidden');

  if (store.massageTranslate === 'ru') createInputMessage(store.inputString);
}

function renderRequestResult(inputStr) {
  loader.classList.remove('hidden');
  store.inputString = inputStr;
  store.requestPage = 1;
  renderSwiper(store.inputString);
}

// render swiper with first request on page load
renderSwiper(store.inputString);

mySwiper.on('slideNextTransitionStart', () => {
  if (mySwiper.isEnd) {
    appendSlides();
  }
});

// events on enter key and on search button
input.addEventListener('keypress', function eventFn(event) {
  if (!store.isMessage) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    renderRequestResult(this.value);
  }
});

btnSearch.addEventListener('click', () => {
  if (!store.isMessage && !input.value) return;

  renderRequestResult(input.value);
});

deleteInput.addEventListener('click', () => {
  input.value = '';
  if (store.isMessage) deleteInputMessage();
});

// events on virtual keyboard
keyboardBtn.addEventListener('click', (event) => {
  const keyboardIcon = event.target.closest('.input-group-text');
  keyboardIcon.classList.toggle('visible');
  if ([...keyboardIcon.classList].includes('visible')) {
    createBoard();
    keyboardContainer = document.querySelector('.keyboard-container');

    document.addEventListener('keydown', (eventKeydown) => {
      if (eventKeydown.key === 'Enter') {
        eventKeydown.preventDefault();
        renderRequestResult(input.value);
      }
      keyDownEvent(eventKeydown);
    });

    keyboardContainer.addEventListener('mousedown', (eventMousedown) => {
      if (eventMousedown.target.innerHTML === 'enter') {
        eventMousedown.preventDefault();
        renderRequestResult(input.value);
      }
      eventsOnMousedown(eventMousedown);
    });

    document.addEventListener('keyup', (eventKeyup) => keyUpEvent(eventKeyup));
    keyboardContainer.addEventListener('mouseup', (eventMouseup) => eventsOnMouseup(eventMouseup));
  } else {
    const keyboardWrap = document.querySelector('.keyboard-wrapper');

    keyboardWrap.remove();
  }
});
