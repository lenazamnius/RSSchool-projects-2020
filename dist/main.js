/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body {\\n  background-color: #f9fafb;\\n  font-family: 'Bellota', cursive; }\\n\\n.app-wrapper {\\n  position: relative; }\\n  .app-wrapper .sidebar-menu {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 20%;\\n    width: 300px;\\n    height: 100vh;\\n    margin-left: -300px;\\n    z-index: 10;\\n    padding: 40px 20px 0 50px;\\n    font-size: 1.5rem;\\n    transition: transform .45s ease-in; }\\n    .app-wrapper .sidebar-menu.active {\\n      transform: translateX(300px); }\\n    .app-wrapper .sidebar-menu .sidebar-item {\\n      margin-top: 15px;\\n      color: white;\\n      text-decoration: none; }\\n      .app-wrapper .sidebar-menu .sidebar-item:hover {\\n        color: rgba(233, 84, 32, 0.6); }\\n    .app-wrapper .sidebar-menu .sidebar-item:first-of-type {\\n      margin-bottom: 10px;\\n      margin-left: 40px; }\\n    .app-wrapper .sidebar-menu .sidebar-cross {\\n      text-align: right;\\n      padding-right: 40px; }\\n      .app-wrapper .sidebar-menu .sidebar-cross:hover {\\n        color: rgba(233, 84, 32, 0.6); }\\n    .app-wrapper .sidebar-menu .fa-paw {\\n      margin-right: 10px; }\\n\\n.header-container {\\n  justify-content: space-between;\\n  max-width: 1265px;\\n  height: 50px;\\n  margin: 0 auto;\\n  padding-top: 40px; }\\n  .header-container .toggle-icon {\\n    margin-right: 50px;\\n    font-size: 1.6rem;\\n    color: rgba(233, 84, 32, 0.6); }\\n  .header-container .logo {\\n    font-size: 1.6rem;\\n    text-decoration: none; }\\n\\n.board-container {\\n  max-width: 1400px;\\n  margin: 0 auto;\\n  padding-top: 70px; }\\n  .board-container .card {\\n    width: 300px;\\n    height: 275px;\\n    font-size: 1.4rem;\\n    text-align: center;\\n    text-decoration: none; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards-list */ \"./src/cards-list.js\");\n\n\nclass Card extends _cards_list__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(state, image, text) {\n    super(state);\n    this.image = image;\n    this.text = text;\n  }\n\n  createCard() {\n    const cardBody = document.createElement('a');\n    const cardImage = document.createElement('img');\n    const cardName = document.createElement('div');\n    const cardNameText = document.createElement('p');\n    const reverseIcon = document.createElement('span');\n\n    if (super.state === '') {\n      cardBody.classList.add('card', 'bg-info', 'text-white', 'p-2', 'm-4');\n      cardBody.setAttribute('href', '#');\n      cardName.classList.add('card-body');\n      cardNameText.classList.add('card-text');\n    } else {\n      cardBody.classList.add('card', 'bg-secondary', 'text-white', 'm-4');\n      cardBody.setAttribute('href', '#cards');\n      cardName.classList.add('card-body', 'd-flex', 'justify-content-center');\n      cardNameText.classList.add('card-text', 'ml-auto');\n      reverseIcon.classList.add('reverse', 'ml-auto');\n    }\n\n    cardImage.classList.add('card-img-top');\n    cardImage.setAttribute('srcset', this.image);\n    cardImage.setAttribute('alt', 'test image');\n    cardNameText.innerHTML = this.text;\n    cardName.appendChild(cardNameText);\n    cardName.appendChild(reverseIcon);\n    cardBody.appendChild(cardImage);\n    cardBody.appendChild(cardName);\n    return cardBody;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Card);\n\n//# sourceURL=webpack:///./src/card.js?");

/***/ }),

