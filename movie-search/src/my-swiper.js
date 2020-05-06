import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 15,
  observer: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    290: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    630: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    880: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1130: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
});

export default mySwiper;
