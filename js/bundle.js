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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = this.generateGrid();
    this.score = 0;
    this.best = 0;
  }

  _createClass(Board, [{
    key: 'generateGrid',
    value: function generateGrid() {
      var grid = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];

      return grid;
    }
  }, {
    key: 'addTile',
    value: function addTile(x, y, grid) {
      grid[x][y] = this.twoOrFour();
    }
  }, {
    key: 'notFull',
    value: function notFull() {
      return this.grid[0].includes(null) || this.grid[1].includes(null) || this.grid[2].includes(null) || this.grid[3].includes(null);
    }
  }, {
    key: 'twoOrFour',
    value: function twoOrFour() {
      return Math.floor(Math.random() * 10) <= 2 ? 4 : 2;
    }
  }, {
    key: 'randNum',
    value: function randNum() {
      return Math.floor(Math.random() * 4);
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      var xCoord = this.randNum();
      var yCoord = this.randNum();

      if (this.notFull()) {
        if (!this.grid[xCoord][yCoord]) {
          this.addTile(xCoord, yCoord, this.grid);
          return this.grid;
        } else {
          this.spawn();
        }
      }
    }
  }, {
    key: 'clearCell',
    value: function clearCell(row, col) {
      this.grid[row][col] = null;
    }
  }, {
    key: 'move',
    value: function move(rowStart, colStart, rowChange, colChange) {
      var rowEnd = rowStart + rowChange;
      var colEnd = colStart + colChange;

      if (rowEnd <= 3 && colEnd <= 3 && rowEnd >= 0 && colEnd >= 0) {
        if (!this.grid[rowEnd][colEnd] && this.grid[rowStart][colStart]) {
          this.grid[rowEnd][colEnd] = this.grid[rowStart][colStart];
          this.clearCell(rowStart, colStart);
          this.move(rowEnd, colEnd, rowChange, colChange);
          return true;
        } else if (this.grid[rowStart][colStart] && this.grid[rowEnd][colEnd] === this.grid[rowStart][colStart]) {

          this.grid[rowEnd][colEnd] += this.grid[rowStart][colStart];
          this.score += this.grid[rowEnd][colEnd];
          if (this.best <= this.score) {
            this.best = this.score;
          }
          this.clearCell(rowStart, colStart);
          return true;
        } else return false;
      }
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      var somethingMoved = false;

      for (var rowIdx = 0; rowIdx < 4; rowIdx++) {
        for (var colIdx = 2; colIdx >= 0; colIdx--) {
          if (this.move(rowIdx, colIdx, 0, 1)) {
            somethingMoved = true;
          }
        }
      }

      return somethingMoved;
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      var somethingMoved = false;

      for (var rowIdx = 0; rowIdx < 4; rowIdx++) {
        for (var colIdx = 1; colIdx < 4; colIdx++) {
          if (this.move(rowIdx, colIdx, 0, -1)) {
            somethingMoved = true;
          }
        }
      }

      return somethingMoved;
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      var somethingMoved = false;

      for (var colIdx = 0; colIdx < 4; colIdx++) {
        for (var rowIdx = 2; rowIdx >= 0; rowIdx--) {
          if (this.move(rowIdx, colIdx, 1, 0)) {
            somethingMoved = true;
          }
        }
      }

      return somethingMoved;
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      var somethingMoved = false;

      for (var colIdx = 0; colIdx < 4; colIdx++) {
        for (var rowIdx = 1; rowIdx < 4; rowIdx++) {
          if (this.move(rowIdx, colIdx, -1, 0)) {
            somethingMoved = true;
          }
        }
      }

      return somethingMoved;
    }
  }, {
    key: 'render',
    value: function render() {
      var div = void 0;
      var scoreDiv = void 0;
      var bestDiv = void 0;

      this.grid.forEach(function (row, idx1) {
        row.forEach(function (el, idx2) {
          div = document.getElementById(idx1 + '-' + idx2);
          div.innerHTML = el;
          div.setAttribute('data-value', el);
        });
      });

      scoreDiv = document.getElementById('score');
      scoreDiv.innerHTML = this.score;

      bestDiv = document.getElementById('best');
      bestDiv.innerHTML = this.best;
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Board = __webpack_require__(0);
var Game = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', function () {
  var game = new Game();
  game.newGame();
  $('#new-game').click(game.newGame.bind(game));
  $('#modal-new-game').click(game.modalHide.bind(game));

  window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 37:
        if (game.isLost()) game.modalShow();
        if (game.board.moveLeft()) game.board.spawn();
        game.board.render();
        break;
      case 38:
        event.preventDefault();
        if (game.isLost()) game.modalShow();
        if (game.board.moveUp()) game.board.spawn();
        game.board.render();
        break;
      case 39:
        if (game.isLost()) game.modalShow();
        if (game.board.moveRight()) game.board.spawn();
        game.board.render();
        break;
      case 40:
        event.preventDefault();
        if (game.isLost()) game.modalShow();
        if (game.board.moveDown()) game.board.spawn();
        game.board.render();
        break;
    }
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(0);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = new Board();
    this.score = 0;
    this.best = 0;
  }

  _createClass(Game, [{
    key: 'newGame',
    value: function newGame() {
      var _this = this;

      this.board.grid.forEach(function (row, rowIdx) {
        row.forEach(function (el, colIdx) {
          _this.board.clearCell(rowIdx, colIdx);
        });
      });

      this.score = 0;
      this.board.score = this.score;
      this.board.spawn();
      this.board.spawn();
      this.board.render();
    }
  }, {
    key: 'isLost',
    value: function isLost() {
      return this.rowLost() && this.colLost();
    }
  }, {
    key: 'rowLost',
    value: function rowLost() {
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 3; col++) {
          if (this.board.notFull()) {
            return false;
          } else if (this.board.grid[row][col] === this.board.grid[row][col + 1]) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'colLost',
    value: function colLost() {
      for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 3; row++) {
          if (this.board.notFull()) {
            return false;
          } else if (this.board.grid[row][col] === this.board.grid[row + 1][col]) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'modalShow',
    value: function modalShow() {
      var modal = document.getElementById('game-lost-modal');
      modal.style.display = 'block';
    }
  }, {
    key: 'modalHide',
    value: function modalHide() {
      var modal = document.getElementById('game-lost-modal');
      this.newGame();
      modal.style.display = 'none';
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map