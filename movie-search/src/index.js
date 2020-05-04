import './styles/main.scss';

import MovieSlide from './movie-slide';

const yandexAPIKey = 'trnsl.1.1.20200504T064520Z.e1d33f74b883176a.a15696bdad0036d0f2f9a019f51db4f0ae1cf1b0';
const input = document.getElementById('input');
const btnSearch = document.getElementById('btn-search');
const swiperWrapper = document.getElementById('swiper-wrapper');
const inputMessage = document.getElementById('input-message');

let inputString = 'goal';
let message = false;


function createSwiper(slidersAmount, space) {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: slidersAmount,
    spaceBetween: space,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  return swiper;
}

function swiperInitialization() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 630) {
    createSwiper(1, 0);
  } else if (windowWidth < 880) {
    createSwiper(2, 10);
  } else if (windowWidth < 1130) {
    createSwiper(3, 10);
  } else {
    createSwiper(4, 15);
  }
}

function createNewSlide(id, title, poster, year, rating = 10) {
  const newSlideObj = new MovieSlide(id, title, poster, year, rating);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
}

function createInputMessage(string) {
  const p = document.createElement('p');
  const text = `No results for "<span id="inputted-word">${string}</span>"`;

  p.setAttribute('id', 'inner-message');
  p.innerHTML = text;
  message = true;
  inputMessage.appendChild(p);
}

function deleteInputMessage() {
  const innerMessage = document.getElementById('inner-message');

  message = false;
  innerMessage.remove();
}

async function renderSwiper(inputStr) {
  const requestTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPIKey}&text=${inputStr}&lang=en`;
  const responseTranslate = await fetch(`${requestTranslate}`);
  const word = await responseTranslate.json();

  const response = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${word.text[0]}`);
  const movies = await response.json();
  // console.log('--- 2 get movies', movies);

  if (movies.Response === 'False') {
    if (message) deleteInputMessage();
    createInputMessage(word.text[0]);
  } else {
    if (message) deleteInputMessage();
    swiperWrapper.innerHTML = '';

    await Promise.all(movies.Search.map(async (movie) => {
      const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=3b910c7f&type=movie&i=${movie.imdbID}`);
      const rating = await movieResponse.json();
      const newCard = createNewSlide(movie.imdbID, movie.Title, movie.Poster, movie.Year, rating.imdbRating);

      swiperWrapper.appendChild(newCard);
    }));

    swiperInitialization();
  }
}

renderSwiper(inputString);
window.onresize = swiperInitialization;

// event on enter input and on press search button
input.addEventListener('keypress', function eventFn(event) {
  if (!message) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    inputString = this.value;
    renderSwiper(inputString);
  }
});

btnSearch.addEventListener('click', () => {
  if (!message && !input.value) return;

  inputString = input.value;
  renderSwiper(inputString);
});


// async function translateInput(inputWord) {
//   const requestTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPIKey}&text=${inputWord}&lang=en`;
//   const response = await fetch(`${requestTranslate}`);
//   const word = await response.json();

//   console.log(word.text[0]);
// }

// translateInput(inputString);
