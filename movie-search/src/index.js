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
  inputString: 'cat',
  message: false,
  massageTranslate: '',
};

function createNewSlide(id, title, poster, year, rating = 10) {
  const newSlideObj = new MovieSlide(id, title, poster, year, rating);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
}

function createInputMessage(string) {
  const p = document.createElement('p');
  const text = !config.massageTranslate
    ? `No results for "<span id="inputted-word">${string}</span>"`
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

async function renderSwiper(inputStr) {
  if (config.message) deleteInputMessage();

  const requestTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPIKey}&text=${inputStr}&lang=en`;
  const responseTranslate = await fetch(`${requestTranslate}`);
  const word = await responseTranslate.json();

  config.massageTranslate = word.lang === 'ru-en' ? 'ru' : '';

  const response = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${word.text[0]}`);
  const movies = await response.json();

  if (movies.Response === 'False') {
    config.massageTranslate = '';
    loader.classList.add('hidden');
    createInputMessage(word.text[0]);
  } else {
    if (!config.massageTranslate && config.message) deleteInputMessage();

    mySwiper.removeAllSlides();

    await Promise.all(movies.Search.map(async (movie) => {
      const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&i=${movie.imdbID}`);
      const rating = await movieResponse.json();
      const movieInfo = [movie.imdbID, movie.Title, movie.Poster, movie.Year];
      const newCard = createNewSlide(...movieInfo, rating.imdbRating);

      mySwiper.appendSlide(newCard);
    }));

    loader.classList.add('hidden');

    if (config.massageTranslate === 'ru') createInputMessage(word.text[0]);

    mySwiper.update();
  }
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
