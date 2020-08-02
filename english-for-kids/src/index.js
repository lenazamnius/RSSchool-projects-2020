import './styles/main.scss';
import CardsList from './cards-list';
import { cards, sections } from './cards-object';

const appWrapper = document.querySelector('#app-wrapper');
const boardContainer = document.getElementById('board-container');
const sidebar = document.getElementById('sidebar-menu');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('burger');
const toggleSwitch = document.getElementById('toggle');
const logo = document.getElementById('logo-text');
const startGameButton = document.querySelector('.start-button');
const repeatSoundButton = document.querySelector('.repeat-button');
const resultBoard = document.getElementById('result-board');
const resultSignElement = document.querySelector('.result-text');
const resultImageElement = document.querySelector('.result-image');
const image = document.createElement('img');
const correctSound = new Audio('audio/correct.mp3');
const errorSound = new Audio('audio/error.mp3');
const winSound = new Audio('audio/success.mp3');
const failureSound = new Audio('audio/failure.mp3');

const config = {
  page: '',
  mode: '',
  game: '',
};
const soundsValuesArr = [];
let audioArr = [];
let selectedSidebarItem;
let pageBoard;
let cardId;
let currentSound;
let resultSign;
let finishSound;

function init() {
  config.page = 'Main Page';
  config.mode = 'train';
  config.game = 'off';
  pageBoard = new CardsList(config.page, config.mode);
  boardContainer.appendChild(pageBoard.createCardsBoard());
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
  boardContainer.appendChild(pageBoard.createCardsBoard());
}

function randomizeArray(a) {
  const temp = a;

  for (let i = temp.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = temp[i];
    temp[i] = temp[j];
    temp[j] = x;
  }

  return temp;
}

function actionOnCardClick(iconFlipCard, card, evt) {
  if (!iconFlipCard) {
    const audioLink = card.dataset.audioSrc;
    const sound = new Audio(audioLink);

    sound.play();
  } else {
    const cardToFlip = evt.target.closest('.flip-card-inner');
    const cardBackSide = evt.target.closest('.flip-card');

    if (!cardToFlip) return;

    cardToFlip.classList.add('flip-to-back');
    cardBackSide.addEventListener('mouseleave', () => cardToFlip.classList.remove('flip-to-back'));
  }
}

function setGameEndImageAndSound(wrongScoreNum) {
  if (wrongScoreNum > 0) {
    finishSound = failureSound;
    image.setAttribute('srcset', 'images/failure.png');
  } else {
    finishSound = winSound;
    image.setAttribute('srcset', 'images/success.png');
  }
}

function resetMoveToMainPage(newImageElement, imageElement, board) {
  config.game = 'off';
  config.page = 'Main Page';
  setTimeout(() => {
    resultSignElement.innerHTML = '';
    imageElement.removeChild(newImageElement);
    board.classList.add('hidden');
    newCardsBoard(config.page);
  }, 2800);
}

function renderMainPage(card) {
  const cardValue = card.querySelector('.card-text').innerText;

  newCardsBoard(cardValue);
  sidebarItems.forEach((val) => val.classList.remove('active'));
  sidebarItems.forEach((val) => {
    if (val.innerText === cardValue) val.classList.add('active');
  });

  if (config.mode === 'play') startGameButton.classList.remove('hidden');
}

function showGameEndBoard(currentBoard, wrongScore) {
  currentBoard.classList.add('hidden');
  repeatSoundButton.classList.add('hidden');
  resultSign = `You've got ${wrongScore} errors!`;
  resultSignElement.innerHTML = resultSign;
  setGameEndImageAndSound(wrongScore);
  resultImageElement.appendChild(image);
  resultBoard.classList.remove('hidden');
}

// Main page initialization
init();
highlightMenuItem(sidebarItems[0]);

