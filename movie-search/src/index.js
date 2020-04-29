import './styles/main.scss';

import MovieSlide from './movie-slide';

const input = document.getElementById('input');
const btnSearch = document.getElementById('btn-search');
const swiperWrapper = document.getElementById('swiper-wrapper');
const inputMessage = document.getElementById('input-message');

const moviesData = [];
const moviesRating = [];
let inputString = 'cat';
let message = false;

window.onresize = swiperInitialization;

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
  console.log('swiperInitialization')
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

function createNewSlide(id, title, poster, year, rating = 7) {
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


// const fetchId = async (id) => {
//   const response = await fetch(`http://www.omdbapi.com/?apikey=3b910c7f&type=movie&i=${id}`);

//   if (!response.ok) return;

//   const data = await response.json();
//   console.log('get rating');
//   return data.imdbRating;
// };

const fetchMovie = async (inputStr) => {
  if(message) deleteInputMessage();

  const response = await fetch(`http://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${inputStr}`);

  if (!response.ok) return;

  const data = await response.json();

  if (data.Response === 'False') {
    inputWord.innerHTML = inputString;
  } else {
    data.Search.forEach((movie) => {
      // const movieId = movie.imdbID;
      // movie.Rating = fetchId(movieId);
      // .then((res) => {
      //   console.log('update arr');
      //   movie.Rating = res;
      // })
      moviesData.push(movie);
    });
  }
}

fetchMovie(inputString)
.then(() => {
  moviesData.forEach((movie) => {
    const newCard = createNewSlide(movie.imdbID, movie.Title, movie.Poster, movie.Year, movie.Rating);
    swiperWrapper.appendChild(newCard);
  })
  swiperInitialization();
})


// event on enter input and on press search button
input.addEventListener('keypress', function(event) {
  if(!message) return;
  if (event.key === 'Enter') {
    event.preventDefault();
    inputString = this.value;

    fetchMovie(inputString)
    .catch(() => {
      createInputMessage(inputString);
    })
  }
});

btnSearch.addEventListener('click',  function() {
  if(!message && !input.value) return;
  inputString = input.value;

  fetchMovie(inputString)
  .catch(() => {
    createInputMessage(inputString);
  })
});

