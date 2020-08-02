import {
  keys,
  arrShiftSymbols,
  arrNoShiftSymbols,
  arrSymbolsRu,
  arrSymbolsEn,
} from './keyboard-data';

const input = document.getElementById('input');
const store = {
  language: 'en',
  capsLock: false,
};

function createKey(value, code, type, valueRu, valueShift) {
  const key = document.createElement('div');

  key.setAttribute('id', `${code}`);
  key.setAttribute('data-type', `${type}`);

  if (valueRu) key.setAttribute('data-ru', `${valueRu}`);
  if (valueShift) key.setAttribute('data-shift', `${valueShift}`);
  if (store.language === 'en') {
    key.innerHTML = value;
  } else if (store.language === 'ru') {
    key.innerHTML = key.dataset.ru ? valueRu : value;
  }

  switch (value) {
    case 'tab' || 'del' || 'ctrl' || 'lang' || 'alt':
      key.classList.add('special', 'key-item');
      break;
    case 'backspace':
    case 'caps lock':
    case 'shift':
    case 'enter':
      key.classList.add('double', 'special', 'key-item');
      break;
    case '&nbsp;':
      key.classList.add('space', 'key-item');
      break;
    default:
      key.classList.add('key-item');
  }

  return key;
}

function createBoard() {
  const body = document.querySelector('body');
  const boardWrapper = document.createElement('div');
  const boardContainer = document.createElement('div');
  const text = document.createElement('div');
  let keyCode;
  let keyType;
  let boardVal;
  let boardValRu;
  let boardValShift;

  body.appendChild(boardWrapper);
  boardWrapper.classList.add('keyboard-wrapper');
  boardWrapper.appendChild(boardContainer);
  boardContainer.classList.add('keyboard-container');
  boardWrapper.appendChild(text);
  text.classList.add('footnote');
  text.innerText = 'Change language with combination "ctrl + alt" or special key "lang"\n Press keyboard icon to remove keyboard';

  for (let i = 0; i < keys.length; i += 1) {
    keyCode = keys[i].code;
    keyType = keys[i].type;
    boardVal = keys[i].boardValue;
    boardValRu = keys[i].boardValueRu || !!keys[i].boardValueRu;
    boardValShift = !!keys[i].boardValueShift;
    boardContainer.appendChild(createKey(boardVal, keyCode, keyType, boardValRu, boardValShift));
  }
}

function setAnimation(pressedKey, pressedKeyId) {
  if (pressedKeyId === 'CapsLock') {
    pressedKey.classList.add('on-press');
  } else {
    pressedKey.classList.add('active', 'on-press');
  }
}

function toggleCase(arr, letterCase) {
  arr.forEach((val) => {
    const keyId = val.getAttribute('id');

    if (store.language === 'en' && (keyId.startsWith('Key') || keyId.startsWith('Backquote'))) {
      if (letterCase === 'up') val.classList.add('uppercase');
      if (letterCase === 'down') val.classList.remove('uppercase');
    } else if (store.language === 'ru' && val.dataset.ru) {
      if (letterCase === 'up') val.classList.add('uppercase');
      if (letterCase === 'down') val.classList.remove('uppercase');
    }
  });
}

function capsLock(keysSymbol, pressedKey) {
  if (!store.capsLock) {
    pressedKey.classList.add('pressed');
    toggleCase(keysSymbol, 'up');
    store.capsLock = true;
  } else {
    pressedKey.classList.remove('pressed');
    toggleCase(keysSymbol, 'down');
    store.capsLock = false;
  }
}

function shift(keysSymbol, arrSymbols, capsY, capsN) {
  let symbolsShift = [...document.querySelectorAll('[data-shift=true]')];
  let arrSymb = arrSymbols;

  if (store.language === 'ru') {
    symbolsShift = symbolsShift.slice(1).filter((val) => !val.dataset.ru);
    arrSymb = arrSymbols.slice(1);
  }

  for (let i = 0; i < symbolsShift.length; i += 1) {
    symbolsShift[i].innerHTML = arrSymb[i];
  }

  if (!store.capsLock) {
    toggleCase(keysSymbol, capsY);
  } else {
    toggleCase(keysSymbol, capsN);
  }
}

