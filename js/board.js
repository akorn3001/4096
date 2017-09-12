class Board {
  constructor() {
    this.grid = this.generateGrid();
    this.score = 0;
    this.best = 0;
  }

  generateGrid () {
    let grid = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ];

    return grid;
  }

  newGame() {
    this.grid.forEach((row, rowIdx) => {
      row.forEach((el, colIdx) => {
        this.clearCell(rowIdx, colIdx);
      });
    });

    this.score = 0;
    this.addTile(this.randNum(), this.randNum(), this.grid);
    this.addTile(this.randNum(), this.randNum(), this.grid);
    this.render();
  }

  addTile(x, y, grid) {
    grid[x][y] = this.twoOrFour();
  }

  notFull() {
    return (this.grid[0].includes(null) ||
      this.grid[1].includes(null) ||
      this.grid[2].includes(null) ||
      this.grid[3].includes(null)
    );
  }

  // innerLost() {
  //   for (let row = 1; row < 3; row++) {
  //     for (let col = 1; col < 3; col++) {
  //       let el = this.grid[row][col];
  //
  //       if (!this.grid[row + 1][col] || this.grid[row + 1][col] === el) {
  //         return false;
  //       } else if (!this.grid[row - 1][col] || this.grid[row - 1][col] === el) {
  //         return false;
  //       } else if (!this.grid[row][col + 1] || this.grid[row][col + 1] === el) {
  //         return false;
  //       } else if (!this.grid[row][col - 1] || this.grid[row][col - 1] === el) {
  //         return false;
  //       }
  //     }
  //   }
  //
  //   return true;
  // }
  //
  // outerLost() {
  //   if (
  //     (!this.grid[0][0]) ||
  //     (!this.grid[0][3]) ||
  //     (!this.grid[3][0]) ||
  //     (!this.grid[3][3]) ||
  //     (this.grid[0][0] === this.grid[0][1]) ||
  //     (this.grid[0][1] === this.grid[0][2]) ||
  //     (this.grid[0][2] === this.grid[0][3]) ||
  //     (this.grid[3][0] === this.grid[3][1]) ||
  //     (this.grid[3][1] === this.grid[3][2]) ||
  //     (this.grid[3][2] === this.grid[3][3]) ||
  //     (this.grid[0][0] === this.grid[1][0]) ||
  //     (this.grid[1][0] === this.grid[2][0]) ||
  //     (this.grid[2][0] === this.grid[3][0]) ||
  //     (this.grid[0][3] === this.grid[1][3]) ||
  //     (this.grid[1][3] === this.grid[2][3]) ||
  //     (this.grid[2][3] === this.grid[3][3])
  //   ) {
  //     return false;
  //   } else return true;
  // }

  lost() {
    if (!this.notFull()) {

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < this.grid[row].length; col++) {
          if (
            (this.grid[row][col] === this.grid[row][col + 1]) ||
             this.grid[row][col] === this.grid[row + 1][col]
           )
           {
             return false;
           }
         }
       }

       return true;
     }

     return false;
   }


  twoOrFour() {
    return (Math.floor(Math.random() * 10) <= 2 ? 4 : 2);
  }

  randNum() {
    return Math.floor(Math.random() * 4);
  }

  spawn() {
    let xCoord = this.randNum();
    let yCoord = this.randNum();

    if (this.notFull()) {
      if (!this.grid[xCoord][yCoord]) {
        this.addTile(xCoord, yCoord, this.grid);
        return this.grid;
      } else {
        this.spawn();
      }
    }
  }

  clearCell(row, col) {
    this.grid[row][col] = null;
  }

  move(rowStart, colStart, rowChange, colChange) {
    const rowEnd = rowStart + rowChange;
    const colEnd = colStart + colChange;

    if (rowEnd <= 3 && colEnd <= 3 && rowEnd >= 0 && colEnd >= 0) {
      if (!this.grid[rowEnd][colEnd] && this.grid[rowStart][colStart]) {
        this.grid[rowEnd][colEnd] = this.grid[rowStart][colStart];
        this.clearCell(rowStart, colStart);
        this.move(rowEnd, colEnd, rowChange, colChange);
        return true;

      } else if (this.grid[rowStart][colStart] && (this.grid[rowEnd][colEnd] === this.grid[rowStart][colStart])) {
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

  moveRight() {
    let somethingMoved = false;

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 2; colIdx >= 0; colIdx--) {
        if (this.move(rowIdx, colIdx, 0, 1)) {
          somethingMoved = true;
        }
      }
    }

    return somethingMoved;
  }

  moveLeft() {
    let somethingMoved = false;

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 1; colIdx < 4; colIdx++) {
        if (this.move(rowIdx, colIdx, 0, -1)) {
          somethingMoved = true;
        }
      }
    }

    return somethingMoved;
  }

  moveDown() {
    let somethingMoved = false;

    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 2; rowIdx >= 0; rowIdx--) {
        if (this.move(rowIdx, colIdx, 1, 0)) {
          somethingMoved = true;
        }
      }
    }

    return somethingMoved;
  }

  moveUp() {
    let somethingMoved = false;

    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 1; rowIdx < 4; rowIdx++) {
        if (this.move(rowIdx, colIdx, -1, 0)) {
          somethingMoved = true;
        }
      }
    }

    return somethingMoved;
  }

  render() {
    let div;
    let scoreDiv;
    let bestDiv;
    this.grid.forEach((row, idx1) => {
      row.forEach((el, idx2) => {
        div = document.getElementById(`${idx1}-${idx2}`);
        div.innerHTML = el;
        div.setAttribute('data-value', el);
        $(div).addClass('animated pulse');

      });
    });

    scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = this.score;

    bestDiv = document.getElementById('best');
    bestDiv.innerHTML = this.best;

  }
}

module.exports = Board;
