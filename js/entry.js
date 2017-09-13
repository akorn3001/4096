const Board = require('./board.js');
const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {
  let game = new Game();
  game.newGame();
  $('#new-game').click(game.newGame.bind(game));

  window.addEventListener('keydown', (event) => {
    switch(event.keyCode) {
      case 37:
        if (game.isLost()) alert('You Lost!');
        if (game.board.moveLeft()) game.board.spawn();
        game.board.render();
        break;
      case 38:
        event.preventDefault();
        if (game.isLost()) alert('You Lost!');
        if (game.board.moveUp()) game.board.spawn();
        game.board.render();
        break;
      case 39:
        if (game.isLost()) alert('You Lost!');
        if (game.board.moveRight()) game.board.spawn();
        game.board.render();
        break;
      case 40:
        event.preventDefault();
        if (game.isLost()) alert('You Lost!');
        if (game.board.moveDown()) game.board.spawn();
        game.board.render();
        break;
      }
    });
  });
