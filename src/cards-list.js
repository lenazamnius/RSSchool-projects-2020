import { cards, sections } from './cards-object';
import Card from './card';

class CardsList {
  constructor(state, mode) {
    this.state = state;
    this.mode = mode;
  }

  createCardsBoard() {
    const board = document.createElement('div');
    board.classList.add('d-flex', 'flex-wrap', 'justify-content-center');  

    if (this.state === 'Main Page') {
      board.classList.add('main-board');
      if ([...board.classList].includes('section-board')) board.classList.toggle('section-board');
      
      sections.forEach((val, index) => {
        const newCard = new Card(cards[index][0].image, val);

        board.appendChild(newCard.createCard());
      });
    } else {
      const sectionIdx = sections.indexOf(this.state);
      const section = cards[sectionIdx];
      
      board.classList.add('section-board');
      if ([...board.classList].includes('main-board')) board.classList.toggle('main-board');

      section.forEach((val) => {
        const newCard = new Card(val.image, val.word, val.audioSrc, val.translation);

        board.appendChild(newCard.createFlipCard());
      });
    }

    return board;
  }
}

export default CardsList;
