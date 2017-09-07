class Board {
  constructor() {
    this.grid = this.generateGrid();
  }
// LEFT: 37
// RIGHT: 39
// UP: 38
// DOWN: 40
  generateGrid () {
    let grid = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ];

    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), grid);
    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), grid);

    document.addEventListener('keydown', (event) => {
      switch(event.keyCode) {
        case 37:
        this.moveLeft();
          console.log('LEFT');
          break;
        case 38:
          console.log('UP');
          break;
        case 39:
          this.moveRight();
          console.log('RIGHT');
          break;
        case 40:
          console.log('DOWN');
          break;
        case 32:
          this.spawn();
          this.render();
          break;
      }
      console.log(event.keyCode);

    });

    return grid;
  }

  clearGrid() {
    this.grid.forEach((row, rowIdx) => {
      row.forEach((el, colIdx) => {
        this.clearCell(rowIdx, colIdx);
      });
    });
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

  spawn() {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);

    if (!this.lost()) {
      if (!this.grid[xCoord][yCoord]) {
        this.addTile(xCoord, yCoord, this.grid);
        return this.grid;
      } else {
        return this.spawn();
      }
    }
  }

  clearCell(row, col) {
    this.grid[row][col] = null;
    this.render();
  }

  moveRight() {
    this.grid.forEach((row, rowIdx) => {
      for (let colIdx = 2; colIdx >= 0; colIdx--) {
        // if (colIdx === 3 || this.grid[rowIdx][colIdx + 1] !== this.grid[rowIdx][colIdx]) {
        //   return;
        // }

        if (!this.grid[rowIdx][colIdx + 1]) {
          this.grid[rowIdx][colIdx + 1] = this.grid[rowIdx][colIdx];
          this.clearCell(rowIdx, colIdx);
        } else if (this.grid[rowIdx][colIdx + 1] === this.grid[rowIdx][colIdx]) {
          this.grid[rowIdx][colIdx + 1] += this.grid[rowIdx][colIdx];
          this.clearCell(rowIdx, colIdx);
        }

        // this.moveRight();
        this.render();
      }
    });

  }

  moveLeft() {
    this.grid.forEach((row, rowIdx) => {
      for (let colIdx = 1; colIdx <= 3; colIdx++) {
        // if (colIdx === 3 || this.grid[rowIdx][colIdx + 1] !== this.grid[rowIdx][colIdx]) {
        //   return;
        // }

        if (!this.grid[rowIdx][colIdx - 1]) {
          this.grid[rowIdx][colIdx - 1] = this.grid[rowIdx][colIdx];
          this.clearCell(rowIdx, colIdx);
        } else if (this.grid[rowIdx][colIdx - 1] === this.grid[rowIdx][colIdx]) {
          this.grid[rowIdx][colIdx - 1] += this.grid[rowIdx][colIdx];
          this.clearCell(rowIdx, colIdx);
        }

        // this.moveLeft();
        this.render();
      }
    });

  }

  moveUp() {

  }

  moveDown() {

  }

  render() {
    this.grid.forEach((row, idx1) => {
      row.forEach((el, idx2) => {
        document.getElementById(`${idx1}-${idx2}`).innerHTML = el;
      });
    });

  }
}
