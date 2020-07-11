const CELL_TYPE = Object.freeze({
  EMPTY: "EMPTY",
  FOOD: "FOOD",
  SNAKE: "SNAKE",
});

const DIRECTION = Object.freeze({
  NONE: "NONE",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
});

class Game {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;

    this.startGame();
  }

  startGame() {
    //////// test
    board.placeFood();
    board.render();
    debugger;
    snake.move(board.cells[0][10]);
    board.render();
    debugger;
    const res = snake.checkCrash(undefined);
    if (res) Utilities.showMessage("Game Over");
  }
}