function toggleLang() {
  const keysLangSymbol = document.querySelectorAll('[data-ru]');
  const curLang = store.language === 'en' ? 'ru' : 'en';

  for (let i = 0; i < keysLangSymbol.length; i += 1) {
    if (curLang === 'ru') {
      keysLangSymbol[i].innerHTML = arrSymbolsRu[i];
    } else {
      keysLangSymbol[i].innerHTML = arrSymbolsEn[i];
    }
  }

  store.language = curLang;
}

function keyDownEvent(event) {
  const pressedKey = document.querySelector(`#${event.code}`);

  if (!pressedKey) return;

  const pressedKeyId = pressedKey.getAttribute('id');
  const pressedKeyVal = pressedKey.innerText;
  const keysSymbol = document.querySelectorAll('[data-type=symbol]');

  event.preventDefault();
  setAnimation(pressedKey, pressedKeyId);
  if (pressedKey.dataset.type === 'symbol') {
    if (pressedKeyId === 'Tab') {
      input.value += '    ';
    } else {
      input.value += pressedKeyVal;
    }
  } else if (pressedKey.dataset.type === 'action') {
    if (pressedKeyId === 'Backspace') {
      const inputText = input.value;
      input.value = inputText.slice(0, -1);
    }
    if (pressedKeyId === 'CapsLock') capsLock(keysSymbol, pressedKey);
    if (pressedKeyId.startsWith('Shift')) shift(keysSymbol, arrShiftSymbols, 'up', 'down');
    if (event.ctrlKey && event.altKey) toggleLang();
  }
}

function keyUpEvent(event) {
  const pressedKey = document.querySelector(`#${event.code}`);

  if (!pressedKey) return;

  const pressedKeyId = pressedKey.getAttribute('id');
  const keysSymbol = document.querySelectorAll('[data-type=symbol]');

  event.preventDefault();
  pressedKey.classList.remove('active', 'on-press');
  if (pressedKeyId.startsWith('Shift')) shift(keysSymbol, arrNoShiftSymbols, 'down', 'up');
}

function eventsOnMousedown(event) {
  const pressedKey = event.target;
  const pressedKeyVal = pressedKey.innerText;
  const pressedKeyId = pressedKey.getAttribute('id');
  const keysSymbol = document.querySelectorAll('[data-type=symbol]');

  setAnimation(pressedKey, pressedKeyId);

  if (![...event.target.classList].includes('key-item')) return;
  if (pressedKey.dataset.type === 'symbol') {
    if (pressedKey.getAttribute('id') === 'Tab') {
      input.value += '    ';
    } else {
      input.value += pressedKeyVal;
    }
  } else if (pressedKey.dataset.type === 'action') {
    if (pressedKey.getAttribute('id') === 'Backspace') {
      const inputText = input.value;
      input.value = inputText.slice(0, -1);
    }
    if (pressedKey.getAttribute('id') === 'Lang') toggleLang();
    if (pressedKey.getAttribute('id') === 'CapsLock') capsLock(keysSymbol, pressedKey);
    if (pressedKey.getAttribute('id').startsWith('Shift')) shift(keysSymbol, arrShiftSymbols, 'up', 'down');
  }
}

function eventsOnMouseup(event) {
  const pressedKey = event.target;
  const keysSymbol = document.querySelectorAll('[data-type=symbol]');

  event.target.classList.remove('active', 'on-press');

  if (![...event.target.classList].includes('key-item')) return;
  if (pressedKey.getAttribute('id').startsWith('Shift')) shift(keysSymbol, arrNoShiftSymbols, 'down', 'up');
}

export {
  createBoard,
  keyDownEvent,
  keyUpEvent,
  eventsOnMousedown,
  eventsOnMouseup,
};
