class Card {
  constructor(image, text, audio, translation) {
    this.image = image;
    this.text = text;
    this.audio = audio;
    this.translation = translation;
  }

  createCard() {
    const cardBody = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardName = document.createElement('div');
    const cardNameText = document.createElement('p');
    const reverseIcon = document.createElement('span');

    // add classes, attributes and values to elements
    cardBody.setAttribute('href', '#cards');
    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('srcset', this.image);
    cardImage.setAttribute('alt', `image of ${this.text}`);
    cardName.classList.add('card-body');
    cardNameText.classList.add('card-text');
    cardNameText.innerHTML = this.text;
    cardBody.classList.add('card', 'bg-info', 'p-2', 'm-4');

    // add child elements to parent card element
    cardName.appendChild(cardNameText);
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardName);
    
    return cardBody;
  }

  createFlipCard() {
    const cardBody = document.createElement('a');
    const cardFlipOuter = document.createElement('div');
    const cardFlipInner = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardImageBack = document.createElement('img');
    const cardName = document.createElement('div');
    const cardNameBack = document.createElement('div');
    const cardNameText = document.createElement('p');
    const cardNameTextBack = document.createElement('p');
    const reverseIcon = document.createElement('span');
    
    // add classes, attributes and values to elements
    cardBody.classList.add('m-4');
    cardBody.setAttribute('href', '#cards');
    cardBody.setAttribute('data-audio-src', `${this.audio}`);
    cardFlipOuter.classList.add('flip-card');
    cardFlipInner.classList.add('flip-card-inner');
    cardFront.classList.add('card-front', 'card', 'bg-secondary');
    cardBack.classList.add('card-back', 'card', 'bg-secondary'); 
    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('srcset', this.image);
    cardImage.setAttribute('alt', `image of ${this.text}`);
    cardImageBack.classList.add('card-img-top');
    cardImageBack.setAttribute('srcset', this.image);
    cardImageBack.setAttribute('alt', `image of ${this.text}`);
    cardName.classList.add('card-body', 'd-flex', 'justify-content-center');
    cardNameBack.classList.add('card-body', 'd-flex', 'justify-content-center');
    cardNameText.classList.add('card-text', 'ml-auto', 'mb-0');
    cardNameTextBack.classList.add('card-text', 'mb-0');
    cardNameText.innerHTML = this.text;
    cardNameTextBack.innerHTML = this.translation;
    reverseIcon.classList.add('reverse-icon', 'ml-auto');
    reverseIcon.innerHTML = '<i class="fas fa-paw"></i>';
    
    // add child elements to parent card element 
    cardName.appendChild(cardNameText);
    cardName.appendChild(reverseIcon);
    cardNameBack.appendChild(cardNameTextBack);
    cardFront.appendChild(cardImage);
    cardFront.appendChild(cardName);
    cardBack.appendChild(cardImageBack);
    cardBack.appendChild(cardNameBack);
    cardFlipInner.appendChild(cardFront);
    cardFlipInner.appendChild(cardBack);
    cardFlipOuter.appendChild(cardFlipInner);
    cardBody.appendChild(cardFlipOuter);   

    return cardBody;
  }
}

export default Card;
