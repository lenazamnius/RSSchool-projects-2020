class Card {
  constructor(image, text, audio, translation) {
    this.image = image;
    this.text = text;
    this.audio = audio;
    this.translation = translation;
  }

  createCard(mode) {
    const cardElementsObject = this.createMainHtmlElements();
    const cardColor = (mode === 'train') ? 'bg-info' : 'bg-primary';

    // add classes, attributes and values to elements
    cardElementsObject.cardName.classList.add('card-body');
    cardElementsObject.cardNameText.classList.add('card-text');
    cardElementsObject.cardBody.classList.add('card', cardColor, 'p-2', 'm-4');

    // add child elements to parent card element
    cardElementsObject.cardName.appendChild(cardElementsObject.cardNameText);
    cardElementsObject.cardBody.appendChild(cardElementsObject.cardImage);
    cardElementsObject.cardBody.appendChild(cardElementsObject.cardName);

    return cardElementsObject.cardBody;
  }

  createFlipCard() {
    const cardElementsObject = this.createMainHtmlElements();
    const cardFlipOuter = document.createElement('div');
    const cardFlipInner = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    const cardImageBack = document.createElement('img');
    const cardNameBack = document.createElement('div');
    const cardNameTextBack = document.createElement('p');
    const reverseIcon = document.createElement('span');

    // add classes, attributes and values to elements
    cardElementsObject.cardBody.classList.add('m-4');
    cardElementsObject.cardBody.setAttribute('data-audio-src', `${this.audio}`);
    cardFlipOuter.classList.add('flip-card');
    cardFlipInner.classList.add('flip-card-inner');
    cardFront.classList.add('card-front', 'card', 'bg-secondary');
    cardBack.classList.add('card-back', 'card', 'bg-secondary');
    cardImageBack.classList.add('card-img-top');
    cardImageBack.setAttribute('srcset', this.image);
    cardImageBack.setAttribute('alt', `image of ${this.text}`);
    cardElementsObject.cardName.classList.add('card-body', 'd-flex', 'justify-content-center');
    cardNameBack.classList.add('card-body', 'd-flex', 'justify-content-center');
    cardElementsObject.cardNameText.classList.add('card-text', 'ml-auto', 'mb-0');
    cardNameTextBack.classList.add('card-text', 'mb-0');
    cardNameTextBack.innerHTML = this.translation;
    reverseIcon.classList.add('reverse-icon', 'ml-auto');
    reverseIcon.innerHTML = '<i class="fas fa-paw"></i>';

    // add child elements to parent card element
    cardElementsObject.cardName.appendChild(cardElementsObject.cardNameText);
    cardElementsObject.cardName.appendChild(reverseIcon);
    cardNameBack.appendChild(cardNameTextBack);
    cardFront.appendChild(cardElementsObject.cardImage);
    cardFront.appendChild(cardElementsObject.cardName);
    cardBack.appendChild(cardImageBack);
    cardBack.appendChild(cardNameBack);
    cardFlipInner.appendChild(cardFront);
    cardFlipInner.appendChild(cardBack);
    cardFlipOuter.appendChild(cardFlipInner);
    cardElementsObject.cardBody.appendChild(cardFlipOuter);

    return cardElementsObject.cardBody;
  }

  createPlayCard() {
    const cardElementsObject = this.createMainHtmlElements();

    // add classes, attributes and values to elements
    cardElementsObject.cardBody.style.backgroundImage = `url(${this.image})`;
    cardElementsObject.cardBody.classList.add('card', 'card-play', 'bg-secondary', 'm-4', 'set-as-background');
    cardElementsObject.cardBody.setAttribute('id', this.text);

    return cardElementsObject.cardBody;
  }

  createMainHtmlElements() {
    const cardElementsObject = {};
    const cardBody = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardName = document.createElement('div');
    const cardNameText = document.createElement('p');

    // add classes, attributes and values to elements
    cardBody.setAttribute('href', '#cards');
    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('srcset', this.image);
    cardImage.setAttribute('alt', `image of ${this.text}`);
    cardNameText.innerHTML = this.text;

    // add child elements to parent card element
    cardElementsObject.cardBody = cardBody;
    cardElementsObject.cardImage = cardImage;
    cardElementsObject.cardName = cardName;
    cardElementsObject.cardNameText = cardNameText;

    return cardElementsObject;
  }
}

export default Card;
