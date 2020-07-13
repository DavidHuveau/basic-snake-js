const GAME_BOARD_ID = "game-grid";

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

const MAX_DIRECTIONS_IN_QUEUE = 3;

// Game settings
const GAME_ROWS_NUMBER = 20;
const GAME_COLUMNS_NUMBER = 20;
const SNAKE_STARTING_LENGTH = 5;

class Game {
  constructor() {
    this.initGame();
    this.startGame();
  }

  initGame() {
    this.board = new Board(GAME_BOARD_ID, GAME_ROWS_NUMBER, GAME_COLUMNS_NUMBER);

    const startRowIndex = Math.floor(GAME_ROWS_NUMBER / 2);
    const startColumnIndex = Math.floor(GAME_COLUMNS_NUMBER / 2);
    this.snake = new Snake(
      this.board,
      this.board.cells[startRowIndex][startColumnIndex],
      SNAKE_STARTING_LENGTH,
    );

    this.directionsQueue = [];
    this.currentDirection = DIRECTION.NONE;
    this.gameOver = false;
    this.score = 0;
  }

  startGame() {
    this.board.placeFood();
    this.board.render();

    new ListenForInput(this);

    const self = this;
    this.gameTimer = setInterval(() => {
      self.update();
      self.board.render();
    }, 100);
  }

  restartGame() {
    clearInterval(this.gameTimer);
    this.initGame();
    this.startGame();
  }

  // Contain the logic needed for the snake and the board to work together
  update() {
    if (!this.gameOver && this.getFirstDirection() !== DIRECTION.NONE) {
      const nextCell = this.getNextCell();

      if (this.snake.checkCrash(nextCell)) {
        this.gameOver = true;
        const self = this;
        Utilities.showMessage(`Game Over! You scored is ${this.score} points!`, () => {
          self.restartGame();
        });
      } else if (this.snake.move(nextCell) === CELL_TYPE.FOOD) {
        this.score += 1;
        this.snake.grow();
        this.board.placeFood();
      }
    }
  }

  getNextCell() {
    const snakeHead = this.snake.getHeadCell;
    let { row, column } = snakeHead;

    this.currentDirection = this.getFirstDirection();

    if (this.currentDirection === DIRECTION.RIGHT) {
      column++;
    } else if (this.currentDirection === DIRECTION.LEFT) {
      column--;
    } else if (this.currentDirection === DIRECTION.UP) {
      row--;
    } else if (this.currentDirection === DIRECTION.DOWN) {
      row++;
    }

    let nextCell;
    if (row > -1 && row < this.board.getRowsCount
      && column > -1 && column < this.board.getColumnsCount) {
      nextCell = this.board.cells[row][column];
    }
    this.directionsQueue.shift();
    return nextCell;
  }

  addDirection(newDirection) {
    this.directionsQueue.push(newDirection);
  }

  getFirstDirection() {
    return (this.directionsQueue && this.directionsQueue[0]) || this.currentDirection;
  }

  // Prevent the player from spamming the arrow keys a huge number of times
  exceededMaxDirections() {
    return this.directionsQueue.length > MAX_DIRECTIONS_IN_QUEUE;
  }
}
