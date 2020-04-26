import './styles/main.scss';

console.log('Hello from main.js');

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 10,
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