import './styles/main.scss';
import CardsList from './cards-list';
// import { cards, sections } from './cards-object';
// import Card from './card';

const config = {
  page: 'Main Page',
};

const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('burger');
const sidebar = document.getElementById('sidebar-menu');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const boardContainer = document.getElementById('board-container');
let pageBoard = new CardsList(config.page);
let selectedSidebarItem;

function highlightMenuItem(menuItem) {
  sidebarItems.forEach((val) => val.classList.remove('active'));
  selectedSidebarItem = menuItem;
  selectedSidebarItem.classList.add('active');
}


function newCardsBoard(cardVal) {
  config.page = cardVal;

  while (boardContainer.firstChild) boardContainer.removeChild(boardContainer.firstChild);

  pageBoard = new CardsList(config.page);
  boardContainer.appendChild(pageBoard.createCardsBoard());
}

boardContainer.appendChild(pageBoard.createCardsBoard());

// ============================================================      add, remove sidebar menu events
addSidebar.addEventListener('click', () => {
  sidebar.classList.add('active');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// =============================================================        page navigation from sidebar
sidebar.addEventListener('click', (event) => {
  const menuItem = event.target;
  const menuItemValue = menuItem.innerText;

  if (event.target.tagName !== 'A') return;

  newCardsBoard(menuItemValue);
  highlightMenuItem(menuItem);
  sidebar.classList.remove('active');
});

// ======================================================      page navigation from main page board
boardContainer.addEventListener('click', (event) => {
  const sectionCard = event.target.closest('a');

  if (config.page !== 'Main Page') {
    const reverseIcon = event.target.closest('span');

    if (!sectionCard || !sectionCard.dataset.audioSrc) return;
    if (!reverseIcon) {
      const audioLink = sectionCard.dataset.audioSrc;
      const sound = new Audio(audioLink);

      sound.play();
    } else {
      console.log('paw!');
    }
  } else {
    if (!sectionCard || !boardContainer.contains(sectionCard)) return;

    const cardValue = sectionCard.querySelector('.card-text').innerText;

    newCardsBoard(cardValue);
    sidebarItems.forEach((val) => val.classList.remove('active'));
    sidebarItems.forEach((val) => {
      if (val.innerText === cardValue) val.classList.add('active');
    });
  }
});

// ======================================================      mouseover event on main page cards
boardContainer.addEventListener('mouseover', (event) => {
  const sectionCard = event.target.closest('a');

  if (!sectionCard || !boardContainer.contains(sectionCard)) return;
  sectionCard.classList.add('over-event');
});

boardContainer.addEventListener('mouseout', (event) => {
  const sectionCard = event.target.closest('a');

  if (!sectionCard || !boardContainer.contains(sectionCard)) return;
  sectionCard.classList.remove('over-event');
});

// ======================================================      event on toggle switch
const toggleSwitch = document.getElementById('toggle');

toggleSwitch.addEventListener('click', (event) => {
  const toggle = event.target;

  toggle.classList.toggle('toggle-on');
  toggle.classList.toggle('toggle-off');
  if ([...toggle.classList].includes('toggle-off')) {
    toggle.classList.add('toggle-moving');
  } else {
    toggle.classList.remove('toggle-moving');
  }
});