/***/ "./src/cards-list.js":
/*!***************************!*\
  !*** ./src/cards-list.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cards_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards-object */ \"./src/cards-object.js\");\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ \"./src/card.js\");\n\n\n\nclass CardsList {\n  constructor(state) {\n    this.state = state;\n  }\n\n  createCardsBoard() {\n    const board = document.createElement('div');\n    board.classList.add('main-board', 'd-flex', 'flex-wrap', 'justify-content-center');\n\n    if (this.state === '') {\n      board.classList.add('main-board');\n      _cards_object__WEBPACK_IMPORTED_MODULE_0__[\"sections\"].forEach((val, index) => {\n        // const newCard = new Card(`src/${cards[index][0].image}`, val);\n        const newCard = new _card__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.state, `src/${_cards_object__WEBPACK_IMPORTED_MODULE_0__[\"cards\"][index][0].image}`, val);\n        board.appendChild(newCard.createCard());\n      });\n    } else {\n      const sectionIdx = _cards_object__WEBPACK_IMPORTED_MODULE_0__[\"sections\"].indexOf(this.state);\n      const section = _cards_object__WEBPACK_IMPORTED_MODULE_0__[\"cards\"][sectionIdx];\n      board.classList.add('section-board');\n      section.forEach(val => {\n        const newCard = new _card__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.state, `src/${val.image}`, val.word);\n        board.appendChild(newCard.createCard());\n      });\n    }\n\n    return board;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CardsList);\n\n//# sourceURL=webpack:///./src/cards-list.js?");

/***/ }),

/***/ "./src/cards-object.js":
/*!*****************************!*\
  !*** ./src/cards-object.js ***!
  \*****************************/