// Navigation to main page on logo click
logo.addEventListener('click', () => {
  if (config.page === 'Main Page') return;

  const mainPageLinkElement = document.getElementById('main-page');

  startGameButton.classList.add('hidden');
  repeatSoundButton.classList.add('hidden');
  newCardsBoard('Main Page');
  highlightMenuItem(mainPageLinkElement);
  config.page = 'Main Page';
});

// Pop-up and hide events on sidebar menu
appWrapper.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

addSidebar.addEventListener('click', (event) => {
  event.stopPropagation();
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
  if (menuItemValue === 'Main Page') {
    startGameButton.classList.add('hidden');
    repeatSoundButton.classList.add('hidden');
  }
  if (menuItemValue !== 'Main Page' && config.mode === 'play') {
    startGameButton.classList.remove('hidden');
    repeatSoundButton.classList.add('hidden');
    audioArr = [];
  }

  newCardsBoard(menuItemValue);
  highlightMenuItem(menuItem);
  sidebar.classList.remove('active');
});

// Page navigation from main page board.
// Sound reproduction on card click.
// Return card to front side.
// Game logic
boardContainer.addEventListener('click', (event) => {
  const sectionCard = event.target.closest('a');
  const cardFront = event.target.closest('.card-front');

  if (config.page !== 'Main Page') {
    if (config.mode === 'train') {
      const iconFlipCard = event.target.closest('span');

      if (!cardFront || !sectionCard.dataset.audioSrc) return;

      actionOnCardClick(iconFlipCard, sectionCard, event);
    }

    if (config.mode === 'play' && config.game === 'on') {
      const clickedCard = event.target.closest('.card-play');
      const wrongPointsElement = document.querySelector('.count-wrong');
      const correctPointsElement = document.querySelector('.count-correct');
      const playBoard = document.querySelector('.play-board');
      let wrongScore = Number(wrongPointsElement.innerHTML);
      let correctScore = Number(correctPointsElement.innerHTML);

      if (!clickedCard) return;

      cardId = clickedCard.getAttribute('id');
      audioArr.forEach((val) => soundsValuesArr.push(val.word));

      if (!soundsValuesArr.includes(cardId)) return;

      // Game logic
      if (cardId === audioArr[0].word) {
        clickedCard.style.opacity = '0.5';
        correctScore += 1;
        correctPointsElement.innerHTML = correctScore;
        audioArr.shift();
        correctSound.play();

        if (audioArr.length > 0) {
          currentSound = new Audio(audioArr[0].sound);
          setTimeout(() => { currentSound.play(); }, 600);
        } else {
          showGameEndBoard(playBoard, wrongScore);
          finishSound.play();
          resetMoveToMainPage(image, resultImageElement, resultBoard);
        }
      } else {
        wrongScore += 1;
        wrongPointsElement.innerHTML = wrongScore;
        errorSound.play();
      }
    }
  } else {
    if (!sectionCard || !boardContainer.contains(sectionCard)) return;

    renderMainPage(sectionCard);
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
  } else {
    audioArr = [];
    config.mode = 'train';
    toggle.classList.remove('toggle-moving');
    startGameButton.classList.add('hidden');
    repeatSoundButton.classList.add('hidden');
    newCardsBoard(config.page);
  }
});

// Event on start game button.
startGameButton.addEventListener('click', () => {
  config.game = 'on';
  startGameButton.classList.add('hidden');
  repeatSoundButton.classList.remove('hidden');

  // create array of sounds function
  const sectionIdx = sections.indexOf(config.page);

  cards[sectionIdx].forEach((val) => {
    const audioObj = {};

    audioObj.word = val.word;
    audioObj.sound = val.audioSrc;
    audioArr.push(audioObj);
  });

  randomizeArray(audioArr);
  // create array of sounds function END

  const firstSound = new Audio(audioArr[0].sound);
  setTimeout(() => { firstSound.play(); }, 1000);
});

repeatSoundButton.addEventListener('click', () => {
  const repeatSound = new Audio(audioArr[0].sound);
  repeatSound.play();
});
