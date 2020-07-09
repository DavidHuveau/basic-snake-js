const GAME_BOARD_ID = "game-grid";

const SNAKE_CLASS = "snake";
const FOOD_CLASS = "food";

// Game settings
const GAME_ROWS_NUMBER = 20;
const GAME_COLS_NUMBER = 20;

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
  constructor() {
    this.gameBoard = Utilities.domElement(GAME_BOARD_ID);

    this.startGame();

    const test = new Board(GAME_ROWS_NUMBER, GAME_COLS_NUMBER);
    test.placeFood();
    test.render();
  }

  startGame() {
    this.generateGrid();
  }

  generateGrid() {
    this.gameBoard.innerHTML = "";

    for (let rowIndex = 0; rowIndex < GAME_ROWS_NUMBER; rowIndex++) {
      for (let colIndex = 0; colIndex < GAME_COLS_NUMBER; colIndex++) {
        this.generateCell(rowIndex, colIndex);
      }
    }
  }

  generateCell(rowIndex, colIndex) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `c_${rowIndex}_${colIndex}`;
    this.gameBoard.appendChild(cell);
  }
}