/*! exports provided: cards, sections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cards\", function() { return cards; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sections\", function() { return sections; });\nconst cards = [[{\n  word: 'cry',\n  translation: 'плакать',\n  image: 'images/cry.jpg',\n  audioSrc: 'audio/cry.mp3'\n}, {\n  word: 'dance',\n  translation: 'танцевать',\n  image: 'images/dance.jpg',\n  audioSrc: 'audio/dance.mp3'\n}, {\n  word: 'dive',\n  translation: 'нырять',\n  image: 'images/dive.jpg',\n  audioSrc: 'audio/dive.mp3'\n}, {\n  word: 'draw',\n  translation: 'рисовать',\n  image: 'images/draw.jpg',\n  audioSrc: 'audio/draw.mp3'\n}, {\n  word: 'fish',\n  translation: 'ловить рыбу',\n  image: 'images/fish.jpg',\n  audioSrc: 'audio/fish.mp3'\n}, {\n  word: 'fly',\n  translation: 'летать',\n  image: 'images/fly.jpg',\n  audioSrc: 'audio/fly.mp3'\n}, {\n  word: 'hug',\n  translation: 'обнимать',\n  image: 'images/hug.jpg',\n  audioSrc: 'audio/hug.mp3'\n}, {\n  word: 'jump',\n  translation: 'прыгать',\n  image: 'images/jump.jpg',\n  audioSrc: 'audio/jump.mp3'\n}], [{\n  word: 'open',\n  translation: 'открывать',\n  image: 'images/open.jpg',\n  audioSrc: 'audio/open.mp3'\n}, {\n  word: 'play',\n  translation: 'играть',\n  image: 'images/play.jpg',\n  audioSrc: 'audio/play.mp3'\n}, {\n  word: 'point',\n  translation: 'указывать',\n  image: 'images/point.jpg',\n  audioSrc: 'audio/point.mp3'\n}, {\n  word: 'ride',\n  translation: 'ездить',\n  image: 'images/ride.jpg',\n  audioSrc: 'audio/ride.mp3'\n}, {\n  word: 'run',\n  translation: 'бегать',\n  image: 'images/run.jpg',\n  audioSrc: 'audio/run.mp3'\n}, {\n  word: 'sing',\n  translation: 'петь',\n  image: 'images/sing.jpg',\n  audioSrc: 'audio/sing.mp3'\n}, {\n  word: 'skip',\n  translation: 'пропускать, прыгать',\n  image: 'images/skip.jpg',\n  audioSrc: 'audio/skip.mp3'\n}, {\n  word: 'swim',\n  translation: 'плавать',\n  image: 'images/swim.jpg',\n  audioSrc: 'audio/swim.mp3'\n}], [{\n  word: 'cat',\n  translation: 'кот',\n  image: 'images/cat.jpg',\n  audioSrc: 'audio/cat.mp3'\n}, {\n  word: 'chick',\n  translation: 'цыплёнок',\n  image: 'images/chick.jpg',\n  audioSrc: 'audio/chick.mp3'\n}, {\n  word: 'chicken',\n  translation: 'курица',\n  image: 'images/chicken.jpg',\n  audioSrc: 'audio/chicken.mp3'\n}, {\n  word: 'dog',\n  translation: 'собака',\n  image: 'images/dog.jpg',\n  audioSrc: 'audio/dog.mp3'\n}, {\n  word: 'horse',\n  translation: 'лошадь',\n  image: 'images/horse.jpg',\n  audioSrc: 'audio/horse.mp3'\n}, {\n  word: 'pig',\n  translation: 'свинья',\n  image: 'images/pig.jpg',\n  audioSrc: 'audio/pig.mp3'\n}, {\n  word: 'rabbit',\n  translation: 'кролик',\n  image: 'images/rabbit.jpg',\n  audioSrc: 'audio/rabbit.mp3'\n}, {\n  word: 'sheep',\n  translation: 'овца',\n  image: 'images/sheep.jpg',\n  audioSrc: 'audio/sheep.mp3'\n}], [{\n  word: 'bird',\n  translation: 'птица',\n  image: 'images/bird.jpg',\n  audioSrc: 'audio/bird.mp3'\n}, {\n  word: 'fish',\n  translation: 'рыба',\n  image: 'images/fish1.jpg',\n  audioSrc: 'audio/fish.mp3'\n}, {\n  word: 'frog',\n  translation: 'жаба',\n  image: 'images/frog.jpg',\n  audioSrc: 'audio/frog.mp3'\n}, {\n  word: 'giraffe',\n  translation: 'жирафа',\n  image: 'images/giraffe.jpg',\n  audioSrc: 'audio/giraffe.mp3'\n}, {\n  word: 'lion',\n  translation: 'лев',\n  image: 'images/lion.jpg',\n  audioSrc: 'audio/lion.mp3'\n}, {\n  word: 'mouse',\n  translation: 'мышь',\n  image: 'images/mouse.jpg',\n  audioSrc: 'audio/mouse.mp3'\n}, {\n  word: 'turtle',\n  translation: 'черепаха',\n  image: 'images/turtle.jpg',\n  audioSrc: 'audio/turtle.mp3'\n}, {\n  word: 'dolphin',\n  translation: 'дельфин',\n  image: 'images/dolphin.jpg',\n  audioSrc: 'audio/dolphin.mp3'\n}], [{\n  word: 'skirt',\n  translation: 'юбка',\n  image: 'images/skirt.jpg',\n  audioSrc: 'audio/skirt.mp3'\n}, {\n  word: 'pants',\n  translation: 'брюки',\n  image: 'images/pants.jpg',\n  audioSrc: 'audio/pants.mp3'\n}, {\n  word: 'blouse',\n  translation: 'блузка',\n  image: 'images/blouse.jpg',\n  audioSrc: 'audio/blouse.mp3'\n}, {\n  word: 'dress',\n  translation: 'платье',\n  image: 'images/dress.jpg',\n  audioSrc: 'audio/dress.mp3'\n}, {\n  word: 'boot',\n  translation: 'ботинок',\n  image: 'images/boot.jpg',\n  audioSrc: 'audio/boot.mp3'\n}, {\n  word: 'shirt',\n  translation: 'рубашка',\n  image: 'images/shirt.jpg',\n  audioSrc: 'audio/shirt.mp3'\n}, {\n  word: 'coat',\n  translation: 'пальто',\n  image: 'images/coat.jpg',\n  audioSrc: 'audio/coat.mp3'\n}, {\n  word: 'shoe',\n  translation: 'туфли',\n  image: 'images/shoe.jpg',\n  audioSrc: 'audio/shoe.mp3'\n}], [{\n  word: 'sad',\n  translation: 'грустный',\n  image: 'images/sad.jpg',\n  audioSrc: 'audio/sad.mp3'\n}, {\n  word: 'angry',\n  translation: 'сердитый',\n  image: 'images/angry.jpg',\n  audioSrc: 'audio/angry.mp3'\n}, {\n  word: 'happy',\n  translation: 'счастливый',\n  image: 'images/happy.jpg',\n  audioSrc: 'audio/happy.mp3'\n}, {\n  word: 'tired',\n  translation: 'уставший',\n  image: 'images/tired.jpg',\n  audioSrc: 'audio/tired.mp3'\n}, {\n  word: 'surprised',\n  translation: 'удивлённый',\n  image: 'images/surprised.jpg',\n  audioSrc: 'audio/surprised.mp3'\n}, {\n  word: 'scared',\n  translation: 'испуганный',\n  image: 'images/scared.jpg',\n  audioSrc: 'audio/scared.mp3'\n}, {\n  word: 'smile',\n  translation: 'улыбка',\n  image: 'images/smile.jpg',\n  audioSrc: 'audio/smile.mp3'\n}, {\n  word: 'laugh',\n  translation: 'смех',\n  image: 'images/laugh.jpg',\n  audioSrc: 'audio/laugh.mp3'\n}], [{\n  word: 'cross',\n  translation: 'крест',\n  image: 'images/cross.jpg',\n  audioSrc: 'audio/cross.mp3'\n}, {\n  word: 'ellipse',\n  translation: 'овал',\n  image: 'images/ellipse.jpg',\n  audioSrc: 'audio/ellipse.mp3'\n}, {\n  word: 'circle',\n  translation: 'круг',\n  image: 'images/circle.jpg',\n  audioSrc: 'audio/circle.mp3'\n}, {\n  word: 'triangle',\n  translation: 'треугольник',\n  image: 'images/triangle.jpg',\n  audioSrc: 'audio/triangle.mp3'\n}, {\n  word: 'square',\n  translation: 'квадрат',\n  image: 'images/square.jpg',\n  audioSrc: 'audio/square.mp3'\n}, {\n  word: 'star',\n  translation: 'звезда',\n  image: 'images/star.jpg',\n  audioSrc: 'audio/star.mp3'\n}, {\n  word: 'rhombus',\n  translation: 'ромб',\n  image: 'images/rhombus.jpg',\n  audioSrc: 'audio/rhombus.mp3'\n}, {\n  word: 'ring',\n  translation: 'окружность',\n  image: 'images/ring.jpg',\n  audioSrc: 'audio/ring.mp3'\n}], [{\n  word: 'car',\n  translation: 'машина',\n  image: 'images/car.jpg',\n  audioSrc: 'audio/car.mp3'\n}, {\n  word: 'bus',\n  translation: 'автобус',\n  image: 'images/bus.jpg',\n  audioSrc: 'audio/bus.mp3'\n}, {\n  word: 'bicycle',\n  translation: 'велосипед',\n  image: 'images/bicycle.jpg',\n  audioSrc: 'audio/bicycle.mp3'\n}, {\n  word: 'train',\n  translation: 'поезд',\n  image: 'images/train.jpg',\n  audioSrc: 'audio/train.mp3'\n}, {\n  word: 'boat',\n  translation: 'лодка',\n  image: 'images/boat.jpg',\n  audioSrc: 'audio/boat.mp3'\n}, {\n  word: 'truck',\n  translation: 'грузовик',\n  image: 'images/truck.jpg',\n  audioSrc: 'audio/truck.mp3'\n}, {\n  word: 'motorcycle',\n  translation: 'мотоцикл',\n  image: 'images/motorcycle.jpg',\n  audioSrc: 'audio/motorcycle.mp3'\n}]];\nconst sections = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Shapes', 'Vehicle'];\n\n\n//# sourceURL=webpack:///./src/cards-object.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ \"./src/styles/main.scss\");\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _cards_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards-list */ \"./src/cards-list.js\");\n\n // import { cards, sections } from './cards-object';\n// import Card from './card';\n\nconst config = {\n  section: 'Clothes',\n  cardsListLength: 8\n};\nconst removeSidebar = document.getElementById('cross');\nconst addSidebar = document.getElementById('toggle-sidebar');\nconst sidebar = document.getElementById('sidebar-menu');\nconst boardContainer = document.getElementById('board-container'); // const url = `src/${cards[0][0].image}`;\n// const newCard = new Card(url, sections[0]);\n// mainBoard.appendChild(newCard.createCard());\n\nconst mainPageBoard = new _cards_list__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config.section);\nboardContainer.appendChild(mainPageBoard.createCardsBoard()); // ===============================================================            Dropdown Sidebar Menu\n\naddSidebar.addEventListener('click', () => {\n  sidebar.classList.add('active');\n});\nremoveSidebar.addEventListener('click', () => {\n  sidebar.classList.remove('active');\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\nvar exported = content.locals ? content.locals : {};\n\n\n\nmodule.exports = exported;\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ })

/******/ });