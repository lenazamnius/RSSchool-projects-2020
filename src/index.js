import './styles/main.scss';
import CardsList from './cards-list';
// import { cards, sections } from './cards-object';
// import Card from './card';

const config = {
  page: 'Main Page',
};

const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('toggle-sidebar');
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


function createCardBoard(cardVal) {
  config.page = cardVal;

  while (boardContainer.firstChild) boardContainer.removeChild(boardContainer.firstChild);

  pageBoard = new CardsList(config.page);
  boardContainer.appendChild(pageBoard.createCardsBoard());
}

boardContainer.appendChild(pageBoard.createCardsBoard());
// ===============================================================            Dropdown Sidebar Menu
addSidebar.addEventListener('click', () => {
  sidebar.classList.add('active');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// ===============================================================        change pages from sidebar
sidebar.addEventListener('click', (event) => {
  const menuItem = event.target;
  const menuItemValue = menuItem.innerText;

  if (event.target.tagName !== 'A') return;

  createCardBoard(menuItemValue);
  highlightMenuItem(menuItem);
  sidebar.classList.remove('active');
});

// ===============================================================      change pages from page board
boardContainer.addEventListener('click', (event) => {
  if (!(config.page === 'Main Page')) return;

  const sectionCard = event.target.closest('a');
  const cardValue = sectionCard.querySelector('.card-text').innerText;

  if (!sectionCard) return;
  if (!boardContainer.contains(sectionCard)) return;

  createCardBoard(cardValue);
  sidebarItems.forEach((val) => val.classList.remove('active'));
  sidebarItems.forEach((val) => {
    if (val.innerText === cardValue) val.classList.add('active');
  });
});
