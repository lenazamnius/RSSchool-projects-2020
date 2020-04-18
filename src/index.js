import './styles/main.scss';
import CardsList from './cards-list';

const config = {
  page: '',
  mode: '',
  game: '',
};

const boardContainer = document.getElementById('board-container');
const sidebar = document.getElementById('sidebar-menu');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('burger');
const toggleSwitch = document.getElementById('toggle');
const logo = document.getElementById('logo-text');
const startGameButton = document.querySelector('.start-button');
let selectedSidebarItem;
let pageBoard;

function init() {
  config.page = 'Main Page';
  config.mode = 'train';
  config.game = 'off';
  pageBoard = new CardsList(config.page, config.mode);
  boardContainer.appendChild(pageBoard.createTrainBoard());
}

function highlightMenuItem(menuItem) {
  sidebarItems.forEach((val) => val.classList.remove('active'));
  selectedSidebarItem = menuItem;
  selectedSidebarItem.classList.add('active');
}

function newCardsBoard(cardVal) {
  config.page = cardVal;

  while (boardContainer.firstChild) boardContainer.removeChild(boardContainer.firstChild);

  pageBoard = new CardsList(config.page, config.mode);
  boardContainer.appendChild(pageBoard.createTrainBoard());
}

// Main page initialization
init();
highlightMenuItem(sidebarItems[0]);

// Navigation to main page on logo click
logo.addEventListener('click', () => {
  if (config.page === 'Main Page') return;

  const mainPageLinkElement = document.getElementById('main-page');

  startGameButton.classList.add('hidden');
  newCardsBoard('Main Page');
  highlightMenuItem(mainPageLinkElement);
  config.page = 'Main Page';
});

// Pop-up and hide events on sidebar menu
addSidebar.addEventListener('click', () => {
  sidebar.classList.add('active');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Page navigation from sidebar
sidebar.addEventListener('click', (event) => {
  const menuItem = event.target;
  const menuItemValue = menuItem.innerText;

  if (event.target.tagName !== 'A') return;
  if (menuItemValue === 'Main Page') startGameButton.classList.add('hidden');
  if (menuItemValue !== 'Main Page' && config.mode === 'play') startGameButton.classList.remove('hidden');

  newCardsBoard(menuItemValue);
  highlightMenuItem(menuItem);
  sidebar.classList.remove('active');
});

// Page navigation from main page board.
// Sound reproduction on card click.
// Return card to front side.
boardContainer.addEventListener('click', (event) => {
  const sectionCard = event.target.closest('a');
  const cardFront = event.target.closest('.card-front');
  // let startGameButton;

  if (config.page !== 'Main Page') {
    if (config.mode === 'train') {
      const iconFlipCard = event.target.closest('span');

      if (!cardFront || !sectionCard.dataset.audioSrc) return;
      if (!iconFlipCard) {
        const audioLink = sectionCard.dataset.audioSrc;
        const sound = new Audio(audioLink);

        sound.play();
      } else {
        const cardToFlip = event.target.closest('.flip-card-inner');
        const cardBackSide = event.target.closest('.flip-card');
        if (!cardToFlip) return;
        cardToFlip.classList.add('flip-to-back');
        cardBackSide.addEventListener('mouseleave', () => {
          cardToFlip.classList.remove('flip-to-back');
        });
      }
    }
  } else {
    if (!sectionCard || !boardContainer.contains(sectionCard)) return;

    const cardValue = sectionCard.querySelector('.card-text').innerText;

    newCardsBoard(cardValue);
    sidebarItems.forEach((val) => val.classList.remove('active'));
    sidebarItems.forEach((val) => {
      if (val.innerText === cardValue) val.classList.add('active');
    });
    if (config.mode === 'play') {
      startGameButton.classList.remove('hidden');
    }
  }
});

// Mouseover, mouseout events on cards
boardContainer.addEventListener('mouseover', (event) => {
  const enteredCard = (config.page === 'Main Page')
    ? event.target.closest('a')
    : event.target.closest('.flip-card-inner') || event.target.closest('.card-play');

  if (!enteredCard || !boardContainer.contains(enteredCard)) return;

  enteredCard.classList.add('over-event');
});

boardContainer.addEventListener('mouseout', (event) => {
  const exitCard = (config.page === 'Main Page')
    ? event.target.closest('a')
    : event.target.closest('.flip-card-inner') || event.target.closest('.card-play');

  if (!exitCard || !boardContainer.contains(exitCard)) return;

  exitCard.classList.remove('over-event');
});

// const startGameButton = document.querySelector('.start-button');
// console.log('addEventListener');
// startGameButton.addEventListener('click', () => {
//   console.log('clicked');
//   config.game = 'on';
//   startGameButton.classList.remove('btn-lg');
//   startGameButton.classList.add('round-button');
//   startGameButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
// });


// Animation event on toggle switch
toggleSwitch.addEventListener('click', (event) => {
  const toggle = event.target;

  toggle.classList.toggle('toggle-on');
  toggle.classList.toggle('toggle-off');
  sidebar.classList.toggle('bg-info');
  sidebar.classList.toggle('bg-primary');
  addSidebar.classList.toggle('text-info');
  addSidebar.classList.toggle('text-primary');

  if ([...toggle.classList].includes('toggle-off')) {
    toggle.classList.add('toggle-moving');
    config.mode = 'play';
    newCardsBoard(config.page);

    if (config.page !== 'Main Page') startGameButton.classList.remove('hidden');
    // const startGameButton = document.querySelector('.start-button');

    // startGameButton.addEventListener('click', () => {
    //   console.log('clicked');
    //   config.game = 'on';
    //   startGameButton.classList.remove('btn-lg');
    //   startGameButton.classList.add('round-button');
    //   startGameButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
    // });
  } else {
    toggle.classList.remove('toggle-moving');
    config.mode = 'train';
    startGameButton.classList.add('hidden');
    newCardsBoard(config.page);
  }
});

// Event on start game button.
startGameButton.addEventListener('click', () => {
  console.log('clicked');
  config.game = 'on';
  startGameButton.classList.remove('btn-lg');
  startGameButton.classList.add('round-button');
  startGameButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
});
