import './styles/main.scss';

import MovieSlide from './movie-slide';


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

swiperInitialization();
window.onresize = swiperInitialization;