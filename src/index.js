import './styles/main.scss';
import CardsList from './cards-list';
import { cards, sections } from './cards-object';

const appWrapper = document.querySelector('.app-wrapper');
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
const resultSingElement = document.querySelector('.result-text');
const resultImageElement = document.querySelector('.result-image');
const correctSound = new Audio('audio/correct.mp3');
const errorSound = new Audio('audio/error.mp3');
const winSound = new Audio('audio/success.mp3');
const failureSound = new Audio('audio/failure.mp3');

const config = {
  page: '',
  mode: '',
  game: '',
};
let audioArr = [];
let selectedSidebarItem;
let pageBoard;
let cardId;

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

function randomizeArray(array) {
  const swap = (arr, idx1, idx2) => {
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
  };

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
  return array;
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
boardContainer.addEventListener('click', (event) => {
  const sectionCard = event.target.closest('a');
  const cardFront = event.target.closest('.card-front');

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
    if (config.mode === 'play' && config.game === 'on') {
      const clickedCard = event.target.closest('.card-play');
      const wrongPointsElement = document.querySelector('.count-wrong');
      const correctPointsElement = document.querySelector('.count-correct');
      const playBoard = document.querySelector('.play-board');
      const image = document.createElement('img');
      let wrongScore = Number(wrongPointsElement.innerHTML);
      let correctScore = Number(correctPointsElement.innerHTML);
      let currentSound;
      let resultSign;
      let finishSound;

      if (!clickedCard) return;
      cardId = clickedCard.getAttribute('id');

      const soundsValuesArr = [];
      audioArr.forEach((val) => soundsValuesArr.push(val.word));
      if (!soundsValuesArr.includes(cardId)) return;

      // Game function
      if (cardId === audioArr[0].word) {
        audioArr.shift();
        correctScore += 1;
        correctPointsElement.innerHTML = correctScore;
        correctSound.play();
        clickedCard.style.opacity = '0.5';
        if (audioArr.length > 0) {
          currentSound = new Audio(audioArr[0].sound);
          setTimeout(() => { currentSound.play(); }, 600);
        } else {
          playBoard.classList.add('hidden');
          repeatSoundButton.classList.add('hidden');

          resultSign = `You've got ${wrongScore} errors!`;
          resultSingElement.innerHTML = resultSign;

          if (wrongScore > 0) {
            finishSound = failureSound;
            image.setAttribute('srcset', 'images/failure.png');
          } else {
            finishSound = winSound;
            image.setAttribute('srcset', 'images/success.png');
          }

          resultImageElement.appendChild(image);
          resultBoard.classList.remove('hidden');
          finishSound.play();
          // Reset page
          config.game = 'off';
          config.page = 'Main Page';
          setTimeout(() => {
            resultSingElement.innerHTML = '';
            resultImageElement.removeChild(image);
            resultBoard.classList.add('hidden');
            newCardsBoard(config.page);
          }, 2800);
        }
      } else {
        wrongScore += 1;
        wrongPointsElement.innerHTML = wrongScore;
        errorSound.play();
      }
      // game function END
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

    if (config.page !== 'Main Page') {
      // repeatSoundButton.classList.add('hidden');
      startGameButton.classList.remove('hidden');
    }
  } else {
    toggle.classList.remove('toggle-moving');
    config.mode = 'train';
    audioArr = [];
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
