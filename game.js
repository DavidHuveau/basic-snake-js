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

    //TODO: move in listenForInpupt ?
    this.directionsQueue = []
    this.currentDirection = DIRECTION.NONE;
    this.gameOver = false;
    this.score = 0;

    this.startGame();
  }

  startGame() {
    this.board.placeFood();
    this.board.render();

    new ListenForInput(this);

    const self = this;
    const interval = setInterval(function () {
      self.update();
      self.board.render();
    }, 100)

  }

  // Contain the logic needed for the snake and the board to work together
  update() {
    if (!this.gameOver && this.getFirstDirection() !== DIRECTION.NONE) {
      const nextCell = this.getNextCell();

      if (this.snake.checkCrash(nextCell)) {
        this.directionsQueue = [];
        this.currentDirection = DIRECTION.NONE;
        this.gameOver = true;

        Utilities.showMessage(`Game Over! You scored is ${this.score} points!`);
      } else if (this.snake.move(nextCell) === CELL_TYPE.FOOD) {
        this.score += 1;
        this.snake.grow();
        this.board.placeFood();
      }
    }
  }

  getNextCell() {
    const snakeHead = this.snake.getHead();
    let { row, column } = snakeHead;

    this.currentDirection = this.getFirstDirection();

    if (this.currentDirection === DIRECTION.RIGHT) {
      column++;
    }
    else if (this.currentDirection === DIRECTION.LEFT) {
      column--;
    }
    else if (this.currentDirection === DIRECTION.UP) {
      row--;
    }
    else if (this.currentDirection === DIRECTION.DOWN) {
      row++;
    }

    let nextCell;
    if (row > -1 && row < this.board.rowsNumber && column > -1 && column < this.board.columnsNumber) {
      nextCell = this.board.cells[row][column];
    }
    this.directionsQueue.shift();
    return nextCell;
  }

  addDirection(newDirection) {
    this.directionsQueue.push(newDirection);
  }

  getFirstDirection() {
    return this.directionsQueue && this.directionsQueue[0] || this.currentDirection;
  }

  // Prevent the player from spamming the arrow keys a huge number of times
  exceededMaxDirections() {
    return this.directionsQueue.length > 3;
  }
}
