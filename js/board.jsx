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
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), grid);
    this.addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), grid);

    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode);
      
    });

    return grid;
  }

  addTile(x, y, grid) {
    grid[x][y] = this.twoOrFour();
  }

  lost() {
    return !(this.grid[0].includes(0) ||
    this.grid[1].includes(0) ||
    this.grid[2].includes(0) ||
    this.grid[3].includes(0));
  }

  twoOrFour() {
    return (Math.floor(Math.random() * 10) <= 2 ? 4 : 2);
  }

  spawn() {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);

    if (!this.lost()) {
      if (this.grid[xCoord][yCoord] === 0) {
        this.addTile(xCoord, yCoord, this.grid);
        return this.grid;
      } else {
        return this.spawn();
      }
    }
  }

  render() {
    this.grid.forEach((row, idx1) => {
      row.forEach((el, idx2) => {
        document.getElementById(`${idx1}-${idx2}`).innerHTML = el;
      });
    });

  }
}
