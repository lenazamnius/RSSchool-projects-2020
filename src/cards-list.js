import { cards, sections } from './cards-object';
import Card from './card';

function createBoardHtmlElement(state, mode) {
  const boardElementsObject = {};
  const boardWrapper = document.createElement('div');
  const resultBoard = document.createElement('div');
  const cardListWrapper = document.createElement('div');
  const buttonContainer = document.createElement('div');
  const button = document.createElement('button');

  if (mode === 'train' || (mode === 'play' && state === 'Main Page')) {
    boardWrapper.classList.add('d-flex', 'flex-wrap', 'justify-content-center');
  } else {
    button.classList.add('button', 'btn-lg', 'btn-primary', 'mt-3', 'mb-5');
    button.setAttribute('type', 'button');
    button.innerHTML = 'Start Game <i class="fas fa-play"></i>';
    buttonContainer.classList.add('game-button', 'd-flex', 'justify-content-center');
    cardListWrapper.classList.add('d-flex', 'flex-wrap', 'justify-content-center');
    resultBoard.classList.add('d-flex', 'flex-row-reverse', 'ml-5', 'mr-5');
    resultBoard.innerHTML = '<i class="fas fa-sun"></i>';
    buttonContainer.appendChild(button);
  }

  // if (state === 'Main Page') {
  //   boardWrapper.classList.add('main-board');
  // } else {
  //   boardWrapper.classList.add('section-board');
  // }

  boardElementsObject.boardWrapper = boardWrapper;
  boardElementsObject.resultBoard = resultBoard;
  boardElementsObject.cardListWrapper = cardListWrapper;
  boardElementsObject.buttonContainer = buttonContainer;

  return boardElementsObject;
}
class CardsList {
  constructor(state, mode) {
    this.state = state;
    this.mode = mode;
    this.cardsList = [];
  }

  createTrainBoard() {
    let board;

    if (this.cardsList) this.cardsList = [];

    if (this.state === 'Main Page') {
      board = createBoardHtmlElement(this.state, this.mode).boardWrapper;
      // if ([...board.classList].includes('section-board')) board.classList.toggle('section-board');
      sections.forEach((val, index) => {
        const newCard = new Card(cards[index][0].image, val);

        this.cardsList.push(newCard);
        board.appendChild(newCard.createCard());
      });
    } else {
      const sectionIdx = sections.indexOf(this.state);
      const section = cards[sectionIdx];

      if (this.mode === 'train') {
        board = createBoardHtmlElement(this.state, this.mode).boardWrapper;
        // if ([...board.classList].includes('main-board')) board.classList.toggle('main-board');
        section.forEach((val) => {
          const newCard = new Card(val.image, val.word, val.audioSrc, val.translation);

          this.cardsList.push(newCard);
          board.appendChild(newCard.createFlipCard());
        });
      } else {
        const boardElements = createBoardHtmlElement(this.state, this.mode);
        board = boardElements.boardWrapper;
        // if ([...board.classList].includes('main-board')) board.classList.toggle('main-board');
        section.forEach((val) => {
          const newCard = new Card(val.image, val.word, val.audioSrc, val.translation);

          this.cardsList.push(newCard);
          boardElements.cardListWrapper.appendChild(newCard.createPlayCard());
        });
        board.appendChild(boardElements.resultBoard);
        board.appendChild(boardElements.cardListWrapper);
        board.appendChild(boardElements.buttonContainer);
      }
    }

    return board;
  }
}

export default CardsList;
