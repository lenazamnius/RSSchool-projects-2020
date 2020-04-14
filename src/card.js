// import CardsList from './cards-list';

class Card {
  constructor(state, image, text, audio) {
    this.state = state;
    this.image = image;
    this.text = text;
    this.audio = audio;
  }

  createCard() {
    const cardBody = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardName = document.createElement('div');
    const cardNameText = document.createElement('p');
    const reverseIcon = document.createElement('span');

    cardBody.setAttribute('href', '#cards');
    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('srcset', this.image);
    cardImage.setAttribute('alt', `image of ${this.text}`);
    cardName.classList.add('card-body');
    cardNameText.classList.add('card-text');
    cardName.appendChild(cardNameText);
    cardNameText.innerHTML = this.text;
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardName);

    if (this.state === 'Main Page') {
      cardBody.classList.add('card', 'bg-info', 'p-2', 'm-4');
    } else {
      cardBody.classList.add('card', 'bg-secondary', 'm-4');
      cardBody.setAttribute('data-audio-src', `${this.audio}`);
      cardName.classList.add('d-flex', 'justify-content-center');
      cardNameText.classList.add('ml-auto', 'mb-0');
      cardName.appendChild(reverseIcon);
      reverseIcon.classList.add('reverse-icon', 'ml-auto');
      reverseIcon.innerHTML = '<i class="fas fa-paw"></i>';
    }

    return cardBody;
  }
}

export default Card;
