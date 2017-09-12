const Board = require('./board.js');
const Game = require('./game.js');

  document.addEventListener('DOMContentLoaded', () => {
    let b = new Board();
    b.newGame();
    $('#new-game').click(b.newGame.bind(b));

    window.addEventListener('keydown', (event) => {
      switch(event.keyCode) {
        case 37:
          if (b.moveLeft()) b.spawn();
          b.render();
          break;
        case 38:
          event.preventDefault();
          if (b.moveUp()) b.spawn();
          b.render();
          break;
        case 39:
          if (b.moveRight()) b.spawn();
          b.render();
          break;
        case 40:
          event.preventDefault();
          if (!b.moveDown()) b.spawn();
          b.render();
          break;
        case 32:
          b.spawn();
          b.render();
          break;
      }
    });
  });
