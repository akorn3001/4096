class Board {
  constructor() {
    this.grid = this.generateGrid();
    this.score = 0;
    this.moved = false;
  }

  generateGrid () {
    let grid = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ];

    document.addEventListener('keydown', (event) => {
      switch(event.keyCode) {
        case 37:
          this.moveLeft();
          this.render();
          break;
        case 38:
          this.moveUp();
          this.render();
          break;
        case 39:
          this.moveRight();
          this.render();
          break;
        case 40:
          this.moveDown();
          this.render();
          break;
        case 32:
          this.spawn();
          this.render();
          break;
      }
    });

    return grid;
  }

  newGame() {
    this.grid.forEach((row, rowIdx) => {
      row.forEach((el, colIdx) => {
        this.clearCell(rowIdx, colIdx);
      });
    });

    this.score = 0;
    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), this.grid);
    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), this.grid);
    this.render();
  }

  addTile(x, y, grid) {
    grid[x][y] = this.twoOrFour();
  }

  lost() {
    return !(this.grid[0].includes(null) ||
    this.grid[1].includes(null) ||
    this.grid[2].includes(null) ||
    this.grid[3].includes(null));
  }

  twoOrFour() {
    return (Math.floor(Math.random() * 10) <= 2 ? 4 : 2);
  }

  // randNum() {
  //   return Math.floor(Math.random() * 4);
  // }

  spawn() {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);

    if (!this.lost()) {
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
      if (!this.grid[rowEnd][colEnd]) {
        this.grid[rowEnd][colEnd] = this.grid[rowStart][colStart];
        this.clearCell(rowStart, colStart);
        this.move(rowEnd, colEnd, rowChange, colChange);
        return true;

      } else if (this.grid[rowEnd][colEnd] === this.grid[rowStart][colStart]) {
        this.grid[rowEnd][colEnd] += this.grid[rowStart][colStart];
        this.moved = true;
        this.score += this.grid[rowEnd][colEnd];
        this.clearCell(rowStart, colStart);
        return true;
      } else return false;
    }
  }
  // moveRight() {
  //
  //   for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
  //     for (let colIdx = 2; colIdx >= 0; colIdx--) {
  //       if (!this.grid[rowIdx][colIdx + 1]) {
  //         this.grid[rowIdx][colIdx + 1] = this.grid[rowIdx][colIdx];
  //         this.clearCell(rowIdx, colIdx);
  //       } else if (this.grid[rowIdx][colIdx + 1] === this.grid[rowIdx][colIdx]) {
  //         this.grid[rowIdx][colIdx + 1] += this.grid[rowIdx][colIdx];
  //         this.clearCell(rowIdx, colIdx);
  //       }
  //     }
  //   }
  // }

  moveRight() {
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 2; colIdx >= 0; colIdx--) {
        this.move(rowIdx, colIdx, 0, 1);
      }
    }
  }

  moveLeft() {
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 1; colIdx < 4; colIdx++) {
        this.move(rowIdx, colIdx, 0, -1);
      }
    }
  }

  moveDown() {
    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 2; rowIdx >= 0; rowIdx--) {
        this.move(rowIdx, colIdx, 1, 0);
      }
    }
  }

  moveUp() {
    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 1; rowIdx < 4; rowIdx++) {
        this.move(rowIdx, colIdx, -1, 0);
      }
    }
  }

  moveHappened() {

  }

  render() {
    let div;
    let scoreDiv;
    this.grid.forEach((row, idx1) => {
      row.forEach((el, idx2) => {
        div = document.getElementById(`${idx1}-${idx2}`);
        div.innerHTML = el;
        div.setAttribute('data-value', el);
      });
    });

    scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = this.score;

  }
}
