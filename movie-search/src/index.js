import './styles/main.scss';

import mySwiper from './my-swiper';
import MovieSlide from './movie-slide';

const yandexAPIKey = 'trnsl.1.1.20200504T064520Z.e1d33f74b883176a.a15696bdad0036d0f2f9a019f51db4f0ae1cf1b0';
const input = document.getElementById('input');
const btnSearch = document.getElementById('btn-search');
const inputMessage = document.getElementById('input-message');
const deleteInput = document.getElementById('delete-input');
const loader = document.getElementById('loader');

const config = {
  inputString: 'devil',
  requestPage: 1,
  message: false,
  massageTranslate: '',
};

let moviesArr = [];

function createNewSlide(id, title, poster, year, rating = 10) {
  const newSlideObj = new MovieSlide(id, title, poster, year, rating);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
}

function createInputMessage(string) {
  const p = document.createElement('p');
  const text = !config.massageTranslate
    ? `No results were found for "<span id="inputted-word">${string}</span>"`
    : `Show results for "<span id="inputted-word">${string}</span>"`;

  p.setAttribute('id', 'inner-message');
  p.innerHTML = text;
  config.message = true;
  inputMessage.appendChild(p);
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

async function addSlides() {
  await fetchMovies(config.inputString, config.requestPage)
    .then((resMovie) => {
      resMovie.Search.forEach((val) => moviesArr.push(val));
    });

  await fillSwiper();
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
        createInputMessage(config.inputString);
      }
      resMovie.Search.forEach((val) => moviesArr.push(val));
    })
    .catch((err) => {
      // console.log('No result for this input');
      throw err;
    });

  if (!config.massageTranslate && config.message) deleteInputMessage();

  mySwiper.removeAllSlides();
  await fillSwiper();
  loader.classList.add('hidden');
  if (config.massageTranslate === 'ru') createInputMessage(config.inputString);
}

renderSwiper(config.inputString);

// event on enter input and on press search button
input.addEventListener('keypress', function eventFn(event) {
  if (!config.message) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    loader.classList.remove('hidden');
    config.inputString = this.value;
    renderSwiper(config.inputString);
  }
});

btnSearch.addEventListener('click', () => {
  if (!config.message && !input.value) return;

  loader.classList.remove('hidden');
  config.inputString = input.value;
  renderSwiper(config.inputString);
});

deleteInput.addEventListener('click', () => {
  input.value = '';
});

mySwiper.on('slideNextTransitionStart', () => {
  if (mySwiper.isEnd) {
    addSlides();
  }
});
