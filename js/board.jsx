class Board {
  constructor() {
    this.grid = this.generateGrid();
  }

  generateGrid () {
    let grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

    this.addTile(grid);
    this.addTile(grid);

    return grid;
  }

  addTile(grid) {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);

    grid[xCoord][yCoord] = 2;
  }



  lost() {
    return !(this.grid[0].includes(0) ||
    this.grid[1].includes(0) ||
    this.grid[2].includes(0) ||
    this.grid[3].includes(0));
  }

  spawn() {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);
    
    if (!this.lost()) {

      if (this.grid[xCoord][yCoord] === 0) {
        this.addTile(this.grid);
        return this.grid;
      } else {
        this.spawn();
      }
    }
  }
}
