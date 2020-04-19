import { cards, sections } from './cards-object';
import Card from './card';

function createBoardHtmlElement(state, mode) {
  const boardElementsObject = {};
  const boardWrapper = document.createElement('div');
  const pointsBoard = document.createElement('div');
  const cardListWrapper = document.createElement('div');
  const correctAnswer = '<span class="pl-1 pr-3 count-correct">0</span>';
  const wrongAnswer = '<span class="pl-1 pr-2 count-wrong">0</span>';

  if (mode === 'train' || (mode === 'play' && state === 'Main Page')) {
    boardWrapper.classList.add('d-flex', 'flex-wrap', 'justify-content-center');
  } else {
    boardWrapper.classList.add('play-board');
    cardListWrapper.classList.add('d-flex', 'flex-wrap', 'justify-content-center');
    pointsBoard.classList.add('points-board', 'd-flex', 'align-items-center', 'justify-content-center', 'ml-5', 'mr-5', 'text-danger');
    pointsBoard.innerHTML = `Score: <i class="fas fa-check text-success pl-3"></i> ${correctAnswer} <i class="fas fa-times text-danger"></i> ${wrongAnswer}`;
  }

  boardElementsObject.boardWrapper = boardWrapper;
  boardElementsObject.pointsBoard = pointsBoard;
  boardElementsObject.cardListWrapper = cardListWrapper;

  return boardElementsObject;
}
class CardsList {
  constructor(state, mode) {
    this.state = state;
    this.mode = mode;
  }

  createTrainBoard() {
    let board;

    if (this.state === 'Main Page') {
      board = createBoardHtmlElement(this.state, this.mode).boardWrapper;

      sections.forEach((val, index) => {
        const newCard = new Card(cards[index][3].image, val);

        board.appendChild(newCard.createCard(this.mode));
      });
    } else {
      const sectionIdx = sections.indexOf(this.state);
      const section = cards[sectionIdx];

      if (this.mode === 'train') {
        board = createBoardHtmlElement(this.state, this.mode).boardWrapper;

        section.forEach((val) => {
          const newCard = new Card(val.image, val.word, val.audioSrc, val.translation);

          board.appendChild(newCard.createFlipCard());
        });
      } else {
        const boardElements = createBoardHtmlElement(this.state, this.mode);

        board = boardElements.boardWrapper;

        section.forEach((val) => {
          const newCard = new Card(val.image, val.word, val.audioSrc, val.translation);


          boardElements.cardListWrapper.appendChild(newCard.createPlayCard());
        });
        board.appendChild(boardElements.pointsBoard);
        board.appendChild(boardElements.cardListWrapper);
      }
    }

    return board;
  }
}

export default CardsList;
