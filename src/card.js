// import CardsList from './cards-list';

class Card {
  constructor(state, image, text) {
    this.state = state;
    this.image = image;
    this.text = text;
  }

  createCard() {
    const cardBody = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardName = document.createElement('div');
    const cardNameText = document.createElement('p');
    const reverseIcon = document.createElement('span');

    if (this.state === '') {
      cardBody.classList.add('card', 'bg-info', 'text-white', 'p-2', 'm-4');
      cardBody.setAttribute('href', '#');
      cardName.classList.add('card-body');
      cardNameText.classList.add('card-text');
    } else {
      cardBody.classList.add('card', 'bg-secondary', 'text-white', 'm-4');
      cardBody.setAttribute('href', '#cards');
      cardName.classList.add('card-body', 'd-flex', 'justify-content-center');
      cardNameText.classList.add('card-text', 'ml-auto');
      reverseIcon.classList.add('reverse', 'ml-auto');
    }

    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('srcset', this.image);
    cardImage.setAttribute('alt', 'test image');
    cardNameText.innerHTML = this.text;
    cardName.appendChild(cardNameText);
    cardName.appendChild(reverseIcon);
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardName);

    return cardBody;
  }
}

export default Card;
