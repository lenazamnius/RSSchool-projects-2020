import cards from './cards-object';
import './styles/main.scss';

const removeSidebar = document.getElementById('cross');
const addSidebar = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar-menu');

addSidebar.addEventListener('click', () => {
  sidebar.classList.add('active');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});