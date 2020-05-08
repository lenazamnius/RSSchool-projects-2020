import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  observer: true,
  initialSlide: 1,
  // centeredSlides: true,
  // centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  updateOnImagesReady: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
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
