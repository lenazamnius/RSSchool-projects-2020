import './styles/main.scss';
import CardsList from './cards-list';
// import { cards, sections } from './cards-object';
// import Card from './card';

const config = {
  page: '',
};

const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar-menu');
const boardContainer = document.getElementById('board-container');
const pageBoard = new CardsList(config.page);

boardContainer.appendChild(pageBoard.createCardsBoard());

// ===============================================================            Dropdown Sidebar Menu
addSidebar.addEventListener('click', () => {
  sidebar.classList.add('active');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});
