import './styles/main.scss';

import MovieSlide from './movie-slide';

const inputString = 'cat';
const swiperWrapper = document.getElementById('swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const moviesData = [];

function createNewSlide(id, title, poster, year, rating = 8) {
  const newSlideObj = new MovieSlide(id, title, poster, year);
  const newCardHtmlElement = newSlideObj.createSlideHtmlElements();

  return newCardHtmlElement;
  // swiperWrapper.appendChild(newCard);
}

const fetchData = async (inputStr) => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${inputStr}`);
  let data;
  if (!response.ok) {
    return;
  } else {
    data = await response.json();   
  }
  return data;
}

// fetchData(inputString);
fetchData(inputString)
.then(data => {
  if (data.Response === 'False') {
    console.log(`${inputString} not fond`);
  } else {
    for (let movie of data.Search) {
      moviesData.push(movie);
    }
  }
  return moviesData;
})
.then(moviesData => {
  moviesData.forEach((movie) => {
    const newCard = createNewSlide(movie.imdbID, movie.Title, movie.Poster, movie.Year);
    swiperWrapper.appendChild(newCard);
  })

  swiperInitialization();
})

const inputWord = document.getElementById('inputted-word');
inputWord.innerHTML = inputString;


function createSwiper(slidersAmount, space) {
  // console.log(slidersAmount, space)
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
  
  if(windowWidth < 630) {
    createSwiper(1, 0)
  } else if(windowWidth < 880) {
    createSwiper(2, 10)
  } else if(windowWidth < 1130) {
    createSwiper(3, 10)
  } else {
    createSwiper(4, 15)
  }
}

// swiperInitialization();
window.onresize = swiperInitialization;

// fetch(`http://www.omdbapi.com/?apikey=3b910c7f&type=movie&s=${inputStr}`)
  // .then((res) => {
  //   if (!res.ok) {
  //     return;
  //   } else {
  //     res.json().then((data) => {
  //       if (data.Response === 'False') {
  //         console.log(`${inputString} not fond`);
  //       } else {
  //         for (let movie of data.Search) {
  //           console.log(movie);
  //           moviesData.push(movie);
  //         }
  //       }       
  //     });
  //   }
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
