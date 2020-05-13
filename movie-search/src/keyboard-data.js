const keys = [
  {
    type: 'symbol', code: 'Backquote', boardValue: '&#96;', boardValueRu: 'ё', boardValueShift: '~',
  },
  {
    type: 'symbol', code: 'Digit1', boardValue: '1', boardValueShift: '!',
  },
  {
    type: 'symbol', code: 'Digit2', boardValue: '2', boardValueShift: '@',
  },
  {
    type: 'symbol', code: 'Digit3', boardValue: '3', boardValueShift: '#',
  },
  {
    type: 'symbol', code: 'Digit4', boardValue: '4', boardValueShift: '$',
  },
  {
    type: 'symbol', code: 'Digit5', boardValue: '5', boardValueShift: '%',
  },
  {
    type: 'symbol', code: 'Digit6', boardValue: '6', boardValueShift: '^',
  },
  {
    type: 'symbol', code: 'Digit7', boardValue: '7', boardValueShift: '&',
  },
  {
    type: 'symbol', code: 'Digit8', boardValue: '8', boardValueShift: '*',
  },
  {
    type: 'symbol', code: 'Digit9', boardValue: '9', boardValueShift: '(',
  },
  {
    type: 'symbol', code: 'Digit0', boardValue: '0', boardValueShift: ')',
  },
  {
    type: 'symbol', code: 'Minus', boardValue: '&#45;', boardValueShift: '_',
  },
  {
    type: 'symbol', code: 'Equal', boardValue: '&#61;', boardValueShift: '+',
  },
  {
    type: 'action', code: 'Backspace', boardValue: 'backspace',
  },
  {
    type: 'symbol', code: 'Tab', boardValue: 'tab',
  },
  {
    type: 'symbol', code: 'KeyQ', boardValue: 'q', boardValueRu: 'й',
  },
  {
    type: 'symbol', code: 'KeyW', boardValue: 'w', boardValueRu: 'ц',
  },
  {
    type: 'symbol', code: 'KeyE', boardValue: 'e', boardValueRu: 'у',
  },
  {
    type: 'symbol', code: 'KeyR', boardValue: 'r', boardValueRu: 'к',
  },
  {
    type: 'symbol', code: 'KeyT', boardValue: 't', boardValueRu: 'е',
  },
  {
    type: 'symbol', code: 'KeyY', boardValue: 'y', boardValueRu: 'н',
  },
  {
    type: 'symbol', code: 'KeyU', boardValue: 'u', boardValueRu: 'г',
  },
  {
    type: 'symbol', code: 'KeyI', boardValue: 'i', boardValueRu: 'ш',
  },
  {
    type: 'symbol', code: 'KeyO', boardValue: 'o', boardValueRu: 'щ',
  },
  {
    type: 'symbol', code: 'KeyP', boardValue: 'p', boardValueRu: 'з',
  },
  {
    type: 'symbol', code: 'BracketLeft', boardValue: '&#91', boardValueRu: 'х', boardValueShift: '{',
  },
  {
    type: 'symbol', code: 'BracketRight', boardValue: '&#93', boardValueRu: 'ъ', boardValueShift: '}',
  },
  {
    type: 'symbol', code: 'Backslash', boardValue: '&#92', boardValueShift: '|',
  },
  {
    type: 'action', code: 'Delete', boardValue: 'del',
  },
  {
    type: 'action', code: 'CapsLock', boardValue: 'caps lock',
  },
  {
    type: 'symbol', code: 'KeyA', boardValue: 'a', boardValueRu: 'ф',
  },
  {
    type: 'symbol', code: 'KeyS', boardValue: 's', boardValueRu: 'ы',
  },
  {
    type: 'symbol', code: 'KeyD', boardValue: 'd', boardValueRu: 'в',
  },
  {
    type: 'symbol', code: 'KeyF', boardValue: 'f', boardValueRu: 'а',
  },
  {
    type: 'symbol', code: 'KeyG', boardValue: 'g', boardValueRu: 'п',
  },
  {
    type: 'symbol', code: 'KeyH', boardValue: 'h', boardValueRu: 'р',
  },
  {
    type: 'symbol', code: 'KeyJ', boardValue: 'j', boardValueRu: 'о',
  },
  {
    type: 'symbol', code: 'KeyK', boardValue: 'k', boardValueRu: 'л',
  },
  {
    type: 'symbol', code: 'KeyL', boardValue: 'l', boardValueRu: 'д',
  },
  {
    type: 'symbol', code: 'Semicolon', boardValue: '&#59;', boardValueRu: 'ж', boardValueShift: ':',
  },
  {
    type: 'symbol', code: 'Quote', boardValue: '&#39;', boardValueRu: 'э', boardValueShift: '"',
  },
  {
    type: 'action', code: 'Enter', boardValue: 'enter',
  },
  {
    type: 'action', code: 'ShiftLeft', boardValue: 'shift',
  },
  {
    type: 'symbol', code: 'KeyZ', boardValue: 'z', boardValueRu: 'я',
  },
  {
    type: 'symbol', code: 'KeyX', boardValue: 'x', boardValueRu: 'ч',
  },
  {
    type: 'symbol', code: 'KeyC', boardValue: 'c', boardValueRu: 'с',
  },
  {
    type: 'symbol', code: 'KeyV', boardValue: 'v', boardValueRu: 'м',
  },
  {
    type: 'symbol', code: 'KeyB', boardValue: 'b', boardValueRu: 'и',
  },
  {
    type: 'symbol', code: 'KeyN', boardValue: 'n', boardValueRu: 'т',
  },
  {
    type: 'symbol', code: 'KeyM', boardValue: 'm', boardValueRu: 'ь',
  },
  {
    type: 'symbol', code: 'Comma', boardValue: '&#44;', boardValueRu: 'б', boardValueShift: '<',
  },
  {
    type: 'symbol', code: 'Period', boardValue: '&#46;', boardValueRu: 'ю', boardValueShift: '>',
  },
  {
    type: 'symbol', code: 'Slash', boardValue: '&#47;', boardValueRu: '.', boardValueShift: '?',
  },
  {
    type: 'symbol', code: 'ArrowUp', boardValue: '&#8593;',
  },
  {
    type: 'action', code: 'ShiftRight', boardValue: 'shift',
  },
  {
    type: 'action', code: 'ControlLeft', boardValue: 'ctrl',
  },
  {
    type: 'action', code: 'Lang', boardValue: 'lang',
  },
  {
    type: 'action', code: 'AltLeft', boardValue: 'alt',
  },
  {
    type: 'symbol', code: 'Space', boardValue: '&nbsp;',
  },
  {
    type: 'action', code: 'AltRight', boardValue: 'alt',
  },
  {
    type: 'symbol', code: 'ArrowLeft', boardValue: '&#8592;',
  },
  {
    type: 'symbol', code: 'ArrowDown', boardValue: '&#8595;',
  },
  {
    type: 'symbol', code: 'ArrowRight', boardValue: '&#8594;',
  },
  {
    type: 'action', code: 'ControlRight', boardValue: 'ctrl',
  },
];

const arrNoShiftSymbols = [];
const arrShiftSymbols = [];
const arrSymbolsRu = [];
const arrSymbolsEn = [];

for (let i = 0; i < keys.length; i += 1) {
  if (keys[i].boardValueShift) arrNoShiftSymbols.push(keys[i].boardValue);
}

for (let i = 0; i < keys.length; i += 1) {
  if (keys[i].boardValueShift) arrShiftSymbols.push(keys[i].boardValueShift);
}

for (let i = 0; i < keys.length; i += 1) {
  if (keys[i].boardValueRu) arrSymbolsRu.push(keys[i].boardValueRu);
}

for (let i = 0; i < keys.length; i += 1) {
  if (keys[i].boardValueRu) arrSymbolsEn.push(keys[i].boardValue);
}

export {
  keys, arrShiftSymbols, arrNoShiftSymbols, arrSymbolsRu, arrSymbolsEn,
};
