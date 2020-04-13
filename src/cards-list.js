import { cards, sections } from './cards-object';
import Card from './card';

class CardsList {
  constructor(state) {
    this.state = state;
  }

  createCardsBoard() {
    const board = document.createElement('div');
    board.classList.add('main-board', 'd-flex', 'flex-wrap', 'justify-content-center');

    if (this.state === 'Main Page') {
      board.classList.add('main-board');
      sections.forEach((val, index) => {
        const newCard = new Card(this.state, `${cards[index][0].image}`, val);

        board.appendChild(newCard.createCard());
      });
    } else {
      const sectionIdx = sections.indexOf(this.state);
      const section = cards[sectionIdx];

      board.classList.add('section-board');
      section.forEach((val) => {
        const newCard = new Card(this.state, `${val.image}`, val.word);

        board.appendChild(newCard.createCard());
      });
    }

    return board;
  }
}

export default CardsList;
