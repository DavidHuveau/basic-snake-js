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
    //////// test
    this.board.placeFood();
    this.board.render();
    debugger;
    this.snake.move(this.board.cells[this.snake.getHead().row - 1][this.snake.getHead().column]);
    this.board.render();
    debugger;
    this.directionsQueue.push(DIRECTION.RIGHT);
    this.directionsQueue.push(DIRECTION.DOWN);
    this.update();
    this.board.render();

    new ListenForInput(this);
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
      } else if (this.snake.move(nextCell).cellType === CELL_TYPE.FOOD) {
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

  // getLastDirection() {
  //   return this.directionsQueue && this.directionsQueue[this.directionsQueue.length - 1] || this.currentDirection;
  // }

  // Prevent the player from spamming the arrow keys a huge number of times
  // and building up a list of directions that are no longer relevant
  exceededMaxDirections() {
    return this.directionsQueue.length > 3;
  }
}
