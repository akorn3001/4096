const Board = require('./board.js');

class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.best = 0;
  }

  newGame() {
    this.board.grid.forEach((row, rowIdx) => {
      row.forEach((el, colIdx) => {
        this.board.clearCell(rowIdx, colIdx);
      });
    });

    this.score = 0;
    this.board.score = this.score;
    this.board.spawn();
    this.board.spawn();
    this.board.render();
  }

  isLost() {
    return (this.rowLost() && this.colLost());
  }

  rowLost() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board.notFull()) {
          return false;
        } else if (this.board.grid[row][col] === this.board.grid[row][col + 1]) {
          return false;
        }
      }
    }

    return true;
  }

  colLost() {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (this.board.notFull()) {
          return false;
        } else if (this.board.grid[row][col] === this.board.grid[row + 1][col]) {
          return false;
        }
      }
    }

    return true;
  }

  render() {
    if (this.isLost()) {
      alert('You Lost!');
    }
  }
}

module.exports = Game;
