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

    document.addEventListener('keydown', (event) => {
      switch(event.keyCode) {
        case 37:
          if (!this.moveLeft()) this.spawn();
          this.render();
          break;
        case 38:
          if (!this.moveUp()) this.spawn();
          this.render();
          break;
        case 39:
          if (!this.moveRight()) this.spawn();
          this.render();
          break;
        case 40:
          if (!this.moveDown()) this.spawn();
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
    this.addTile(this.randNum(), this.randNum(), this.grid);
    this.addTile(this.randNum(), this.randNum(), this.grid);
    this.render();
  }

  addTile(x, y, grid) {
    grid[x][y] = this.twoOrFour();
  }

  notFull() {
    return !(this.grid[0].includes(null) ||
    this.grid[1].includes(null) ||
    this.grid[2].includes(null) ||
    this.grid[3].includes(null));
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

    if (!this.notFull()) {
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
        this.best += this.grid[rowEnd][colEnd];
        this.clearCell(rowStart, colStart);
        return true;
      } else return false;
    }
  }

  moveRight() {
    const originalGrid = JSON.stringify(this.grid);

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 2; colIdx >= 0; colIdx--) {
        this.move(rowIdx, colIdx, 0, 1);
      }
    }

    return (JSON.stringify(this.grid) === originalGrid);
  }

  moveLeft() {
    const originalGrid = JSON.stringify(this.grid);

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 1; colIdx < 4; colIdx++) {
        this.move(rowIdx, colIdx, 0, -1);
      }
    }

    return (JSON.stringify(this.grid) === originalGrid);
  }

  moveDown() {
    const originalGrid = JSON.stringify(this.grid);

    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 2; rowIdx >= 0; rowIdx--) {
        this.move(rowIdx, colIdx, 1, 0);
      }
    }

    return (JSON.stringify(this.grid) === originalGrid);
  }

  moveUp() {
    const originalGrid = JSON.stringify(this.grid);

    for (let colIdx = 0; colIdx < 4; colIdx++) {
      for (let rowIdx = 1; rowIdx < 4; rowIdx++) {
        this.move(rowIdx, colIdx, -1, 0);
      }
    }

    return (JSON.stringify(this.grid) === originalGrid);
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
